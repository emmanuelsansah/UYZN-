import React, { useState } from 'react';
import { Sparkles, Loader2, Award, ArrowRight, CheckCircle2, Compass, Briefcase } from 'lucide-react';

export const AICareerRecommender: React.FC<{ onApplyTrade?: (trade: string) => void }> = ({ onApplyTrade }) => {
  const [education, setEducation] = useState('SHS / WASSCE');
  const [currentSkills, setCurrentSkills] = useState('Driving, Electrical Basics');
  const [interestArea, setInterestArea] = useState('Mining Supply Chain & Machinery');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    primaryTrade: string;
    tradeDescription: string;
    targetSubcontractors: string[];
    trainingDuration: string;
    actionPlan: string[];
  } | null>(null);

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Custom recommendation logic tailored to Tarkwa mining & TVET ecosystem
      let trade = 'Certified Heavy Machinery Operator';
      let desc = 'High-demand operational trade across AngloGold Ashanti Tarkwa concession sub-contractors (excavators, dump trucks, haulage).';
      let subs = ['AngloGold Sub-contracting Fleet', 'Tarkwa Haulage Co.', 'West Africa Earthmovers'];
      let duration = '12 Weeks Technical Academy';
      let plan = [
        'Complete UYZN Heavy Machinery Theory & Safety Module',
        'Obtain Class C/D Heavy Driving Certification',
        'Undergo 4-week supervised site apprenticeship at Bankyim Technical Hub'
      ];

      if (interestArea.includes('Agri') || currentSkills.includes('Farming')) {
        trade = 'Commercial Greenhouse & Hydroponics Agronomist';
        desc = 'High-growth agribusiness trade producing organic crops for local Tarkwa market supply.';
        subs = ['Pepesa Agri-Cooperative', 'New Tokunaso Greenhouse Hub', 'AngloGold Community Farm Initiative'];
        duration = '8 Weeks Hands-on Farm Apprenticeship';
        plan = [
          'Enroll in New Tokunaso Agri-Tech Demonstration Farm',
          'Apply for UYZN Young Agri-Entrepreneur Equipment Grant',
          'Form 3-member youth farm cluster for shared irrigation'
        ];
      } else if (interestArea.includes('Tech') || education.includes('Degree')) {
        trade = 'Industrial GIS & Mine Safety Data Analyst';
        desc = 'Technical role conducting spatial mapping, environmental compliance auditing, and safety data logging.';
        subs = ['Tarkwa Tech Incubator', 'AngloGold Environmental Office', 'Mining Safety Consults'];
        duration = '10 Weeks GIS & Data Bootcamp';
        plan = [
          'Complete UYZN Digital GIS & Data Diagnostics Course',
          'Participate in quarterly Tarkwa Youth Environmental Audit',
          'Register on UYZN Local Content Placement Desk'
        ];
      }

      setRecommendation({
        primaryTrade: trade,
        tradeDescription: desc,
        targetSubcontractors: subs,
        trainingDuration: duration,
        actionPlan: plan
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-[#0E1A12] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-900/60 shadow-lg space-y-6">
      
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
            AI Youth Career & TVET Trade Recommender
          </h3>
          <p className="text-xs text-slate-500">
            Intelligent trade mapping for youth across the 19 Tarkwa catchment communities
          </p>
        </div>
      </div>

      <form onSubmit={handleRecommend} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Educational Background
          </label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="JHS / BECE">JHS / BECE</option>
            <option value="SHS / WASSCE">SHS / WASSCE</option>
            <option value="TVET / Vocational">TVET / Vocational</option>
            <option value="Undergraduate Degree">Undergraduate Degree</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Current Basic Skills
          </label>
          <input
            type="text"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            placeholder="e.g. Electrical basics, carpentry, driving"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Primary Interest Area
          </label>
          <select
            value={interestArea}
            onChange={(e) => setInterestArea(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="Mining Supply Chain & Machinery">Mining Supply Chain & Heavy Machinery</option>
            <option value="Agriculture & Agri-Business">Agriculture & Agri-Business</option>
            <option value="Tech & Digital Skills">Tech & Digital Skills</option>
            <option value="Trade & Small Business">Trade & Small Business</option>
          </select>
        </div>

        <div className="md:col-span-3 pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Analyzing Catchment Trade Pathways...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                <span>Generate TVET Career Pathway</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Output Recommendation */}
      {recommendation && (
        <div className="p-6 bg-emerald-950 text-white rounded-2xl border border-emerald-700 space-y-4 shadow-lg animate-fade-in text-xs">
          
          <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
            <div>
              <div className="text-[10px] text-amber-400 font-mono uppercase font-bold">Recommended Technical Trade</div>
              <h4 className="text-xl font-bold font-display text-white mt-0.5">{recommendation.primaryTrade}</h4>
            </div>
            <span className="px-3 py-1 bg-emerald-900 text-amber-300 rounded-lg font-mono font-bold">
              {recommendation.trainingDuration}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            {recommendation.tradeDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <div className="font-bold text-amber-300 font-mono text-[11px]">Recommended Action Steps:</div>
              <div className="space-y-1.5">
                {recommendation.actionPlan.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-amber-300 font-mono text-[11px]">Potential Local Placement Desks:</div>
              <div className="flex flex-wrap gap-1.5">
                {recommendation.targetSubcontractors.map((sub, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-emerald-900 text-emerald-200 rounded-md font-mono text-[10px]">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
