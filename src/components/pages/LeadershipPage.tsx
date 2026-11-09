import React, { useState } from 'react';
import { UserCheck, Mail, Phone, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Leader } from '../../types';

export const LeadershipPage: React.FC = () => {
  const { leaders, session, addLeader, updateLeader, deleteLeader, communities } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [category, setCategory] = useState<'President' | 'Executive' | 'Coordinator' | 'Representative'>('Executive');
  const [communityName, setCommunityName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('/src/assets/images/uyzn_president_portrait_1794230979741.jpg');

  const handleOpenAdd = () => {
    setEditingLeader(null);
    setName('');
    setRoleTitle('');
    setCategory('Executive');
    setCommunityName('');
    setEmail('');
    setPhone('');
    setBio('');
    setImage('/src/assets/images/uyzn_hero_banner_1794230979061.jpg');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (leader: Leader) => {
    setEditingLeader(leader);
    setName(leader.name);
    setRoleTitle(leader.roleTitle);
    setCategory(leader.category);
    setCommunityName(leader.communityName || '');
    setEmail(leader.email);
    setPhone(leader.phone);
    setBio(leader.bio);
    setImage(leader.image);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeader) {
      updateLeader(editingLeader.id, {
        name, roleTitle, category, communityName, email, phone, bio, image
      });
    } else {
      addLeader({
        name, roleTitle, category, communityName, email, phone, bio, image
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
            Organizational Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Executive Leadership & Community Coordinators
          </h1>
        </div>

        {session.role === 'admin' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors flex items-center gap-2 shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Executive / Coordinator</span>
          </button>
        )}
      </div>

      {/* President Highlight Banner */}
      {leaders.filter(l => l.category === 'President').map((pres) => (
        <div key={pres.id} className="p-8 bg-emerald-950 text-white rounded-3xl border border-amber-400/40 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-amber-400 shadow-lg">
              <img
                src={pres.image}
                alt={pres.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              Executive President
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {pres.name}
            </h2>
            <p className="text-xs text-amber-300 font-semibold">{pres.roleTitle}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{pres.bio}</p>
            <div className="flex items-center gap-4 pt-2 text-xs text-emerald-200">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {pres.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {pres.phone}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Executives & Coordinators Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          Executives & Coordinators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.filter(l => l.category !== 'President').map((leader) => (
            <div
              key={leader.id}
              className="p-6 bg-white dark:bg-[#0E1A12] rounded-2xl border border-slate-200 dark:border-emerald-900/60 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md text-[11px] font-semibold">
                    {leader.category} {leader.communityName ? `· ${leader.communityName}` : ''}
                  </span>

                  {session.role === 'admin' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(leader)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteLeader(leader.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                    {leader.roleTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-emerald-900/60 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-600" /> {leader.email}</div>
                <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {leader.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add / Edit Leader */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingLeader ? 'Edit Leader Record' : 'Add New Executive / Coordinator'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. General Secretary"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="President">President</option>
                    <option value="Executive">Executive</option>
                    <option value="Coordinator">Community Coordinator</option>
                    <option value="Representative">Representative</option>
                  </select>
                </div>
              </div>

              {category === 'Coordinator' && (
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Assigned Community</label>
                  <select
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Select Community...</option>
                    {communities.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors"
              >
                Save Leader Record
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
