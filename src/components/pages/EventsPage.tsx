import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventsPage: React.FC = () => {
  const { events, rsvpEvent } = useApp();
  const [rsvpSuccessId, setRsvpSuccessId] = useState<string | null>(null);

  const handleRSVP = (id: string) => {
    rsvpEvent(id);
    setRsvpSuccessId(id);
    setTimeout(() => setRsvpSuccessId(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="max-w-3xl space-y-2">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
          Community Engagement
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Upcoming Events & Community Fora
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-6 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold rounded-md">
                  {ev.category} · {ev.community}
                </span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{ev.status}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                {ev.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ev.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-emerald-900/60 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {ev.date} ({ev.time})</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {ev.location}</div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-[11px]">{ev.rsvpCount} Attending</span>
                <button
                  onClick={() => handleRSVP(ev.id)}
                  className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1"
                >
                  {rsvpSuccessId === ev.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                      <span>RSVP Confirmed!</span>
                    </>
                  ) : (
                    <span>RSVP Attendance</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
