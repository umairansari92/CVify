import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaHistory, FaPlus, FaTrash } from 'react-icons/fa';

const ExperienceManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [experience, setExperience] = useState(user?.experience || []);
  const [sectionName, setSectionName] = useState(user?.sectionNames?.experience || 'Professional Experience');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.experience) setExperience(user.experience);
    if (user?.sectionNames?.experience) setSectionName(user.sectionNames.experience);
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

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        achievements: "",
        tools: [],
      },
    ]);
  };

  const updateExp = (idx, field, value) => {
    const newExp = [...experience];
    newExp[idx] = { ...newExp[idx], [field]: value };
    setExperience(newExp);
  };

  const deleteExp = (idx) => {
    setExperience(experience.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        experience, 
        sectionNames: { ...user.sectionNames, experience: sectionName } 
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Experience timeline synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div className="space-y-1">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
                <FaHistory size={20} className="text-cyan-500" />
                <input 
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0 w-full"
                    placeholder="Section Title"
                />
            </h3>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                Showcase your professional evolution and results.
            </p>
        </div>
        <button
          onClick={addExperience}
          className="px-6 py-2 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-cyan-500/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Role
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, idx) => (
          <div key={idx} className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 hover:border-cyan-500/30 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Company / Org</label>
                <input
                  value={exp.company}
                  onChange={(e) => updateExp(idx, 'company', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Job Role</label>
                <input
                  value={exp.role}
                  onChange={(e) => updateExp(idx, 'role', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Start Date</label>
                <input
                  type="month"
                  value={toInputDate(exp.startDate)}
                  onChange={(e) => updateExp(idx, 'startDate', toDBDate(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">End Date</label>
                <input
                  type="month"
                  disabled={exp.isCurrent}
                  value={exp.isCurrent ? "" : toInputDate(exp.endDate)}
                  onChange={(e) => updateExp(idx, 'endDate', toDBDate(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm disabled:opacity-30"
                />
              </div>
              <div className="flex items-end pb-2 gap-2">
                <input
                  type="checkbox"
                  checked={exp.isCurrent}
                  onChange={(e) => updateExp(idx, 'isCurrent', e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-600 focus:ring-0"
                />
                <label className="text-[10px] font-black uppercase text-white/60">Present</label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-white/40 ml-1">Achievements / Impact (Markdown supported)</label>
              <textarea
                value={exp.achievements}
                onChange={(e) => updateExp(idx, 'achievements', e.target.value)}
                className="w-full px-4 py-3 h-28 rounded-xl border border-white/10 bg-white/5 text-white text-sm resize-none focus:border-cyan-500/50 outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
                <div className="space-y-1 flex-1 mr-4">
                    <label className="text-[9px] font-black uppercase text-white/40 ml-1">Tools / Technologies (Comma separated)</label>
                    <input
                        value={exp.tools?.join(", ")}
                        onChange={(e) => updateExp(idx, 'tools', e.target.value.split(",").map(t => t.trim()))}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-xs"
                    />
                </div>
                <button
                    onClick={() => deleteExp(idx)}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                    <FaTrash size={14} />
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-white/5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Syncing Roles..." : "Save Timeline"}
        </button>
      </div>
    </div>
  );
};

export default ExperienceManager;
