import React, { useState } from 'react';
import {
  X,
  KeyRound,
  ShieldAlert,
  History,
  CheckCircle,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { checkPasswordStrength } from '../../utils/crypto';

interface AdminSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSecurityModal: React.FC<AdminSecurityModalProps> = ({ isOpen, onClose }) => {
  const {
    changePassword,
    getRecoveryKey,
    regenerateRecoveryKey,
    auditLogs,
    clearAuditLogs,
    resetAuthToDefault,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'password' | 'recovery' | 'audit'>('password');

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Recovery Key State
  const [copiedKey, setCopiedKey] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRecoveryKey = getRecoveryKey();
  const passwordStrength = checkPasswordStrength(newPassword);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordNotice(null);

    if (newPassword !== confirmPassword) {
      setPasswordNotice({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordStrength.score < 3) {
      setPasswordNotice({
        type: 'error',
        text: 'New password does not meet security requirements.',
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordNotice({ type: 'success', text: res.message || 'Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordNotice({ type: 'error', text: res.message || 'Failed to update password.' });
      }
    } catch {
      setPasswordNotice({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(currentRecoveryKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleRegenerateKey = async () => {
    if (confirm('Regenerate emergency recovery key? The old key will immediately become invalid.')) {
      const newKey = await regenerateRecoveryKey();
      setRecoveryNotice(`New key generated: ${newKey}`);
      setTimeout(() => setRecoveryNotice(null), 5000);
    }
  };

  const formatTimestamp = (ts: number) => {
    return new Date(ts).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B35] text-white flex items-center justify-center">
              <KeyRound size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Admin Security & Access Controls</h2>
              <p className="text-xs text-gray-500">Manage encryption keys, authentication, and view audit history</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center border-b border-gray-200 px-5 gap-4 bg-white text-xs font-bold">
          <button
            onClick={() => setActiveTab('password')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'password'
                ? 'border-[#1B6B35] text-[#1B6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Lock size={14} />
            <span>Change Password</span>
          </button>

          <button
            onClick={() => setActiveTab('recovery')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'recovery'
                ? 'border-[#1B6B35] text-[#1B6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShieldAlert size={14} />
            <span>Emergency Recovery Key</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'audit'
                ? 'border-[#1B6B35] text-[#1B6B35]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <History size={14} />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              {passwordNotice && (
                <div
                  className={`p-3 rounded-lg font-semibold flex items-start gap-2 ${
                    passwordNotice.type === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {passwordNotice.type === 'success' ? (
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  )}
                  <span>{passwordNotice.text}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B6B35] text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">New Secure Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 chars with uppercase, lowercase, numbers & symbols"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B6B35] text-gray-900"
                />

                {/* Live Password Strength Meter */}
                {newPassword && (
                  <div className="mt-2.5 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-gray-600">Password Strength:</span>
                      <span className={`font-bold ${passwordStrength.color.split(' ')[0]}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-[11px]">
                      {passwordStrength.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-1.5 ${
                            req.met ? 'text-green-700 font-semibold' : 'text-gray-400'
                          }`}
                        >
                          <span className="text-xs">{req.met ? '✓' : '○'}</span>
                          <span>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B6B35] text-gray-900"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-5 py-2.5 bg-[#1B6B35] hover:bg-[#155429] text-white font-bold rounded-lg transition shadow flex items-center gap-2 disabled:opacity-50"
                >
                  {isChangingPassword ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Encrypting & Updating...</span>
                    </>
                  ) : (
                    <span>Save New Password</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: EMERGENCY RECOVERY KEY */}
          {activeTab === 'recovery' && (
            <div className="space-y-4 text-xs">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 space-y-1">
                <h4 className="font-bold flex items-center gap-1.5 text-amber-800">
                  <ShieldAlert size={16} />
                  <span>Important Emergency Access Key</span>
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Store this key in a secure password manager or offline location. If you ever forget your administrator password, this key allows immediate account recovery and password reset.
                </p>
              </div>

              {recoveryNotice && (
                <div className="p-3 bg-green-50 border border-green-300 text-green-800 rounded-lg font-semibold flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>{recoveryNotice}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block font-bold text-gray-700">Current Master Recovery Key</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentRecoveryKey}
                    className="w-full font-mono font-bold text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold flex items-center gap-1.5 border transition whitespace-nowrap"
                  >
                    {copiedKey ? (
                      <>
                        <Check size={14} className="text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">Regenerate Recovery Key</p>
                  <p className="text-[11px] text-gray-500">Invalidates the current key immediately</p>
                </div>
                <button
                  type="button"
                  onClick={handleRegenerateKey}
                  className="px-3 py-1.5 border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg transition"
                >
                  Generate New Key
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h4 className="font-bold text-gray-900">Security Audit Events</h4>
                  <p className="text-[11px] text-gray-500">Tracks sign-ins, failed attempts, and administrative security events</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Clear security audit trail?')) clearAuditLogs();
                  }}
                  className="text-[11px] text-gray-500 hover:text-red-600 font-semibold transition"
                >
                  Clear History
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {auditLogs.map((log) => {
                  let badgeColor = 'bg-gray-100 text-gray-700';
                  if (log.event === 'LOGIN_SUCCESS') badgeColor = 'bg-green-100 text-green-800';
                  else if (log.event === 'LOGIN_FAILURE' || log.event === 'LOCKOUT_TRIGGERED')
                    badgeColor = 'bg-red-100 text-red-800';
                  else if (log.event === 'PASSWORD_CHANGED' || log.event === 'RECOVERY_RESET')
                    badgeColor = 'bg-blue-100 text-blue-800';
                  else if (log.event === 'SESSION_TIMEOUT')
                    badgeColor = 'bg-amber-100 text-amber-800';

                  return (
                    <div key={log.id} className="p-3 hover:bg-gray-50/70 transition space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor}`}>
                          {log.event}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-800">{log.details}</p>
                      <p className="text-[10px] text-gray-400 italic">{log.deviceInfo}</p>
                    </div>
                  );
                })}
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t flex items-center justify-between bg-red-50/50 p-3 rounded-xl border border-red-100">
                <div>
                  <p className="font-bold text-red-900 text-xs">Reset All Security Credentials</p>
                  <p className="text-[10px] text-red-700">
                    Restores default username and initial temporary password
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        'WARNING: This will reset the admin credentials to default (admin / Muisa@Admin2026!) and end your session. Continue?'
                      )
                    ) {
                      resetAuthToDefault();
                      onClose();
                    }
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition text-xs shadow-sm"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
