import React, { useState } from 'react';
import { ArrowRight, MapPin, Bell, ChevronRight, ShieldCheck, Sparkles, Award, CheckCircle2, QrCode, IdCard, Users, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_LOGO_PATH, OFFICIAL_MOTTO } from '../../data/initialData';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const { cmsContent, youthMembers, communities, announcements, events } = useApp();
  const [showIdCardPreview, setShowIdCardPreview] = useState(false);

  const activeYouthCount = youthMembers.filter(m => m.isActive).length;
  const verifiedYouthCount = youthMembers.filter(m => m.membershipStatus === 'Verified Member').length;

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. High-Impact Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061208] via-[#091D0E] to-[#050E07] text-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-emerald-950">
        
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Strategic Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-900/90 border border-emerald-700/80 text-amber-300 text-xs font-semibold shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>AngloGold Ashanti Tarkwa Catchment · Western Region, Ghana</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Motto: "{OFFICIAL_MOTTO}"</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-display" style={{ textWrap: 'balance' }}>
                One Network. <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">Nineteen Communities.</span> One Vision.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                The Unity Youth Zone Network (UYZN), under the presidency of <strong className="text-white">{cmsContent.presidentName}</strong>, unites young citizens across 19 catchment communities to drive TVET trade mastery, local content mining employment, and youth-led economic transformation.
              </p>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-6 py-3.5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl transition-all shadow-lg hover:shadow-amber-400/20 flex items-center gap-2.5"
                >
                  <span>Register as Youth Member</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowIdCardPreview(true)}
                  className="px-5 py-3.5 text-xs font-semibold text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 rounded-xl border border-emerald-700/80 transition-colors flex items-center gap-2"
                >
                  <IdCard className="w-4 h-4 text-amber-400" />
                  <span>Preview UYZN Youth ID Card</span>
                </button>
              </div>

              {/* Statistics Ticker Strip */}
              <div className="pt-8 border-t border-emerald-900/80 grid grid-cols-3 gap-6">
                <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-900/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {activeYouthCount}+
                  </div>
                  <div className="text-xs text-emerald-200 mt-0.5 font-medium">
                    Verified Youth Enrolled
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-900/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    18 + 1
                  </div>
                  <div className="text-xs text-emerald-200 mt-0.5 font-medium">
                    Catchment Communities
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-900/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-emerald-200 mt-0.5 font-medium">
                    Data Integrity Audit
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Official Logo Emblem Showcase Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-700/80 bg-gradient-to-b from-[#0B2412] to-[#061208] p-8 shadow-2xl space-y-6 text-center group">
                
                {/* Ghana Flag Bar Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#006B3F] rounded-full" />

                {/* Official Logo Display */}
                <div className="w-48 h-48 mx-auto rounded-full bg-white p-2 shadow-2xl ring-4 ring-amber-400 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={OFFICIAL_LOGO_PATH}
                    alt="Unity Youth Zone Network Official Emblem Logo"
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xl font-extrabold font-display text-white tracking-tight">
                    UNITY YOUTH ZONE NETWORK
                  </div>
                  <div className="text-xs font-extrabold text-amber-400 uppercase font-mono tracking-wider">
                    "{OFFICIAL_MOTTO}"
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto pt-1">
                    Official digital youth platform representing Pepesa, Bankyim, Teberebie, Awudua, Essuaso, and all 19 catchment communities.
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-950/90 rounded-2xl border border-emerald-800 text-[11px] text-emerald-200 font-mono flex items-center justify-between shadow-inner">
                  <span className="text-amber-400 font-bold">Executive President:</span>
                  <span className="font-bold text-white">{cmsContent.presidentName}</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. President Dr. Christian Dese Agbesi Welcome Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0E1A12] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-emerald-900/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-52 h-52 rounded-2xl overflow-hidden ring-4 ring-amber-400 shadow-xl">
              <img
                src="/src/assets/images/uyzn_president_portrait_1794230979741.jpg"
                alt="Dr. Christian Dese Agbesi"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {cmsContent.presidentName}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5 uppercase tracking-wider font-mono">
                {cmsContent.presidentTitle}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-bold font-mono">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Presidential Statement</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Peace and Unity in Development
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-amber-400 pl-4 py-1 font-serif">
              "{cmsContent.presidentMessage}"
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-2.5 text-xs font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950 hover:bg-emerald-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Read Full Organizational Mission</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Catchment Communities Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono mb-1">
              Territorial Mapping & Demographic Data
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Serving 19 Catchment Communities
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('communities')}
            className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Communities & Coordinators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 18 + 1 Communities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {communities.map((comm) => (
            <button
              key={comm.id}
              onClick={() => setActiveTab('communities')}
              className={`p-3.5 rounded-xl border text-left transition-all hover:shadow-md space-y-1 group ${
                comm.isEditable19thSlot
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                  : 'bg-white dark:bg-[#0E1A12] border-slate-200 dark:border-emerald-900/60 hover:border-emerald-500'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                {comm.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                {comm.code} · {comm.registeredYouthCount} Youth
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Latest Dispatches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Latest News & Announcements
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('news')}
            className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
          >
            View All Updates
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-6 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 rounded-md font-bold text-[11px]">
                  {ann.category}
                </span>
                <span className="font-mono">{ann.date}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {ann.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ann.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Youth Digital ID Card Modal Preview */}
      {showIdCardPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <IdCard className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">UYZN Digital Youth Identity Card</h3>
              </div>
              <button onClick={() => setShowIdCardPreview(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-lg">
                ×
              </button>
            </div>

            {/* Simulated Digital ID Pass */}
            <div className="bg-gradient-to-b from-[#0A5C28] to-[#04210E] text-white p-6 rounded-2xl border-2 border-amber-400 shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <img src={OFFICIAL_LOGO_PATH} alt="UYZN Logo" className="w-8 h-8 rounded-full bg-white p-0.5" />
                  <div>
                    <div className="font-extrabold text-xs tracking-tight">UNITY YOUTH ZONE NETWORK</div>
                    <div className="text-[9px] text-amber-300 font-mono uppercase">Peace & Unity in Development</div>
                  </div>
                </div>
                <div className="text-right font-mono text-[9px] text-emerald-300">
                  OFFICIAL ID
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 items-center">
                <div className="w-20 h-20 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden border border-amber-400 flex items-center justify-center text-slate-500 text-xs font-mono">
                  <span>PHOTO</span>
                </div>
                <div className="col-span-2 space-y-1 text-xs">
                  <div className="font-mono text-[10px] text-amber-300 font-bold">ID: UYZN-2026-0042</div>
                  <div className="font-extrabold text-sm text-white">KWAME OSEI TUTU</div>
                  <div className="text-[11px] text-emerald-200">Community: <strong className="text-white">Pepesa</strong></div>
                  <div className="text-[10px] text-slate-300">Skill: Heavy Machinery / TVET</div>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-[10px] text-emerald-200 font-mono">
                <span>President: Dr. Christian Dese Agbesi</span>
                <span className="text-amber-400 font-bold">VERIFIED MEMBER</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Complete the <strong className="text-slate-900 dark:text-white">Youth Registration</strong> form to generate your verified digital member record.
            </p>

            <button
              onClick={() => {
                setShowIdCardPreview(false);
                setActiveTab('register');
              }}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-extrabold text-xs transition-colors shadow-md"
            >
              Proceed to Youth Registration
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
