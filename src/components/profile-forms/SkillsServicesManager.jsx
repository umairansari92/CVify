import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaTools, FaCheckCircle, FaTrash, FaPlus } from 'react-icons/fa';

const SkillsServicesManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [skills, setSkills] = useState(user?.skills || []);
  const [services, setServices] = useState(user?.services || []);
  const [sectionNames, setSectionNames] = useState(user?.sectionNames || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setSkills(user.skills || []);
      setServices(user.services || []);
      setSectionNames(user.sectionNames || {});
    }
  }, [user]);

  const addSkill = (name, category) => {
    if (!name.trim()) return;
    setSkills([...skills, { name: name.trim(), category }]);
  };

  const removeSkill = (idx) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const addService = () => {
    setServices([...services, { title: "", description: "" }]);
  };

  const updateService = (idx, field, value) => {
    const newServices = [...services];
    newServices[idx] = { ...newServices[idx], [field]: value };
    setServices(newServices);
  };

  const removeService = (idx) => {
    setServices(services.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        skills, 
        services,
        sectionNames: { 
            ...user.sectionNames, 
            skills: sectionNames.skills || 'Expertise & Skills',
            services: sectionNames.services || 'Professional Services'
        }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Skills & Services synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Skills Section */}
      <div className="space-y-6 pb-12 border-b border-white/5">
        <div className="flex items-center gap-3">
          <FaTools className="text-cyan-500" />
          <input 
            value={sectionNames.skills || 'Expertise & Skills'}
            onChange={(e) => setSectionNames({...sectionNames, skills: e.target.value})}
            className="text-xl font-black text-white bg-transparent outline-none focus:ring-0"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            id="new-skill-input"
            placeholder="Skill Name (e.g. React, Strategic Planning)"
            className="flex-1 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-white text-sm"
            onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    addSkill(e.target.value, document.getElementById('skill-cat-select').value);
                    e.target.value = '';
                }
            }}
          />
          <select 
            id="skill-cat-select"
            className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-white text-sm font-black uppercase tracking-widest"
          >
            {['Technical', 'Strategic', 'Tools', 'Soft Skills', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button 
            onClick={() => {
                const input = document.getElementById('new-skill-input');
                addSkill(input.value, document.getElementById('skill-cat-select').value);
                input.value = '';
            }}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
                <div key={idx} className="group flex items-center gap-3 px-5 py-2.5 bg-cyan-600/5 border border-cyan-500/10 rounded-full hover:border-cyan-500/30 transition-all">
                    <span className="text-[9px] font-black text-cyan-500/50 uppercase tracking-widest italic">{skill.category}</span>
                    <span className="text-xs font-black text-white">{skill.name}</span>
                    <button onClick={() => removeSkill(idx)} className="text-red-500/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <FaTrash size={10} />
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FaCheckCircle className="text-cyan-500" />
                <input 
                    value={sectionNames.services || 'Professional Services'}
                    onChange={(e) => setSectionNames({...sectionNames, services: e.target.value})}
                    className="text-xl font-black text-white bg-transparent outline-none focus:ring-0"
                />
            </div>
            <button
                onClick={addService}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-full border border-white/10 transition-all flex items-center gap-2"
            >
                <FaPlus size={10} /> Add Service
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
                <div key={idx} className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3 hover:border-cyan-500/30 transition-all">
                    <input 
                        value={service.title}
                        onChange={(e) => updateService(idx, 'title', e.target.value)}
                        placeholder="Service Title (e.g. Code Review)"
                        className="w-full bg-transparent text-sm font-black text-white outline-none"
                    />
                    <textarea 
                        value={service.description}
                        onChange={(e) => updateService(idx, 'description', e.target.value)}
                        placeholder="Briefly describe what you offer..."
                        className="w-full bg-transparent text-xs text-white/40 h-20 resize-none outline-none leading-relaxed"
                    />
                    <button 
                        onClick={() => removeService(idx)}
                        className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            ))}
        </div>
      </div>

      <div className="pt-8 border-t border-white/5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg"
        >
          {saving ? "Syncing Expertise..." : "Save Expertise & Services"}
        </button>
      </div>
    </div>
  );
};

export default SkillsServicesManager;
