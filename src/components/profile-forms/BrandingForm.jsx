import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';

const BrandingForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [username, setUsername] = useState(user?.username || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [identityLabel, setIdentityLabel] = useState(user?.branding?.identityLabel || '');
  const [availability, setAvailability] = useState(user?.availability || 'Open to Work');
  const [industry, setIndustry] = useState(user?.industry || 'Other');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setHeadline(user.headline || '');
      setIdentityLabel(user.branding?.identityLabel || '');
      setAvailability(user.availability || 'Open to Work');
      setIndustry(user.industry || 'Other');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        username,
        headline,
        branding: { ...user.branding, identityLabel },
        availability,
        industry
      };

      const res = await api.patch("/auth/profile", payload);
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Branding synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Custom Username (URL)</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">cvify.pro/p/</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-24 pr-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Identity Label (Stats Row)</label>
          <input
            type="text"
            value={identityLabel}
            onChange={(e) => setIdentityLabel(e.target.value)}
            placeholder="e.g. Design Lead @ Figma"
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Availability Status</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          >
            <option value="Open to Work">🟢 Open to Work</option>
            <option value="Freelance Available">⚡ Freelance Available</option>
            <option value="Available for Internship">🎓 Available for Internship</option>
            <option value="Currently Employed">💼 Currently Employed</option>
            <option value="Not Available">🔴 Not Available</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Industry Focus</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          >
            {["Technology", "Healthcare", "Education", "Finance", "Marketing", "Engineering", "Design", "Other"].map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Professional Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. Senior Product Designer | Apple Enthusiast"
          className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white border border-white/10 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
      >
        {saving ? "Updating Branding..." : "Save Branding"}
      </button>
    </form>
  );
};

export default BrandingForm;
