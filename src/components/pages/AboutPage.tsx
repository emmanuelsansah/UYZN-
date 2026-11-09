import React from 'react';
import { Target, Compass, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { cmsContent } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
          About Unity Youth Zone Network
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Connecting & Empowering Youth Across 19 Communities
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The official organizational framework serving young citizens in the AngloGold Ashanti Tarkwa Catchment Area, Western Region, Ghana.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {cmsContent.missionStatement}
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Our Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {cmsContent.visionStatement}
          </p>
        </div>
      </div>

      {/* Background & Purpose */}
      <div className="bg-slate-50 dark:bg-[#0E1A12] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          Background & Organizational Purpose
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The AngloGold Ashanti Tarkwa catchment encompasses 19 distinct local communities. To address youth unemployment, skill gaps, and fragmented youth representation, UYZN was established under the leadership of President Dr. Christian Agbesi Duse. UYZN provides a unified digital registry and operational bridge between youth, mining sub-contractors, traditional authorities, and development partners.
        </p>
      </div>

      {/* Core Values */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cmsContent.coreValues.map((value: string, idx: number) => (
            <div key={idx} className="p-4 bg-white dark:bg-[#0E1A12] rounded-xl border border-slate-200 dark:border-emerald-900/60 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
