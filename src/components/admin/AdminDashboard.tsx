import React, { useState } from 'react';
import { 
  BarChart3, Users, MapPin, ShieldCheck, Download, Printer, Filter, 
  Search, Plus, Edit2, Trash2, CheckCircle2, X, Eye, FileText, Settings, 
  AlertCircle, ChevronRight, Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { YouthMember, Community } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    youthMembers, communities, leaders, events, announcements, auditLogs, 
    cmsContent, updateYouthMember, deactivateYouthMember, approveYouthMember, 
    addCommunity, updateCommunity, updateCMSContent, resetDatabaseToDefaults, session 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'members' | 'communities' | 'reports' | 'audit' | 'cms'>('analytics');

  // Member Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunityFilter, setSelectedCommunityFilter] = useState('All');
  const [selectedEmploymentFilter, setSelectedEmploymentFilter] = useState('All');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState('All');
  const [selectedMemberModal, setSelectedMemberModal] = useState<YouthMember | null>(null);

  // Statistics Computations
  const totalYouth = youthMembers.length;
  const activeYouth = youthMembers.filter(m => m.isActive).length;
  const maleCount = youthMembers.filter(m => m.gender === 'Male').length;
  const femaleCount = youthMembers.filter(m => m.gender === 'Female').length;
  
  const employedCount = youthMembers.filter(m => m.employmentStatus === 'employed').length;
  const unemployedCount = youthMembers.filter(m => m.employmentStatus === 'unemployed').length;
  const selfEmployedCount = youthMembers.filter(m => m.employmentStatus === 'self-employed').length;
  const studentCount = youthMembers.filter(m => m.employmentStatus === 'student').length;

  const verifiedCount = youthMembers.filter(m => m.membershipStatus === 'Verified Member').length;
  const pendingCount = youthMembers.filter(m => m.membershipStatus === 'Pending Approval').length;

  // Filtered Youth List
  const filteredYouth = youthMembers.filter(m => {
    const matchSearch = m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.phone.includes(searchTerm);
    const matchComm = selectedCommunityFilter === 'All' || m.community === selectedCommunityFilter;
    const matchEmp = selectedEmploymentFilter === 'All' || m.employmentStatus === selectedEmploymentFilter;
    const matchGen = selectedGenderFilter === 'All' || m.gender === selectedGenderFilter;
    return matchSearch && matchComm && matchEmp && matchGen;
  });

  // Export CSV
  const exportCSV = () => {
    const headers = ['ID', 'Full Name', 'Gender', 'Age', 'Phone', 'Community', 'Education', 'Employment', 'Occupation', 'Membership Status', 'Registration Date'];
    const rows = filteredYouth.map(m => [
      m.id, `"${m.fullName}"`, m.gender, m.age, `"${m.phone}"`, `"${m.community}"`, `"${m.educationLevel}"`, m.employmentStatus, `"${m.occupation}"`, m.membershipStatus, m.registrationDate
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UYZN_Youth_Data_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900 rounded-lg text-amber-300 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Super Administrator Control Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            UYZN Youth Registry & Analytics Dashboard
          </h1>
          <p className="text-xs text-emerald-200">
            AngloGold Ashanti Tarkwa Catchment · 19 Communities Integrated Data Hub
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 no-print">
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl border border-emerald-700 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs overflow-x-auto no-print">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <span>Demographic Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'members'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>Youth Records ({youthMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('communities')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'communities'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Communities (18+1)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'audit'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Security Audit Logs</span>
        </button>
      </div>

      {/* Tab 1: Analytics & Key Stat Cards */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Registered Youth</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-400 tabular-nums">
                {totalYouth}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                Across 19 Communities
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Gender Distribution</div>
              <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                {maleCount} M / {femaleCount} F
              </div>
              <div className="text-[11px] text-slate-500">
                {Math.round((femaleCount / (totalYouth || 1)) * 100)}% Female Ratio
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Unemployed Youth</div>
              <div className="text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
                {unemployedCount}
              </div>
              <div className="text-[11px] text-rose-500">
                Primary Target for TVET Placement
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Pending Verifications</div>
              <div className="text-3xl font-extrabold font-mono text-amber-500 tabular-nums">
                {pendingCount}
              </div>
              <div className="text-[11px] text-amber-600">
                Awaiting Coordinator Sign-off
              </div>
            </div>
          </div>

          {/* Demographic Visual Breakdown Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Employment Status Visualizer */}
            <div className="p-6 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Employment Status Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Unemployed (Seeking Placement)</span>
                    <span className="font-bold font-mono">{unemployedCount} ({Math.round((unemployedCount/(totalYouth||1))*100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(unemployedCount/(totalYouth||1))*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Employed (Formal / Sub-contractor)</span>
                    <span className="font-bold font-mono">{employedCount} ({Math.round((employedCount/(totalYouth||1))*100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(employedCount/(totalYouth||1))*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Self-Employed / Agri-Entrepreneur</span>
                    <span className="font-bold font-mono">{selfEmployedCount} ({Math.round((selfEmployedCount/(totalYouth||1))*100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(selfEmployedCount/(totalYouth||1))*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Students</span>
                    <span className="font-bold font-mono">{studentCount} ({Math.round((studentCount/(totalYouth||1))*100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(studentCount/(totalYouth||1))*100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Community Registration Distribution Chart */}
            <div className="p-6 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Top Catchment Community Registrations
              </h3>

              <div className="space-y-2.5 text-xs max-h-56 overflow-y-auto pr-2">
                {communities.map((c) => {
                  const count = youthMembers.filter(m => m.community.toLowerCase() === c.name.toLowerCase()).length || c.registeredYouthCount;
                  return (
                    <div key={c.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                      <span className="font-medium text-slate-900 dark:text-white">{c.name}</span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{count} Members</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Youth Member Management Table */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="p-4 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <select
                value={selectedCommunityFilter}
                onChange={(e) => setSelectedCommunityFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="All">All Communities</option>
                {communities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>

              <select
                value={selectedEmploymentFilter}
                onChange={(e) => setSelectedEmploymentFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="All">All Employment Statuses</option>
                <option value="unemployed">Unemployed</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Showing {filteredYouth.length} of {youthMembers.length}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Member ID</th>
                    <th className="p-3.5">Full Name</th>
                    <th className="p-3.5">Gender / Age</th>
                    <th className="p-3.5">Community</th>
                    <th className="p-3.5">Employment</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right no-print">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredYouth.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-emerald-800 dark:text-emerald-400">{m.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{m.fullName}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{m.gender} · {m.age} yrs</td>
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">{m.community}</td>
                      <td className="p-3.5 capitalize">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          m.employmentStatus === 'unemployed' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {m.employmentStatus}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold">
                        {m.membershipStatus === 'Verified Member' ? (
                          <span className="text-emerald-600 dark:text-emerald-400">Verified</span>
                        ) : (
                          <span className="text-amber-500">Pending</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-2 no-print">
                        <button
                          onClick={() => setSelectedMemberModal(m)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 rounded"
                          title="View Full Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {m.membershipStatus !== 'Verified Member' && (
                          <button
                            onClick={() => approveYouthMember(m.id)}
                            className="px-2 py-1 bg-emerald-800 text-white rounded text-[10px] font-bold"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deactivateYouthMember(m.id)}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            m.isActive ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300' : 'bg-rose-800 text-white'
                          }`}
                        >
                          {m.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Communities Management */}
      {activeTab === 'communities' && (
        <div className="bg-white dark:bg-[#0E1A12] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Catchment Communities & Coordinator Assignments
          </h2>
          <p className="text-xs text-slate-500">
            Manage official records for all 18 supplied communities + the 19th editable community slot.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {communities.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-900 dark:text-white">{c.name}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{c.code}</span>
                </div>
                <div className="text-slate-500">Coordinator: {c.coordinatorName}</div>
                <div className="text-slate-500">Phone: {c.coordinatorPhone}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-[#0E1A12] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            System Audit & Action Logs
          </h2>

          <div className="space-y-2 max-h-96 overflow-y-auto text-xs font-mono">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">{log.action} · {log.entityType} ({log.entityId})</div>
                  <div className="text-slate-500 text-[11px]">{log.details}</div>
                </div>
                <div className="text-right text-slate-400 text-[10px]">
                  <div>{log.userEmail}</div>
                  <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Drawer Modal */}
      {selectedMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600">{selectedMemberModal.id}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">{selectedMemberModal.fullName}</h3>
              </div>
              <button onClick={() => setSelectedMemberModal(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div>Gender/Age: <span className="font-bold">{selectedMemberModal.gender}, {selectedMemberModal.age} yrs</span></div>
              <div>Community: <span className="font-bold">{selectedMemberModal.community}</span> ({selectedMemberModal.residentialLocation})</div>
              <div>Phone: <span className="font-mono font-bold">{selectedMemberModal.phone}</span></div>
              <div>Education: <span className="font-bold">{selectedMemberModal.educationLevel}</span> ({selectedMemberModal.institutionAttended || 'N/A'})</div>
              <div>Employment Status: <span className="font-bold uppercase">{selectedMemberModal.employmentStatus}</span></div>
              <div>Occupation: <span className="font-bold">{selectedMemberModal.occupation}</span></div>
              <div>Skills: <span className="font-bold">{selectedMemberModal.skills.join(', ')}</span></div>
            </div>

            <button onClick={() => setSelectedMemberModal(null)} className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-bold rounded-xl text-xs">
              Close Member Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
