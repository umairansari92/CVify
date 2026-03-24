import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { brandingSchema } from '../../utils/validationSchemas';
import { FaCopy, FaCheck } from 'react-icons/fa';

const BrandingForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `https://app-cvifypro.vercel.app/p/${user?.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(brandingSchema),
    defaultValues: {
      username: user?.username || '',
      headline: user?.headline || '',
      identityLabel: user?.branding?.identityLabel || '',
      availability: user?.availability || 'Open to Work',
      industry: user?.industry || 'Technology & Software',
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        headline: user.headline || '',
        identityLabel: user.branding?.identityLabel || '',
        availability: user.availability || 'Open to Work',
        industry: user.industry || 'Technology & Software',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        username: data.username,
        headline: data.headline,
        branding: { ...user.branding, identityLabel: data.identityLabel },
        availability: data.availability,
        industry: data.industry
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Custom Username (URL)</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted opacity-40 text-[10px] font-black uppercase tracking-tight">app-cvifypro.vercel.app/p/</span>
            <input
              {...register('username')}
              className={`w-full pl-24 pr-16 py-4 rounded-2xl border ${errors.username ? 'border-red-500/50' : 'border-border-subtle'} bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm`}
            />
            <button
                type="button"
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all"
                title="Copy Profile URL"
            >
                {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
            </button>
          </div>
          {errors.username && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Identity Label (Stats Row)</label>
          <input
            {...register('identityLabel')}
            placeholder="e.g. Design Lead @ Figma"
            className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Availability Status</label>
          <select
            {...register('availability')}
            className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
          >
            <option value="Open to Work">🟢 Open to Work</option>
            <option value="Freelance Available">⚡ Freelance Available</option>
            <option value="Available for Internship">🎓 Available for Internship</option>
            <option value="Currently Employed">💼 Currently Employed</option>
            <option value="Not Available">🔴 Not Available</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Industry Focus</label>
          <select
            {...register('industry')}
            className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
          >
            {["Technology & Software", "Healthcare", "Education", "Finance", "Marketing", "Engineering", "Design", "Other"].map(ind => (
              <option key={ind} value={ind} className="bg-midground text-text-main">{ind}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Professional Headline</label>
        <input
          {...register('headline')}
          placeholder="e.g. Senior Product Designer | Apple Enthusiast"
          className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={saving || !isDirty}
        className="px-10 py-4 bg-primary hover:bg-primary/80 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
      >
        {saving ? "Updating Branding..." : "Save Branding"}
      </button>
    </form>
  );
};

export default BrandingForm;
