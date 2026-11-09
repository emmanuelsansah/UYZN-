import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage: React.FC = () => {
  const { cmsContent } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-2">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
          Executive Secretariat
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Contact Unity Youth Zone Network
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Reach out to our administrative Secretariat or President Dr. Christian Agbesi Duse's office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 bg-emerald-950 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-emerald-800">
          <h2 className="text-xl font-bold font-display text-white">
            Secretariat Details
          </h2>

          <div className="space-y-4 text-xs text-emerald-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Official Office:</div>
                <div>{cmsContent.contactAddress}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Telephone:</div>
                <div className="font-mono">{cmsContent.contactPhone}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Official Email:</div>
                <div className="font-mono">{cmsContent.contactEmail}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-900 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-amber-400">Office Working Hours:</div>
            <div>Monday – Friday: 08:00 AM – 05:00 PM GMT</div>
            <div>Tarkwa, Western Region, Ghana</div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-[#0E1A12] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/60 shadow-lg space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Send Official Message
          </h2>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Partnership Request / Community Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Official Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Thank you. The Secretariat will respond to your message shortly.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
