export interface AdminSession {
  token: string;
  username: string;
  email: string;
  loginTime: number;
  lastActive: number;
  rememberMe: boolean;
}

export interface AdminCredentials {
  username: string;
  email: string;
  salt: string;
  passwordHash: string;
  recoveryKey: string;
  passwordLastChanged: number;
}

export interface LockoutState {
  failedAttempts: number;
  lockedUntil: number | null;
}

export type AuditEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT'
  | 'PASSWORD_CHANGED'
  | 'SESSION_TIMEOUT'
  | 'RECOVERY_RESET'
  | 'LOCKOUT_TRIGGERED';

export interface AuditLogEntry {
  id: string;
  timestamp: number;
  event: AuditEventType;
  deviceInfo: string;
  details: string;
}

export interface PasswordStrength {
  score: number; // 0 - 4
  label: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
  requirements: {
    label: string;
    met: boolean;
  }[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentAdmin: { username: string; email: string } | null;
  sessionTimeRemaining: number;
  lockoutInfo: { isLocked: boolean; remainingSeconds: number; failedAttempts: number };
  login: (identifier: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  logout: (reason?: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  resetPasswordWithRecoveryKey: (recoveryKey: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  regenerateRecoveryKey: () => Promise<string>;
  getRecoveryKey: () => string;
  auditLogs: AuditLogEntry[];
  clearAuditLogs: () => void;
  resetAuthToDefault: () => void;
}
