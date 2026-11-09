import React, { useState } from 'react';
import { X, Shield, Users, Lock, Key, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AuthRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: AuthRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, communities } = useApp();
  const [role, setRole] = useState<AuthRole>('admin');
  const [email, setEmail] = useState('admin@uyzn.org');
  const [password, setPassword] = useState('admin123');
  const [selectedCommunity, setSelectedCommunity] = useState('Pepesa');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = login(role, email, password, selectedCommunity);
    if (success) {
      onSuccess(role);
      onClose();
    } else {
      setError('Invalid credentials. Use admin@uyzn.org / admin123 for Super Admin login.');
    }
  };

  const handleQuickDemoAdmin = () => {
    setRole('admin');
    setEmail('admin@uyzn.org');
    setPassword('admin123');
    login('admin', 'admin@uyzn.org', 'admin123');
    onSuccess('admin');
    onClose();
  };

  const handleQuickDemoCoordinator = (commName: string) => {
    setRole('coordinator');
    setSelectedCommunity(commName);
    login('coordinator', `coordinator.${commName.toLowerCase().replace(/\s+/g, '')}@uyzn.org`, 'demo', commName);
    onSuccess('coordinator');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-800 text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-display">UYZN Digital Portal Login</h3>
              <p className="text-xs text-emerald-200">Secure Access for Executives & Coordinators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Quick Demo Access Bar */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
            <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-600" />
              <span>Quick Demo Access Shortcuts</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-semibold text-[11px] hover:bg-emerald-900 transition-colors flex items-center gap-1"
              >
                <span>Login as Super Admin</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoCoordinator('Pepesa')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-100 font-medium text-[11px] hover:bg-slate-700 transition-colors"
              >
                Pepesa Coordinator
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoCoordinator('Teberebie')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-100 font-medium text-[11px] hover:bg-slate-700 transition-colors"
              >
                Teberebie Coordinator
              </button>
            </div>
          </div>

          {/* Role selector */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setEmail('admin@uyzn.org');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                role === 'admin'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Super Administrator</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('coordinator')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                role === 'coordinator'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>Community Coordinator</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {role === 'admin' ? (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">Default Password: admin123</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Assigned Catchment Community
                  </label>
                  <select
                    value={selectedCommunity}
                    onChange={(e) => setSelectedCommunity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                  >
                    {communities.map((c) => (
                      <option key={c.id} value={c.name}>{c.name} ({c.zone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Coordinator Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={`coordinator.${selectedCommunity.toLowerCase().replace(/\s+/g, '')}@uyzn.org`}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Authenticate & Open Portal</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
