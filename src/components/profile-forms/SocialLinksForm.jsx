import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaLink } from 'react-icons/fa';
import { socialLinksSchema } from '../../utils/validationSchemas';

const SocialLinksForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(socialLinksSchema),
    defaultValues: {
      linkedin: user?.socialLinks?.linkedin || '',
      github: user?.socialLinks?.github || '',
      twitter: user?.socialLinks?.twitter || '',
      portfolio: user?.socialLinks?.portfolio || '',
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        linkedin: user.socialLinks?.linkedin || '',
        github: user.socialLinks?.github || '',
        twitter: user.socialLinks?.twitter || '',
        portfolio: user.socialLinks?.portfolio || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { socialLinks: data });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("🔗 Links synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="pb-6 border-b border-white/5 space-y-1">
        <h3 className="text-xl font-black text-white flex items-center gap-3">
            <FaLink className="text-blue-500" /> Digital Presence
        </h3>
        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
            Connect your professional networks and personal portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">LinkedIn URL</label>
            <div className="relative">
                <FaLinkedin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0077b5]" />
                <input
                    {...register('linkedin')}
                    placeholder="https://linkedin.com/in/username"
                    className={`w-full pl-12 pr-5 py-4 rounded-2xl border ${errors.linkedin ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-blue-500/50 outline-none transition-all font-semibold text-sm`}
                />
            </div>
            {errors.linkedin && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.linkedin.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">GitHub URL</label>
            <div className="relative">
                <FaGithub className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                    {...register('github')}
                    placeholder="https://github.com/username"
                    className={`w-full pl-12 pr-5 py-4 rounded-2xl border ${errors.github ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-white/30 outline-none transition-all font-semibold text-sm`}
                />
            </div>
            {errors.github && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.github.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Twitter / X URL</label>
            <div className="relative">
                <FaTwitter className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1da1f2]" />
                <input
                    {...register('twitter')}
                    placeholder="https://twitter.com/username"
                    className={`w-full pl-12 pr-5 py-4 rounded-2xl border ${errors.twitter ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-blue-400/50 outline-none transition-all font-semibold text-sm`}
                />
            </div>
            {errors.twitter && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.twitter.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Personal Website</label>
            <div className="relative">
                <FaGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500" />
                <input
                    {...register('portfolio')}
                    placeholder="https://yourwebsite.com"
                    className={`w-full pl-12 pr-5 py-4 rounded-2xl border ${errors.portfolio ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-emerald-500/50 outline-none transition-all font-semibold text-sm`}
                />
            </div>
            {errors.portfolio && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.portfolio.message}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Linking..." : "Save Networks"}
        </button>
      </div>
    </form>
  );
};

export default SocialLinksForm;
