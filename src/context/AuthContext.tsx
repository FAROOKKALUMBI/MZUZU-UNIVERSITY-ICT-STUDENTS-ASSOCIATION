import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  AdminCredentials,
  AdminSession,
  LockoutState,
  AuditLogEntry,
  AuthContextType,
  AuditEventType,
} from '../types/auth';
import {
  verifyPassword,
  hashPassword,
  generateSalt,
  generateRandomToken,
  generateRecoveryKey,
  timingSafeEqual,
  checkPasswordStrength,
} from '../utils/crypto';

// Initial default configuration
const DEFAULT_SALT = 'a1f8c7e93b4d2e051786f092345bcdef';
// Derived PBKDF2 hash of "Muisa@Admin2026!"
const DEFAULT_HASH = '138f5b983f9805094fc926276af0b91099000d272262be7f963dd1c8ffe7b388';
const DEFAULT_RECOVERY_KEY = 'MUISA-SEC-9247-5183-KX49';

const STORAGE_KEYS = {
  CREDENTIALS: 'muisa_admin_credentials_v1',
  SESSION: 'muisa_admin_session_v1',
  LOCKOUT: 'muisa_admin_lockout_v1',
  AUDIT_LOGS: 'muisa_admin_audit_logs_v1',
};

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

const initialCredentials: AdminCredentials = {
  username: 'admin',
  email: 'admin@muisa.org',
  salt: DEFAULT_SALT,
  passwordHash: DEFAULT_HASH,
  recoveryKey: DEFAULT_RECOVERY_KEY,
  passwordLastChanged: Date.now(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getBrowserSignature(): string {
  if (typeof navigator === 'undefined') return 'Unknown Device';
  const ua = navigator.userAgent;
  let browser = 'Browser';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';

  let os = 'OS';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return `${browser} on ${os}`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Credentials
  const [credentials, setCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading credentials from storage:', e);
    }
    return initialCredentials;
  });

  // 2. Lockout State
  const [lockout, setLockout] = useState<LockoutState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCKOUT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading lockout info:', e);
    }
    return { failedAttempts: 0, lockedUntil: null };
  });

  // 3. Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading audit logs:', e);
    }
    return [
      {
        id: 'init-001',
        timestamp: Date.now(),
        event: 'LOGIN_SUCCESS',
        deviceInfo: 'System Initializer',
        details: 'Admin security vault initialized with PBKDF2 encryption',
      },
    ];
  });

  // 4. Session State
  const [session, setSession] = useState<AdminSession | null>(() => {
    try {
      // Check sessionStorage first, then fallback to localStorage if rememberMe was active
      const sessionSaved = sessionStorage.getItem(STORAGE_KEYS.SESSION);
      if (sessionSaved) {
        const parsed: AdminSession = JSON.parse(sessionSaved);
        if (Date.now() - parsed.lastActive < INACTIVITY_TIMEOUT_MS) {
          return parsed;
        }
      }

      const localSaved = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (localSaved) {
        const parsed: AdminSession = JSON.parse(localSaved);
        if (parsed.rememberMe && Date.now() - parsed.lastActive < 24 * 60 * 60 * 1000) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed restoring admin session:', e);
    }
    return null;
  });

  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number>(0);
  const [lockoutSecondsRemaining, setLockoutSecondsRemaining] = useState<number>(0);
  const lastActivityRef = useRef<number>(Date.now());

  // Save credentials on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
    } catch (e) {
      console.error('Failed to persist credentials:', e);
    }
  }, [credentials]);

  // Save lockout info on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOCKOUT, JSON.stringify(lockout));
    } catch (e) {
      console.error('Failed to persist lockout:', e);
    }
  }, [lockout]);

  // Save audit logs on change (keep last 50)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs.slice(0, 50)));
    } catch (e) {
      console.error('Failed to persist audit logs:', e);
    }
  }, [auditLogs]);

  // Append Audit Log Helper
  const addAuditLog = useCallback((event: AuditEventType, details: string) => {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      event,
      deviceInfo: getBrowserSignature(),
      details,
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 49)]);
  }, []);

  // Save or clear session
  const saveSession = useCallback((sess: AdminSession | null) => {
    setSession(sess);
    if (!sess) {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sess));
      if (sess.rememberMe) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sess));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    }
  }, []);

  // Logout handler
  const logout = useCallback(
    (reason: string = 'User logged out manually') => {
      if (session) {
        addAuditLog('LOGOUT', `${reason} (${session.username})`);
      }
      saveSession(null);
    },
    [session, addAuditLog, saveSession]
  );

  // Inactivity & Lockout tick timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // Check lockout status
      if (lockout.lockedUntil) {
        if (now >= lockout.lockedUntil) {
          setLockout({ failedAttempts: 0, lockedUntil: null });
          setLockoutSecondsRemaining(0);
        } else {
          setLockoutSecondsRemaining(Math.ceil((lockout.lockedUntil - now) / 1000));
        }
      } else {
        setLockoutSecondsRemaining(0);
      }

      // Check session expiry
      if (session) {
        const timeoutLimit = session.rememberMe ? 24 * 60 * 60 * 1000 : INACTIVITY_TIMEOUT_MS;
        const elapsed = now - session.lastActive;
        const remaining = Math.max(0, Math.ceil((timeoutLimit - elapsed) / 1000));
        setSessionTimeRemaining(remaining);

        if (elapsed >= timeoutLimit) {
          addAuditLog('SESSION_TIMEOUT', `Session expired due to inactivity (${session.username})`);
          logout('Session expired due to inactivity');
        }
      } else {
        setSessionTimeRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, lockout, logout, addAuditLog]);

  // User activity tracker to refresh lastActive
  useEffect(() => {
    if (!session) return;

    const handleUserActivity = () => {
      const now = Date.now();
      // Throttle updates to once every 10 seconds to avoid excessive storage writes
      if (now - lastActivityRef.current > 10000) {
        lastActivityRef.current = now;
        setSession((prev) => {
          if (!prev) return null;
          const updated = { ...prev, lastActive: now };
          sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updated));
          if (updated.rememberMe) {
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updated));
          }
          return updated;
        });
      }
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [session]);

  // Login Method
  const login = async (
    identifier: string,
    passwordAttempt: string,
    rememberMe: boolean = false
  ): Promise<{ success: boolean; message?: string }> => {
    // Artificial security delay to mitigate timing & automated brute-force attacks
    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = Date.now();

    // 1. Check if currently locked out
    if (lockout.lockedUntil && now < lockout.lockedUntil) {
      const remainingMinutes = Math.ceil((lockout.lockedUntil - now) / 60000);
      return {
        success: false,
        message: `Account is temporarily locked for security. Please try again in ${remainingMinutes} minute(s).`,
      };
    }

    const trimmedId = identifier.trim().toLowerCase();
    const isUsernameMatch = timingSafeEqual(trimmedId, credentials.username.toLowerCase());
    const isEmailMatch = timingSafeEqual(trimmedId, credentials.email.toLowerCase());

    // 2. Validate Password with PBKDF2
    const isPasswordValid = await verifyPassword(
      passwordAttempt,
      credentials.salt,
      credentials.passwordHash
    );

    if ((isUsernameMatch || isEmailMatch) && isPasswordValid) {
      // Successful authentication
      const token = generateRandomToken();
      const newSession: AdminSession = {
        token,
        username: credentials.username,
        email: credentials.email,
        loginTime: now,
        lastActive: now,
        rememberMe,
      };

      // Reset lockout counter
      setLockout({ failedAttempts: 0, lockedUntil: null });
      saveSession(newSession);
      addAuditLog('LOGIN_SUCCESS', `Authenticated successfully as ${credentials.username}`);

      return { success: true };
    }

    // 3. Failed Authentication - Increment failed attempts
    const newFailedCount = lockout.failedAttempts + 1;
    let lockedUntil: number | null = null;
    let message = 'Invalid username/email or password.';

    if (newFailedCount >= MAX_FAILED_ATTEMPTS) {
      lockedUntil = now + LOCKOUT_DURATION_MS;
      setLockout({ failedAttempts: newFailedCount, lockedUntil });
      addAuditLog(
        'LOCKOUT_TRIGGERED',
        `Security lockout applied for 15 minutes after ${newFailedCount} failed attempts`
      );
      message = 'Too many failed login attempts. Account access is temporarily locked for 15 minutes.';
    } else {
      const remainingAttempts = MAX_FAILED_ATTEMPTS - newFailedCount;
      setLockout({ failedAttempts: newFailedCount, lockedUntil: null });
      addAuditLog(
        'LOGIN_FAILURE',
        `Failed login attempt for ID: "${trimmedId.substring(0, 3)}***". ${remainingAttempts} attempts remaining.`
      );
      message = `Invalid credentials. ${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining before security lockout.`;
    }

    return { success: false, message };
  };

  // Change Password
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message?: string }> => {
    // Artificial security delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 1. Verify current password
    const isCurrentValid = await verifyPassword(
      currentPassword,
      credentials.salt,
      credentials.passwordHash
    );

    if (!isCurrentValid) {
      return { success: false, message: 'The current password you provided is incorrect.' };
    }

    // 2. Verify password policy compliance
    const strength = checkPasswordStrength(newPassword);
    if (strength.score < 3) {
      return {
        success: false,
        message: 'New password does not meet security requirements. Please use at least 8 characters with upper, lower, numbers, and symbols.',
      };
    }

    // 3. Hash new password with fresh salt
    const newSalt = generateSalt();
    const newHash = await hashPassword(newPassword, newSalt);

    setCredentials((prev) => ({
      ...prev,
      salt: newSalt,
      passwordHash: newHash,
      passwordLastChanged: Date.now(),
    }));

    addAuditLog('PASSWORD_CHANGED', `Administrator password was successfully updated`);

    return { success: true, message: 'Password changed successfully.' };
  };

  // Reset Password using Master Recovery Key
  const resetPasswordWithRecoveryKey = async (
    recoveryKeyInput: string,
    newPassword: string
  ): Promise<{ success: boolean; message?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanInput = recoveryKeyInput.trim().toUpperCase();
    const isKeyValid = timingSafeEqual(cleanInput, credentials.recoveryKey.toUpperCase());

    if (!isKeyValid) {
      addAuditLog('LOGIN_FAILURE', 'Failed recovery key verification attempt');
      return { success: false, message: 'The emergency recovery key provided is invalid.' };
    }

    const strength = checkPasswordStrength(newPassword);
    if (strength.score < 3) {
      return {
        success: false,
        message: 'New password does not meet security requirements.',
      };
    }

    const newSalt = generateSalt();
    const newHash = await hashPassword(newPassword, newSalt);
    const newRecoveryKey = generateRecoveryKey();

    setCredentials((prev) => ({
      ...prev,
      salt: newSalt,
      passwordHash: newHash,
      recoveryKey: newRecoveryKey,
      passwordLastChanged: Date.now(),
    }));

    // Reset lockout
    setLockout({ failedAttempts: 0, lockedUntil: null });

    addAuditLog(
      'RECOVERY_RESET',
      `Master recovery key used to reset credentials. New recovery key issued.`
    );

    return {
      success: true,
      message: `Password reset successfully! Your new emergency recovery key is: ${newRecoveryKey}. Please save it in a secure location.`,
    };
  };

  // Regenerate Recovery Key
  const regenerateRecoveryKey = async (): Promise<string> => {
    const newKey = generateRecoveryKey();
    setCredentials((prev) => ({
      ...prev,
      recoveryKey: newKey,
    }));
    addAuditLog('PASSWORD_CHANGED', 'Emergency recovery key was regenerated');
    return newKey;
  };

  const getRecoveryKey = () => credentials.recoveryKey;

  const clearAuditLogs = () => {
    setAuditLogs([
      {
        id: `audit-${Date.now()}`,
        timestamp: Date.now(),
        event: 'LOGOUT',
        deviceInfo: getBrowserSignature(),
        details: 'Audit logs cleared by administrator',
      },
    ]);
  };

  const resetAuthToDefault = () => {
    localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT);
    setCredentials(initialCredentials);
    setSession(null);
    setLockout({ failedAttempts: 0, lockedUntil: null });
    addAuditLog('RECOVERY_RESET', 'Authentication credentials reset to initial defaults');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session,
        currentAdmin: session ? { username: session.username, email: session.email } : null,
        sessionTimeRemaining,
        lockoutInfo: {
          isLocked: !!(lockout.lockedUntil && Date.now() < lockout.lockedUntil),
          remainingSeconds: lockoutSecondsRemaining,
          failedAttempts: lockout.failedAttempts,
        },
        login,
        logout,
        changePassword,
        resetPasswordWithRecoveryKey,
        regenerateRecoveryKey,
        getRecoveryKey,
        auditLogs,
        clearAuditLogs,
        resetAuthToDefault,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
