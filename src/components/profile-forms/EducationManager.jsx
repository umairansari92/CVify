import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaGraduationCap, FaPlus, FaTrash } from 'react-icons/fa';

const EducationManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [education, setEducation] = useState(user?.education || []);
  const [sectionName, setSectionName] = useState(user?.sectionNames?.education || 'Academic Foundation');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.education) setEducation(user.education);
    if (user?.sectionNames?.education) setSectionName(user.sectionNames.education);
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

  const addEdu = () => {
    setEducation([
      ...education,
      { institution: "", degree: "", fieldOfStudy: "", graduationDate: "", description: "" },
    ]);
  };

  const updateEdu = (idx, field, value) => {
    const newEdu = [...education];
    newEdu[idx] = { ...newEdu[idx], [field]: value };
    setEducation(newEdu);
  };

  const deleteEdu = (idx) => {
    setEducation(education.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        education, 
        sectionNames: { ...user.sectionNames, education: sectionName } 
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Academic info synchronized!");
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
                <FaGraduationCap size={20} className="text-cyan-500" />
                <input 
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0 w-full"
                />
            </h3>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                List your degrees, certifications, and educational milestones.
            </p>
        </div>
        <button
          onClick={addEdu}
          className="px-6 py-2 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-cyan-500/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, idx) => (
          <div key={idx} className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 hover:border-cyan-500/30 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Institution</label>
                <input
                  value={edu.institution}
                  onChange={(e) => updateEdu(idx, 'institution', e.target.value)}
                  placeholder="e.g. University of Oxford"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Degree</label>
                <input
                  value={edu.degree}
                  onChange={(e) => updateEdu(idx, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Computer Science"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Field of Study</label>
                <input
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEdu(idx, 'fieldOfStudy', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-white/40 ml-1">Graduation Date</label>
                <input
                  type="month"
                  value={toInputDate(edu.graduationDate)}
                  onChange={(e) => updateEdu(idx, 'graduationDate', toDBDate(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-1 relative">
              <label className="text-[9px] font-black uppercase text-white/40 ml-1">Key Studies / Description</label>
              <textarea
                value={edu.description}
                onChange={(e) => updateEdu(idx, 'description', e.target.value)}
                className="w-full px-4 py-3 h-24 rounded-xl border border-white/10 bg-white/5 text-white text-sm resize-none focus:border-cyan-500/50"
              />
              <button
                onClick={() => deleteEdu(idx)}
                className="absolute top-0 right-0 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <FaTrash size={12} />
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
          {saving ? "Updating..." : "Save Academic Info"}
        </button>
      </div>
    </div>
  );
};

export default EducationManager;
