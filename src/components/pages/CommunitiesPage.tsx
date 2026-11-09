import React, { useState } from 'react';
import { Search, MapPin, Users, Phone, Mail, Plus, Edit2, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Community } from '../../types';

export const CommunitiesPage: React.FC = () => {
  const { communities, session, updateCommunity, addCommunity, youthMembers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<Community | null>(null);

  // Edit / Add modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [commName, setCommName] = useState('');
  const [commZone, setCommZone] = useState<'North Zone' | 'South Zone' | 'Central Zone' | 'East Zone' | 'West Zone'>('North Zone');
  const [commDesc, setCommDesc] = useState('');
  const [coordName, setCoordName] = useState('');
  const [coordPhone, setCoordPhone] = useState('');
  const [coordEmail, setCoordEmail] = useState('');

  const zones = ['All', 'North Zone', 'South Zone', 'Central Zone', 'East Zone', 'West Zone'];

  const filteredCommunities = communities.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'All' || c.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const handleOpenEdit = (c: Community) => {
    setEditingCommunity(c);
    setCommName(c.name);
    setCommZone(c.zone);
    setCommDesc(c.description);
    setCoordName(c.coordinatorName);
    setCoordPhone(c.coordinatorPhone);
    setCoordEmail(c.coordinatorEmail);
    setIsEditModalOpen(true);
  };

  const handleSaveCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCommunity) {
      updateCommunity(editingCommunity.id, {
        name: commName,
        zone: commZone,
        description: commDesc,
        coordinatorName: coordName,
        coordinatorPhone: coordPhone,
        coordinatorEmail: coordEmail,
        status: 'Active'
      });
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
            Territorial Coverage
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            The 19 Communities of UYZN
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Exact 18 supplied catchment communities + 19th editable territory slot under administrative integration.
          </p>
        </div>

        {/* Search & Zone Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search community..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-[#0E1A12] border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#0E1A12] border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
          >
            {zones.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
      </div>

      {/* Grid of 19 Communities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((c, index) => {
          // Calculate registered count dynamically
          const count = youthMembers.filter(m => m.community.toLowerCase() === c.name.toLowerCase()).length || c.registeredYouthCount;

          return (
            <div
              key={c.id}
              className={`p-6 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between space-y-4 ${
                c.isEditable19thSlot
                  ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                  : 'bg-white dark:bg-[#0E1A12] border-slate-200 dark:border-emerald-900/60 hover:border-emerald-500'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-800 text-amber-300 text-[11px] font-bold font-mono flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-semibold">{c.code}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    c.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {c.zone} {c.isEditable19thSlot ? '· 19th Slot' : ''}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    {c.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1 line-clamp-2">
                    {c.description}
                  </p>
                </div>
              </div>

              {/* Stats & Coordinator Details */}
              <div className="pt-3 border-t border-slate-200 dark:border-emerald-900/60 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-slate-500">Registered Youth:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm tabular-nums">{count} Members</span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-[11px]">
                  <span>Coordinator: {c.coordinatorName}</span>
                  <button
                    onClick={() => setSelectedCommunityModal(c)}
                    className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {session.role === 'admin' && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="w-full py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{c.isEditable19thSlot ? 'Configure 19th Community' : 'Edit Details'}</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Community Detail Profile Modal */}
      {selectedCommunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider font-mono">
                  Community Profile · {selectedCommunityModal.code}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {selectedCommunityModal.name}
                </h3>
              </div>
              <button onClick={() => setSelectedCommunityModal(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCommunityModal.description}
              </p>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm">Assigned Coordinator Info</div>
                <div className="space-y-1 text-slate-700 dark:text-slate-300">
                  <div>Name: <span className="font-semibold">{selectedCommunityModal.coordinatorName}</span></div>
                  <div>Phone: <span className="font-mono">{selectedCommunityModal.coordinatorPhone}</span></div>
                  <div>Email: <span className="font-mono">{selectedCommunityModal.coordinatorEmail}</span></div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900 dark:text-white mb-2">Key Local Projects</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCommunityModal.keyProjects.map((p: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md font-medium text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCommunityModal(null)}
              className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-xl text-xs font-semibold"
            >
              Close Community Profile
            </button>
          </div>
        </div>
      )}

      {/* Admin Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Edit Community ({commName})
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCommunity} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Community Name</label>
                <input
                  type="text"
                  required
                  value={commName}
                  onChange={(e) => setCommName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Zone Area</label>
                <select
                  value={commZone}
                  onChange={(e: any) => setCommZone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="North Zone">North Zone</option>
                  <option value="South Zone">South Zone</option>
                  <option value="Central Zone">Central Zone</option>
                  <option value="East Zone">East Zone</option>
                  <option value="West Zone">West Zone</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={commDesc}
                  onChange={(e) => setCommDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Coordinator Name</label>
                  <input
                    type="text"
                    required
                    value={coordName}
                    onChange={(e) => setCoordName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Coordinator Phone</label>
                  <input
                    type="text"
                    required
                    value={coordPhone}
                    onChange={(e) => setCoordPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors"
              >
                Update Community Record
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
