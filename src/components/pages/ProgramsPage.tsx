import React from 'react';
import { Award, Users, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AICareerRecommender } from '../AICareerRecommender';

export const ProgramsPage: React.FC = () => {
  const { programs } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
          Skill Empowerment & Economic Placement
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          UYZN Programs & TVET Vocational Initiatives
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Structured technical training academies, agricultural seed funds, and local content mining employment placement drives across all 19 catchment communities.
        </p>
      </div>

      {/* AI Career & TVET Skill Recommender Widget */}
      <AICareerRecommender />

      {/* Programs Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
          Active & Upcoming Flagship Initiatives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white dark:bg-[#0E1A12] rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/60 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-950/90 text-amber-300 rounded-lg font-bold text-[11px] border border-emerald-800 shadow-sm">
                    {prog.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-200 dark:border-emerald-900/60 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {prog.location}</div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-emerald-600" /> {prog.participantCount} Target Beneficiaries</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
