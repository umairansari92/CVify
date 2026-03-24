import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const SecuritySettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [currentPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [privacy, setPrivacy] = useState(user?.privacy || { visibility: "Public", showPhone: false, showEmail: true });
  const [saving, setSaving] = useState(false);

  const validatePassword = (pwd) => ({
    length: pwd.length >= 7,
    hasUpper: /[A-Z]/.test(pwd),
    hasLower: /[a-z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSpecial: /[@$!%*?&._]/.test(pwd),
  });

  const pwdChecks = validatePassword(newPwd);
  const isPwdValid = Object.values(pwdChecks).every(Boolean);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPwd) return toast.error("Current password required!");
    if (!isPwdValid) return toast.error("New password is not strong enough!");
    if (newPwd !== confirmPwd) return toast.error("Passwords don't match!");

    setSaving(true);
    try {
      await api.patch("/auth/profile", { currentPassword: currentPwd, newPassword: newPwd });
      setCurrPwd(""); setNewPwd(""); setConfPwd("");
      toast.success("🔐 Password updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePrivacySave = async () => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { privacy });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Privacy settings updated!");
      }
    } catch (err) {
        toast.error(err.message);
    } finally {
        setSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Privacy Section */}
      <div className="space-y-6 pb-12 border-b border-white/5">
        <h3 className="text-xl font-black text-white flex items-center gap-3">
            <FaEye className="text-cyan-500" />
            Global Privacy Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Profile Visibility</label>
                <select 
                    value={privacy.visibility}
                    onChange={(e) => setPrivacy({...privacy, visibility: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-sm outline-none"
                >
                    <option value="Public">🌍 Public Indexing</option>
                    <option value="Recruiter Only">💼 Recruiter Access Only</option>
                    <option value="Private">🔒 Internal Archive</option>
                </select>
            </div>
            <div className="flex flex-col justify-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={privacy.showEmail} onChange={e => setPrivacy({...privacy, showEmail: e.target.checked})} className="accent-cyan-600 w-4 h-4" />
                    <span className="text-xs font-black text-white/60 group-hover:text-white transition-colors">Surface Email on Public Portfolio</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={privacy.showPhone} onChange={e => setPrivacy({...privacy, showPhone: e.target.checked})} className="accent-cyan-600 w-4 h-4" />
                    <span className="text-xs font-black text-white/60 group-hover:text-white transition-colors">Surface Phone on Public Portfolio</span>
                </label>
            </div>
        </div>
        <button onClick={handlePrivacySave} className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/10 transition-all">
            Update Privacy
        </button>
      </div>

      {/* Password Section */}
      <form onSubmit={handlePasswordChange} className="space-y-6">
        <h3 className="text-xl font-black text-white flex items-center gap-3">
            <FaLock className="text-cyan-500" />
            Security Shield
        </h3>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Current Password</label>
          <input
            type={showPwd ? "text" : "password"}
            value={currentPwd}
            onChange={(e) => setCurrPwd(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">New Secure Password</label>
                <input
                    type={showPwd ? "text" : "password"}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 bottom-4 text-white/20 hover:text-cyan-500 transition-colors">
                    {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Confirm New Password</label>
                <input
                    type={showPwd ? "text" : "password"}
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white"
                />
            </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white border border-white/10 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg"
        >
          {saving ? "Authorizing..." : "Update Security Credentials"}
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;
