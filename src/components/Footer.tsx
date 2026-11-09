import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_LOGO_PATH, OFFICIAL_MOTTO } from '../data/initialData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { cmsContent } = useApp();

  return (
    <footer className="bg-[#050D07] text-slate-300 border-t border-emerald-950 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-950">
          
          {/* Column 1: Organization Info & Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-md ring-2 ring-emerald-600/50 shrink-0 flex items-center justify-center">
                <img
                  src={OFFICIAL_LOGO_PATH}
                  alt="Unity Youth Zone Network Official Emblem"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="font-extrabold text-lg text-white font-display tracking-tight">
                  UNITY YOUTH ZONE NETWORK
                </div>
                <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider font-mono">
                  "{OFFICIAL_MOTTO}"
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Connecting young citizens, capturing accurate youth demographic data, and promoting vocational TVET education, employment, and entrepreneurship across the 19 communities of the AngloGold Ashanti Tarkwa catchment area, Western Region, Ghana.
            </p>

            <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-900/80 space-y-1 text-[11px] text-emerald-300 font-mono">
              <div className="font-bold text-white">Executive President: {cmsContent.presidentName}</div>
              <div>Coverage: AngloGold Ashanti Tarkwa Concession, Western Region, Ghana</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider font-mono text-amber-400">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  About UYZN & History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('leadership')} className="hover:text-white transition-colors">
                  Executive Leadership
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('communities')} className="hover:text-white transition-colors">
                  18 + 1 Communities Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('register')} className="hover:text-white transition-colors font-bold text-amber-400">
                  Youth Member Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('programs')} className="hover:text-white transition-colors">
                  Programs & Technical Trades
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('news')} className="hover:text-white transition-colors">
                  News & Official Dispatches
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Office */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider font-mono text-amber-400">
              Executive Secretariat
            </div>
            
            <div className="space-y-2.5 text-slate-300 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{cmsContent.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{cmsContent.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{cmsContent.contactEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('register')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Complete Youth Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Unity Youth Zone Network (UYZN). Led by Executive President {cmsContent.presidentName}.
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>Peace and Unity in Development</span>
            <span aria-hidden="true">·</span>
            <span>Tarkwa, Ghana</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
