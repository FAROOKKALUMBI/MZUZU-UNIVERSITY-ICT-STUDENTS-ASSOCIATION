import React, { useState } from 'react';
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertTriangle,
  KeyRound,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { checkPasswordStrength } from '../../utils/crypto';

export const AdminLogin: React.FC = () => {
  const { login, lockoutInfo, resetPasswordWithRecoveryKey } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDefaultHint, setShowDefaultHint] = useState(false);

  // Recovery modal state
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [recoveryKeyInput, setRecoveryKeyInput] = useState('');
  const [recoveryNewPassword, setRecoveryNewPassword] = useState('');
  const [recoveryConfirmPassword, setRecoveryConfirmPassword] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

  const formatLockoutTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setErrorMessage('Please provide both username/email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await login(identifier, password, rememberMe);
      if (!result.success && result.message) {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage('An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryMessage(null);

    if (!recoveryKeyInput.trim()) {
      setRecoveryMessage({ type: 'error', text: 'Please enter your emergency recovery key.' });
      return;
    }

    if (recoveryNewPassword !== recoveryConfirmPassword) {
      setRecoveryMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const strength = checkPasswordStrength(recoveryNewPassword);
    if (strength.score < 3) {
      setRecoveryMessage({
        type: 'error',
        text: 'New password must be at least 8 characters and include uppercase, lowercase, numbers, and symbols.',
      });
      return;
    }

    setIsRecovering(true);
    try {
      const result = await resetPasswordWithRecoveryKey(recoveryKeyInput, recoveryNewPassword);
      if (result.success) {
        setRecoveryMessage({
          type: 'success',
          text: result.message || 'Password reset successfully! You can now log in.',
        });
        setRecoveryKeyInput('');
        setRecoveryNewPassword('');
        setRecoveryConfirmPassword('');
      } else {
        setRecoveryMessage({
          type: 'error',
          text: result.message || 'Recovery key is invalid.',
        });
      }
    } catch {
      setRecoveryMessage({ type: 'error', text: 'Error executing recovery reset.' });
    } finally {
      setIsRecovering(false);
    }
  };

  const recoveryStrength = checkPasswordStrength(recoveryNewPassword);

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-gray-100 to-green-50/40">
      <div className="max-w-md w-full space-y-6">
        {/* Header / Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#155429] to-[#1B6B35] text-white shadow-lg shadow-green-900/20 mb-2">
            <Shield className="w-8 h-8 text-[#F5B83D]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Access Portal
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto">
            Mzuzu University ICT Student Association Content Management Studio
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-[#1B6B35] text-[11px] font-semibold mt-1">
            <ShieldCheck size={13} />
            <span>PBKDF2 SHA-256 Encrypted Session</span>
          </div>
        </div>

        {/* Lockout Warning Banner */}
        {lockoutInfo.isLocked && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-fade-in">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-red-800">Security Lockout Active</h3>
                <p className="text-xs text-red-700 mt-1">
                  Access has been temporarily restricted due to consecutive failed attempts.
                  Please wait{' '}
                  <span className="font-mono font-bold text-red-900 underline">
                    {formatLockoutTimer(lockoutInfo.remainingSeconds)}
                  </span>{' '}
                  before attempting again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && !lockoutInfo.isLocked && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm animate-fade-in">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Authentication Failed
                </h3>
                <p className="text-xs text-amber-700 mt-0.5 font-medium">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Username / Email */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5"
              >
                Username or Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  disabled={lockoutInfo.isLocked || isLoading}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin or admin@muisa.org"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#1B6B35] focus:border-[#1B6B35] transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsRecoveryOpen(true)}
                  className="text-xs font-medium text-[#1B6B35] hover:text-[#155429] transition hover:underline"
                >
                  Emergency Reset?
                </button>
              </div>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={lockoutInfo.isLocked || isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#1B6B35] focus:border-[#1B6B35] transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                />
                <button
                  type="button"
                  disabled={lockoutInfo.isLocked || isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={lockoutInfo.isLocked || isLoading}
                  className="h-4 w-4 text-[#1B6B35] focus:ring-[#1B6B35] border-gray-300 rounded"
                />
                <span className="ml-2 text-xs text-gray-600 select-none">
                  Keep session active for 24 hours
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={lockoutInfo.isLocked || isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#1B6B35] hover:bg-[#155429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B6B35] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Studio</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Credential Hint for setup */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowDefaultHint(!showDefaultHint)}
              className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition"
            >
              <HelpCircle size={14} className="text-[#F5B83D]" />
              <span>{showDefaultHint ? 'Hide initial setup credentials' : 'View initial default credentials'}</span>
            </button>

            {showDefaultHint && (
              <div className="mt-3 p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1.5 text-gray-700 animate-fade-in">
                <div className="font-bold text-[#1B6B35] flex items-center gap-1">
                  <KeyRound size={13} />
                  <span>Default System Credentials</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-sans">Username:</span>
                    <span className="bg-white px-2 py-1 border rounded block font-semibold text-gray-900 select-all">
                      admin
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-sans">Password:</span>
                    <span className="bg-white px-2 py-1 border rounded block font-semibold text-gray-900 select-all">
                      Muisa@Admin2026!
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 pt-1 italic">
                  Tip: You can change this password or regenerate the emergency recovery key inside the Admin Studio Security tab.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-2">
          <span>Protected by MUISA Security Protocols</span>
          <span>•</span>
          <span>5 Failed Attempts Limit</span>
        </div>
      </div>

      {/* Emergency Recovery Modal */}
      {isRecoveryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-900">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Emergency Account Recovery</h3>
                  <p className="text-[11px] text-gray-500">Reset password using Master Recovery Key</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsRecoveryOpen(false);
                  setRecoveryMessage(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            {recoveryMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold flex items-start gap-2 ${
                  recoveryMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {recoveryMessage.type === 'success' ? (
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                )}
                <span>{recoveryMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleRecoverySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Emergency Recovery Key</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MUISA-SEC-9247-5183-KX49"
                  value={recoveryKeyInput}
                  onChange={(e) => setRecoveryKeyInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-xs uppercase focus:ring-2 focus:ring-[#1B6B35]"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Default key for fresh setups: <code className="bg-gray-100 px-1 py-0.5 rounded select-all font-bold">MUISA-SEC-9247-5183-KX49</code>
                </p>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">New Secure Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 chars with upper, lower, number, symbol"
                  value={recoveryNewPassword}
                  onChange={(e) => setRecoveryNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B6B35]"
                />

                {/* Password Strength Indicator */}
                {recoveryNewPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-500">Strength:</span>
                      <span className="font-bold text-gray-700">{recoveryStrength.label}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${recoveryStrength.color}`}
                        style={{ width: `${(recoveryStrength.score + 1) * 20}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={recoveryConfirmPassword}
                  onChange={(e) => setRecoveryConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B6B35]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsRecoveryOpen(false)}
                  className="px-3 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isRecovering}
                  className="px-4 py-2 text-white bg-[#1B6B35] hover:bg-[#155429] rounded-lg font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isRecovering ? 'Resetting...' : 'Reset & Save Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
