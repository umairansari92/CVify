import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaCloudUploadAlt, FaImage } from 'react-icons/fa';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [location, setLocation] = useState(user?.location || '');
  const [previewImg, setPreview] = useState(user?.profileImage || '');
  const [imageFile, setImgFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhoneNumber(user.phoneNumber || '');
      setLocation(user.location || '');
      setPreview(user.profileImage || '');
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB.");
      return;
    }
    setImgFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      return toast.error("First and last name are required.");
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("firstName", firstName.trim());
      fd.append("lastName", lastName.trim());
      fd.append("phoneNumber", phoneNumber);
      fd.append("location", location.trim());
      if (imageFile) fd.append("profileImage", imageFile);

      const res = await api.patch("/auth/profile", fd);
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        setImgFile(null);
        toast.success("✅ Personal info updated!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-white/5">
        <div className="relative group flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-cyan-500/20 bg-gray-800 flex items-center justify-center">
            {previewImg ? (
              <img src={previewImg} alt="Profile" className="w-full h-full object-cover object-top" />
            ) : (
              <span className="text-4xl font-black text-white/20 italic">
                {firstName?.[0]}{lastName?.[0]}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('avatar-upload').click()}
            className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white text-[10px] font-black uppercase tracking-widest"
          >
            <FaCloudUploadAlt size={24} className="mb-1" />
            Change
          </button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="text-center md:text-left space-y-2">
            <h3 className="text-xl font-black text-white">Profile Identity</h3>
            <p className="text-xs text-white/40 max-w-xs uppercase tracking-widest leading-loose">
                Upload a high-quality headshot. This is the first thing recruiters see.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. +92 300 1234567"
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Lahore, Pakistan"
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-cyan-500/50 outline-none transition-all font-semibold text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
      >
        {saving ? "Syncing..." : "Save Identity"}
      </button>
    </form>
  );
};

export default PersonalInfoForm;
