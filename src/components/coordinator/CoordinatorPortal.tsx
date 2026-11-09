import React, { useState } from 'react';
import { ShieldAlert, Users, Plus, FileText, CheckCircle2, Search, Send, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { YouthMember } from '../../types';

export const CoordinatorPortal: React.FC = () => {
  const { session, youthMembers, submitCoordinatorReport, addYouthMember, communities } = useApp();
  const assignedCommunity = session.assignedCommunity || 'Pepesa';

  // Filter youth members ONLY for this assigned community
  const communityYouth = youthMembers.filter(
    m => m.community.toLowerCase() === assignedCommunity.toLowerCase()
  );

  const [activeTab, setActiveTab] = useState<'members' | 'register' | 'report'>('members');
  const [searchTerm, setSearchTerm] = useState('');

  // Report Form State
  const [reportPeriod, setReportPeriod] = useState('November 2026');
  const [activities, setActivities] = useState('');
  const [challenges, setChallenges] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Community Specific Quick Register State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAge, setRegAge] = useState(22);
  const [regGender, setRegGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [regOccupation, setRegOccupation] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const filteredYouth = communityYouth.filter(
    m => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitCoordinatorReport({
      communityId: `comm-${assignedCommunity}`,
      communityName: assignedCommunity,
      coordinatorName: session.name || `${assignedCommunity} Coordinator`,
      period: reportPeriod,
      newMembersRegistered: communityYouth.length,
      keyActivities: activities,
      challenges: challenges,
      recommendations: recommendations
    });
    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 4000);
  };

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addYouthMember({
      fullName: regName,
      gender: regGender,
      dateOfBirth: '2004-01-01',
      age: regAge,
      phone: regPhone,
      community: assignedCommunity,
      residentialLocation: `${assignedCommunity} Central`,
      educationLevel: 'SHS / WASSCE',
      employmentStatus: 'unemployed',
      occupation: regOccupation || 'Seeking TVET Training',
      skills: ['General Operations'],
      areasOfInterest: ['Mining Supply Chain'],
      entrepreneurshipStatus: 'Aspiring Entrepreneur',
      membershipStatus: 'Verified Member',
      consentGiven: true
    });

    setRegSuccess(true);
    setRegName('');
    setRegPhone('');
    setRegOccupation('');
    setTimeout(() => setRegSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Coordinator Header */}
      <div className="bg-[#0E1A12] text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-lg font-mono text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Community Coordinator Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            {assignedCommunity} Catchment Zone Console
          </h1>
          <p className="text-xs text-emerald-200">
            Isolated local youth data management for {assignedCommunity} Community.
          </p>
        </div>

        <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-800 text-right space-y-1 font-mono text-xs">
          <div className="text-amber-400 font-bold text-lg tabular-nums">{communityYouth.length} Registered</div>
          <div className="text-emerald-300 text-[11px]">{assignedCommunity} Verified Youth</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs">
        <button
          onClick={() => setActiveTab('members')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'members'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>{assignedCommunity} Youth Records ({communityYouth.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'register'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Register Local Member</span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'report'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Submit Monthly Report</span>
        </button>
      </div>

      {/* Tab 1: Member Records List */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs flex items-center justify-between">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search in ${assignedCommunity}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Restricted Community View: {assignedCommunity}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Gender / Age</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Education</th>
                    <th className="p-3.5">Employment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredYouth.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="p-3.5 font-mono font-bold text-emerald-800 dark:text-emerald-400">{m.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{m.fullName}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{m.gender} · {m.age} yrs</td>
                      <td className="p-3.5 font-mono">{m.phone}</td>
                      <td className="p-3.5">{m.educationLevel}</td>
                      <td className="p-3.5 capitalize">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          m.employmentStatus === 'unemployed' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {m.employmentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Quick Register Member */}
      {activeTab === 'register' && (
        <div className="bg-white dark:bg-[#0E1A12] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/60 shadow-lg max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            On-Site Youth Registration for {assignedCommunity}
          </h2>

          {regSuccess && (
            <div className="p-3.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Youth member registered successfully for {assignedCommunity}!</span>
            </div>
          )}

          <form onSubmit={handleQuickRegister} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Gender</label>
                <select
                  value={regGender}
                  onChange={(e: any) => setRegGender(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Occupation / Target Skill</label>
              <input
                type="text"
                value={regOccupation}
                onChange={(e) => setRegOccupation(e.target.value)}
                placeholder="e.g. Electrical Apprentice"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              Confirm Registration for {assignedCommunity}
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Monthly Report */}
      {activeTab === 'report' && (
        <div className="bg-white dark:bg-[#0E1A12] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/60 shadow-lg max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Submit Monthly Report for {assignedCommunity}
          </h2>

          {reportSubmitted && (
            <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Community Monthly Report Submitted to Executive Secretariat!</span>
            </div>
          )}

          <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Reporting Period</label>
              <input
                type="text"
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Key Local Youth Activities & Accomplishments</label>
              <textarea
                rows={3}
                required
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="Describe registrations, training forums, or local employment placements..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Local Community Challenges</label>
              <textarea
                rows={2}
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="Unemployment trends, equipment needs..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Transmit Report to Secretariat</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
