import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';

const SocialLinksForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [socialLinks, setSocialLinks] = useState(
    user?.socialLinks || { linkedin: '', github: '', twitter: '', portfolio: '' }
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.socialLinks) {
       setSocialLinks(user.socialLinks);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { socialLinks });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Social networks synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const platforms = [
    { id: 'linkedin', label: 'LinkedIn', icon: <FaLinkedin />, placeholder: 'https://linkedin.com/in/username' },
    { id: 'github', label: 'GitHub', icon: <FaGithub />, placeholder: 'https://github.com/username' },
    { id: 'twitter', label: 'Twitter / X', icon: <FaTwitter />, placeholder: 'https://twitter.com/username' },
    { id: 'portfolio', label: 'Other Portfolio', icon: <FaGlobe />, placeholder: 'https://yourwebsite.com' },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((p) => (
          <div key={p.id} className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <span className="text-cyan-500/50">{p.icon}</span> {p.label}
            </label>
            <input
              type="text"
              value={socialLinks[p.id] || ''}
              onChange={(e) => setSocialLinks({ ...socialLinks, [p.id]: e.target.value })}
              placeholder={p.placeholder}
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white border border-white/10 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
      >
        {saving ? "Syncing Links..." : "Save Social Links"}
      </button>
    </form>
  );
};

export default SocialLinksForm;
