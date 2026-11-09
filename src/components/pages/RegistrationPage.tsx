import React, { useState } from 'react';
import { UserCheck, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, FileText, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Gender, EmploymentStatus, EducationLevel, EntrepreneurshipStatus } from '../../types';

export const RegistrationPage: React.FC = () => {
  const { addYouthMember, communities } = useApp();

  // Form State
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState<number>(22);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [community, setCommunity] = useState(communities[0]?.name || 'Pepesa');
  const [residentialLocation, setResidentialLocation] = useState('');
  
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('SHS / WASSCE');
  const [institutionAttended, setInstitutionAttended] = useState('');
  
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>('unemployed');
  const [occupation, setOccupation] = useState('');
  
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(['Heavy Machinery', 'Welding']);
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Mining Supply Chain', 'Tech & Digital Skills']);
  const [entrepreneurshipStatus, setEntrepreneurshipStatus] = useState<EntrepreneurshipStatus>('Aspiring Entrepreneur');
  const [businessName, setBusinessName] = useState('');
  
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRel, setEmergencyRel] = useState('');

  const [consentGiven, setConsentGiven] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedMemberId, setSubmittedMemberId] = useState<string | null>(null);

  const availableInterests = [
    'Mining Supply Chain', 'Tech & Digital Skills', 'Agriculture & Agri-Business', 
    'Small Business & Trade', 'Leadership & Governance', 'Sports & Cultural Arts', 
    'Health & Environmental Safety'
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (s: string) => {
    setSkills(skills.filter(item => item !== s));
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName || !phone || !community || !residentialLocation) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!consentGiven) {
      setErrorMsg('You must grant consent for personal data processing under UYZN Privacy Terms.');
      return;
    }

    const newMember = addYouthMember({
      fullName,
      gender,
      dateOfBirth: dateOfBirth || '2002-01-01',
      age: age || 22,
      phone,
      email: email || undefined,
      community,
      residentialLocation,
      educationLevel,
      institutionAttended: institutionAttended || undefined,
      employmentStatus,
      occupation: occupation || 'Seeking Training & Employment',
      skills: skills.length > 0 ? skills : ['General Operations'],
      areasOfInterest: selectedInterests,
      entrepreneurshipStatus,
      businessName: businessName || undefined,
      membershipStatus: 'Pending Approval',
      emergencyContact: emergencyName ? {
        name: emergencyName,
        phone: emergencyPhone,
        relationship: emergencyRel
      } : undefined,
      consentGiven: true
    });

    setSubmittedMemberId(newMember.id);
  };

  const handleReset = () => {
    setSubmittedMemberId(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setResidentialLocation('');
    setOccupation('');
    setConsentGiven(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official UYZN Youth Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Youth Member Registration
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Capture your demographic and skill profile to access vocational training programs, mining sub-contractor job drives, and youth seed funding.
        </p>
      </div>

      {!submittedMemberId ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0E1A12] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-900/60 shadow-lg space-y-8">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Personal Bio & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-200 dark:border-emerald-900/60 pb-2">
              1. Personal Details & Contact Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Osei Tutu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e: any) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={45}
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+233 24 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="kwame@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Catchment Community Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-200 dark:border-emerald-900/60 pb-2">
              2. Catchment Residence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Community of Residence (19 Communities) *
                </label>
                <select
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-900 dark:text-emerald-300"
                >
                  {communities.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Residential Location / Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Community Center, House No. P-12"
                  value={residentialLocation}
                  onChange={(e) => setResidentialLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Education & Employment Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-200 dark:border-emerald-900/60 pb-2">
              3. Education & Employment Background
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Educational Level *
                </label>
                <select
                  value={educationLevel}
                  onChange={(e: any) => setEducationLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Primary Education">Primary Education</option>
                  <option value="JHS / BECE">JHS / BECE</option>
                  <option value="SHS / WASSCE">SHS / WASSCE</option>
                  <option value="TVET / Vocational">TVET / Vocational</option>
                  <option value="Diploma / HND">Diploma / HND</option>
                  <option value="Undergraduate Degree">Undergraduate Degree</option>
                  <option value="Postgraduate Degree">Postgraduate Degree</option>
                  <option value="No Formal Education">No Formal Education</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Institution Attended (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tarkwa SHS / UMaT Tarkwa"
                  value={institutionAttended}
                  onChange={(e) => setInstitutionAttended(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Employment Status *
                </label>
                <select
                  value={employmentStatus}
                  onChange={(e: any) => setEmploymentStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="unemployed">Unemployed (Seeking Opportunities)</option>
                  <option value="employed">Employed (Salaried / Contract)</option>
                  <option value="self-employed">Self-Employed / Business Owner</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Occupation / Desired Profession *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Welder, Mining Engineer, Farmer, Teacher"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Skills & Entrepreneurship */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-200 dark:border-emerald-900/60 pb-2">
              4. Skills, Entrepreneurship & Interests
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Key Skills & Talents
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Type a skill (e.g. Electrical Wiring) and click Add"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <span>{s}</span>
                    <button type="button" onClick={() => handleRemoveSkill(s)} className="text-emerald-600 hover:text-rose-600 font-bold">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Areas of Interest
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => {
                  const isSel = selectedInterests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSel
                          ? 'bg-emerald-800 text-white font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Entrepreneurship Status
                </label>
                <select
                  value={entrepreneurshipStatus}
                  onChange={(e: any) => setEntrepreneurshipStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Active Business Owner">Active Business Owner</option>
                  <option value="Aspiring Entrepreneur">Aspiring Entrepreneur</option>
                  <option value="Not Interested">Not Interested</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Business or Organization Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pepesa Green Agro Co."
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono border-b border-slate-200 dark:border-emerald-900/60 pb-2">
              5. Emergency Contact (Optional)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Contact Phone"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Relationship (e.g. Parent)"
                  value={emergencyRel}
                  onChange={(e) => setEmergencyRel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-4 h-4 text-emerald-800 rounded focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                I hereby grant explicit consent for Unity Youth Zone Network (UYZN) to collect, verify, and store my personal demographic and skill data for development planning, TVET program enrollment, and local employment matching across the AngloGold Ashanti Tarkwa catchment area.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            <span>Submit Official Youth Registration</span>
          </button>

        </form>
      ) : (
        /* Success Receipt Screen */
        <div className="bg-white dark:bg-[#0E1A12] rounded-3xl p-8 sm:p-12 border border-emerald-900/60 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-mono text-xs font-bold">
              REGISTRATION CONFIRMED
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display">
              Welcome to Unity Youth Zone Network!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              Your youth profile has been captured and submitted to the UYZN Digital Management Hub for community verification.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left font-mono text-xs space-y-2 text-slate-800 dark:text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-400">Assigned Member ID:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{submittedMemberId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Name:</span>
              <span>{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Catchment Community:</span>
              <span>{community}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-amber-500 font-semibold">Pending Verification</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors"
            >
              Register Another Youth Member
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
