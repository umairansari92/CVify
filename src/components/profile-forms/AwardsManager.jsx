import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaTrophy, FaPlus, FaTrash, FaCertificate, FaGlobe } from 'react-icons/fa';

const AwardsManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [achievements, setAchievements] = useState(user?.achievements || []);
  const [certifications, setCertifications] = useState(user?.certifications || []);
  const [languages, setLanguages] = useState(user?.languages || []);
  const [sectionNames, setSectionNames] = useState(user?.sectionNames || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setAchievements(user.achievements || []);
      setCertifications(user.certifications || []);
      setLanguages(user.languages || []);
      setSectionNames(user.sectionNames || {});
    }
  }, [user]);

  const toInputDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("/")) return "";
    const [m, y] = dateStr.split("/");
    return `${y}-${m.padStart(2, "0")}`;
  };

  const toDBDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m] = dateStr.split("-");
    return `${m}/${y}`;
  };

  // Add Handlers
  const addAchievement = () => setAchievements([...achievements, { title: "", date: "", description: "" }]);
  const addCert = () => setCertifications([...certifications, { name: "", issuer: "", date: "" }]);
  const addLang = () => setLanguages([...languages, { name: "", proficiency: "Advanced" }]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        achievements, 
        certifications, 
        languages,
        sectionNames: {
            ...user.sectionNames,
            achievements: sectionNames.achievements || 'Honors & Awards',
            certifications: sectionNames.certifications || 'Certifications',
            languages: sectionNames.languages || 'Languages'
        }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Credentials synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* --- AWARDS & ACHIEVEMENTS --- */}
      <div className="space-y-6 pb-12 border-b border-white/5">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FaTrophy className="text-cyan-500" />
                <input 
                    value={sectionNames.achievements || 'Honors & Awards'}
                    onChange={(e) => setSectionNames({...sectionNames, achievements: e.target.value})}
                    className="text-xl font-black text-white bg-transparent outline-none focus:ring-0"
                />
            </div>
            <button onClick={addAchievement} className="text-[10px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-400">
                + Add Award
            </button>
        </div>
        <div className="space-y-4">
            {achievements.map((ach, idx) => (
                <div key={idx} className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3 hover:border-cyan-500/30">
                    <div className="flex justify-between gap-4">
                        <input value={ach.title} onChange={(e) =>{
                            const n = [...achievements]; n[idx].title = e.target.value; setAchievements(n);
                        }} placeholder="Award Title" className="bg-transparent font-black text-sm text-white outline-none flex-1" />
                        <input type="month" value={toInputDate(ach.date)} onChange={(e) =>{
                            const n = [...achievements]; n[idx].date = toDBDate(e.target.value); setAchievements(n);
                        }} className="bg-transparent text-[10px] font-black text-white/40 uppercase" />
                    </div>
                    <textarea value={ach.description} onChange={(e) =>{
                        const n = [...achievements]; n[idx].description = e.target.value; setAchievements(n);
                    }} placeholder="Brief description..." className="w-full bg-transparent text-xs text-white/40 h-16 resize-none outline-none" />
                    <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <FaTrash size={12} />
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* --- LANGUAGES --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FaGlobe className="text-cyan-500" />
                <input 
                    value={sectionNames.languages || 'Languages'}
                    onChange={(e) => setSectionNames({...sectionNames, languages: e.target.value})}
                    className="text-xl font-black text-white bg-transparent outline-none focus:ring-0"
                />
            </div>
            <button onClick={addLang} className="text-[10px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-400">
                + Add Language
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang, idx) => (
                <div key={idx} className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30">
                    <div className="flex flex-col gap-1">
                        <input value={lang.name} onChange={(e) =>{
                            const n = [...languages]; n[idx].name = e.target.value; setLanguages(n);
                        }} placeholder="Language" className="bg-transparent font-black text-xs text-white outline-none" />
                        <select value={lang.proficiency} onChange={(e) =>{
                            const n = [...languages]; n[idx].proficiency = e.target.value; setLanguages(n);
                        }} className="bg-transparent text-[9px] font-black text-cyan-500 uppercase tracking-widest outline-none">
                            {['Native', 'Advanced', 'Professional', 'Beginner'].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <button onClick={() => setLanguages(languages.filter((_, i) => i !== idx))} className="text-red-500/20 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                        <FaTrash size={10} />
                    </button>
                </div>
            ))}
        </div>
      </div>

      <div className="pt-8 border-t border-white/5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Syncing..." : "Save Credentials"}
        </button>
      </div>
    </div>
  );
};

export default AwardsManager;
