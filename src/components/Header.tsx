import React, { useState } from 'react';
import { Shield, Menu, X, Lock, LogOut, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_LOGO_PATH, OFFICIAL_MOTTO } from '../data/initialData';
import { MemberVerificationModal } from './MemberVerificationModal';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAuthModal }) => {
  const { session, logout, cmsContent, youthMembers } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const activeYouthCount = youthMembers.filter(m => m.isActive).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About UYZN' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'communities', label: 'Our Communities' },
    { id: 'register', label: 'Youth Registration' },
    { id: 'programs', label: 'Programs & TVET' },
    { id: 'news', label: 'News & Dispatches' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#060F08]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-950/80 shadow-xs transition-colors no-print">
      
      {/* Top Banner Tagline Strip */}
      <div className="bg-gradient-to-r from-[#0A5C28] via-[#0F4C27] to-[#07381A] text-white text-[11px] py-1.5 px-4 font-medium border-b border-emerald-900 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px] tracking-wide uppercase">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              UYZN Digital Hub
            </span>
            <span aria-hidden="true" className="text-emerald-400">·</span>
            <span className="truncate text-emerald-100">AngloGold Ashanti Tarkwa Catchment, Ghana</span>
          </div>

          <div className="flex items-center gap-3 text-emerald-100">
            <span>President: <strong className="text-white font-semibold">{cmsContent.presidentName}</strong></span>
            <span aria-hidden="true" className="text-emerald-500">|</span>
            <span className="font-bold text-amber-300 font-mono tracking-wide uppercase">"{OFFICIAL_MOTTO}"</span>
            <span aria-hidden="true" className="text-emerald-500">|</span>
            <span className="text-amber-400 font-mono font-semibold">{activeYouthCount} Youth Enrolled</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Official Emblem + Brand Title */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3.5 text-left shrink-0 group focus:outline-none"
          >
            {/* Logo Emblem */}
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-md ring-2 ring-[#D4AF37] group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
              <img
                src={OFFICIAL_LOGO_PATH}
                alt="Unity Youth Zone Network Official Logo"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight leading-none font-display group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                UNITY YOUTH ZONE NETWORK
              </div>
              <div className="text-[11px] font-bold text-emerald-800 dark:text-amber-400 tracking-wider uppercase mt-1 flex items-center gap-1.5">
                <span>Peace and Unity in Development</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-slate-500 font-normal">19 Catchment Communities</span>
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 relative ${
                  activeTab === item.id
                    ? 'text-emerald-800 dark:text-emerald-400 font-bold'
                    : 'hover:text-emerald-700 dark:hover:text-emerald-300'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 border border-emerald-300 dark:border-emerald-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
              title="Verify Member ID"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Verify Member</span>
            </button>

            {session.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab(session.role === 'admin' ? 'admin' : 'coordinator')}
                  className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-950" />
                  <span>{session.role === 'admin' ? 'Admin Hub' : `${session.assignedCommunity} Portal`}</span>
                </button>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 rounded-xl transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap shrink-0"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>Portal Login</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Member Verification Modal */}
      <MemberVerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

    </header>
  );
};
