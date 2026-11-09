import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, XCircle, X, MapPin, User, Award, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { YouthMember } from '../types';
import { OFFICIAL_LOGO_PATH, OFFICIAL_MOTTO } from '../data/initialData';

interface MemberVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemberVerificationModal: React.FC<MemberVerificationModalProps> = ({ isOpen, onClose }) => {
  const { youthMembers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedMember, setSearchedMember] = useState<YouthMember | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toLowerCase();
    const found = youthMembers.find(
      m => m.id.toLowerCase() === query || m.phone.includes(query) || m.fullName.toLowerCase() === query
    );
    setSearchedMember(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white dark:bg-[#0E1A12] border border-slate-200 dark:border-emerald-900/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-emerald-900/60 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-display">
                Public Member Verification Portal
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">Verify UYZN Member ID or Phone Number</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Enter Member ID (e.g. UYZN-2026-0001) or Phone Number:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="UYZN-2026-0001 or 0245550101"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
            >
              Verify Record
            </button>
          </div>
        </form>

        {/* Result Area */}
        {hasSearched && (
          <div>
            {searchedMember ? (
              <div className="p-5 bg-emerald-950 text-white rounded-2xl border-2 border-emerald-600 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-xs text-emerald-300">VERIFIED OFFICIAL UYZN MEMBER</span>
                  </div>
                  <span className="font-mono text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-amber-300">
                    {searchedMember.id}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Full Name: </span>
                    <strong className="text-white text-sm font-display">{searchedMember.fullName}</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>Catchment Community: <strong className="text-amber-300">{searchedMember.community}</strong></div>
                    <div>Gender / Age: <strong className="text-slate-200">{searchedMember.gender}, {searchedMember.age} yrs</strong></div>
                    <div>Education: <strong className="text-slate-200">{searchedMember.educationLevel}</strong></div>
                    <div>Status: <strong className="text-emerald-400 uppercase">{searchedMember.membershipStatus}</strong></div>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/80">
                    <div className="text-[10px] text-slate-400 mb-1">Registered Trade & Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {searchedMember.skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-emerald-900 rounded text-[10px] font-mono text-amber-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono text-center pt-1">
                  Verified by Executive Secretariat · President Dr. Christian Dese Agbesi
                </div>
              </div>
            ) : (
              <div className="p-6 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 text-center space-y-2">
                <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto" />
                <h4 className="font-bold text-xs text-rose-900 dark:text-rose-300">No Verified Member Record Found</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  No registered youth member matched "{searchQuery}". Please check the ID format or complete new registration.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
