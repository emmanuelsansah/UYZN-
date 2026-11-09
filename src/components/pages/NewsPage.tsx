import React from 'react';
import { Bell, Calendar, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewsPage: React.FC = () => {
  const { announcements } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="max-w-3xl space-y-2">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
          Official Information Dispatch
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          News & Announcements
        </h1>
      </div>

      <div className="space-y-6">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-8 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold rounded-md">
                  {ann.category}
                </span>
                {ann.isPinned && (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-md">
                    Pinned
                  </span>
                )}
              </div>
              <span className="font-mono">{ann.date}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              {ann.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {ann.content}
            </p>

            <div className="text-[11px] text-slate-400 font-mono">
              Published by: {ann.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
