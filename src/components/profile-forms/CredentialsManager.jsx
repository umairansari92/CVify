import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import { updateActiveProfileLocally } from '../../features/profile/profileSlice';
import api from '../../api/axios';
import { FaTrophy, FaPlus, FaTrash, FaAward, FaGlobe, FaCertificate, FaMedal, FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';
import { awardSchema, certificationSchema, languageSchema } from '../../utils/validationSchemas';

const credentialsSchema = yup.object().shape({
  achievements: yup.array().of(awardSchema),
  certifications: yup.array().of(certificationSchema),
  languages: yup.array().of(languageSchema),
  interests: yup.array().of(yup.string().required()),
  sectionNames: yup.object().shape({
    achievements: yup.string().required(),
    certifications: yup.string().required(),
  })
});

const CredentialsManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [saving, setSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(credentialsSchema),
    defaultValues: {
      achievements: user?.achievements || [],
      certifications: user?.certifications || [],
      languages: user?.languages || [],
      interests: user?.interests || [],
      sectionNames: {
        achievements: user?.sectionNames?.achievements || 'Honors & Awards',
        certifications: user?.sectionNames?.certifications || 'Certifications'
      }
    }
  });

  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control,
    name: "achievements",
  });

  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({
    control,
    name: "certifications",
  });

  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({
    control,
    name: "languages",
  });

  const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
    control,
    name: "interests",
  });

  useEffect(() => {
    if (user) {
      reset({
        achievements: user.achievements || [],
        certifications: user.certifications || [],
        languages: user.languages || [],
        interests: user.interests || [],
        sectionNames: {
          achievements: user.sectionNames?.achievements || 'Honors & Awards',
          certifications: user.sectionNames?.certifications || 'Certifications'
        }
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        achievements: data.achievements,
        certifications: data.certifications,
        languages: data.languages,
        interests: data.interests,
        sectionNames: { ...user.sectionNames, ...data.sectionNames }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        dispatch(updateActiveProfileLocally(res.data.user));
        toast.success("🔐 Credentials synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
      
      {/* --- AWARDS SECTION --- */}
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
          <div className="space-y-1">
              <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                  <FaTrophy className="text-yellow-500" /> 
                  <input 
                      {...register('sectionNames.achievements')}
                      className="bg-transparent border-none outline-none focus:ring-0 w-64 text-text-main placeholder-text-muted/20"
                  />
              </h3>
              <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                  Celebrate your wins. Professional recognition and honors.
              </p>
          </div>
          <button
            type="button"
            onClick={() => appendAward({ title: '', date: '', description: '' })}
            className="px-6 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-yellow-500/20 transition-all flex items-center gap-2"
          >
            <FaPlus size={10} /> Add Award
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awardFields.map((field, idx) => (
            <div key={field.id} className="p-8 bg-midground border border-border-subtle rounded-[2.5rem] space-y-4 hover:border-yellow-500/20 transition-all relative group shadow-sm">
              <button type="button" onClick={() => removeAward(idx)} className="absolute right-6 top-6 text-text-muted opacity-10 hover:text-red-500 transition-all group-hover:opacity-40">
                <FaTrash size={12} />
              </button>
              
              <div className="space-y-4">
                  <div className="space-y-2">
                      <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40">Award Title</label>
                      <input
                          {...register(`achievements.${idx}.title`)}
                          placeholder="e.g. Employee of the Year"
                          className={`w-full px-5 py-3 rounded-2xl border ${errors.achievements?.[idx]?.title ? 'border-red-500/50' : 'border-border-subtle'} bg-foreground/10 text-text-main focus:border-yellow-500/50 outline-none transition-all font-bold text-sm`}
                      />
                  </div>
                  <div className="space-y-2">
                        <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40">Date</label>
                        <input
                            type="text"
                            {...register(`achievements.${idx}.date`)}
                            placeholder="e.g. 2023"
                            className="w-full px-5 py-3 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-yellow-500/50 outline-none transition-all font-semibold text-xs"
                        />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40">Brief Context</label>
                      <textarea
                          {...register(`achievements.${idx}.description`)}
                          placeholder="Why was this awarded?"
                          className="w-full px-5 py-3 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-yellow-500/50 outline-none transition-all font-medium text-xs h-20 resize-none"
                      />
                  </div>
              </div>
            </div>
          ))}
          {awardFields.length === 0 && <p className="col-span-full text-center text-text-muted text-xs italic opacity-30">No awards added.</p>}
        </div>
      </div>

      {/* --- CERTIFICATIONS SECTION --- */}
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
          <div className="space-y-1">
              <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                  <FaCertificate className="text-blue-500" /> 
                  <input 
                      {...register('sectionNames.certifications')}
                      className="bg-transparent border-none outline-none focus:ring-0 w-64 text-text-main placeholder-text-muted/20"
                  />
              </h3>
              <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                  Global standards & validation. Showcase your verified skills.
              </p>
          </div>
          <button
            type="button"
            onClick={() => appendCert({ name: '', issuer: '', date: '', link: '', description: '' })}
            className="px-6 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-blue-500/20 transition-all flex items-center gap-2"
          >
            <FaPlus size={10} /> Add Certification
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certFields.map((field, idx) => (
            <div key={field.id} className="p-8 bg-midground border border-border-subtle rounded-[2.5rem] space-y-4 hover:border-blue-500/20 transition-all relative group shadow-sm">
              <button type="button" onClick={() => removeCert(idx)} className="absolute right-6 top-6 text-text-muted opacity-10 hover:text-red-500 transition-all group-hover:opacity-40">
                <FaTrash size={12} />
              </button>
              
              <div className="space-y-4">
                  <div className="space-y-2">
                      <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40">Certificate Name</label>
                      <input
                          {...register(`certifications.${idx}.name`)}
                          placeholder="e.g. AWS Certified Solutions Architect"
                          className="w-full px-5 py-3 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-blue-500/50 outline-none transition-all font-bold text-sm"
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40">Issuer</label>
                          <input
                              {...register(`certifications.${idx}.issuer`)}
                              placeholder="Amazon Web Services"
                              className="w-full px-5 py-3 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-blue-500/50 outline-none transition-all font-semibold text-xs"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40">Date</label>
                          <input
                              {...register(`certifications.${idx}.date`)}
                              placeholder="MM/YYYY"
                              className="w-full px-5 py-3 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-blue-500/50 outline-none transition-all font-semibold text-xs"
                          />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-40 flex items-center gap-2">
                        Verification Link <FaExternalLinkAlt size={8} />
                      </label>
                      <input
                          {...register(`certifications.${idx}.link`)}
                          placeholder="https://credly.com/..."
                          className="w-full px-5 py-3 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-blue-500/50 outline-none transition-all font-medium text-xs"
                      />
                  </div>
              </div>
            </div>
          ))}
          {certFields.length === 0 && <p className="col-span-full text-center text-text-muted text-xs italic opacity-30">No certifications listed.</p>}
        </div>
      </div>

      {/* --- LANGUAGES SECTION --- */}
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
          <div className="space-y-1">
              <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                  <FaGlobe className="text-emerald-500" /> Languages
              </h3>
              <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                  Global reach. Communication proficiency in different dialects.
              </p>
          </div>
          <button
            type="button"
            onClick={() => appendLang({ name: '', proficiency: 'Advanced' })}
            className="px-6 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-emerald-500/20 transition-all flex items-center gap-2"
          >
            <FaPlus size={10} /> Add Language
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {langFields.map((field, idx) => (
            <div key={field.id} className="p-4 bg-midground border border-border-subtle rounded-3xl flex items-center gap-4 hover:border-emerald-500/20 transition-all shadow-sm group">
              <div className="space-y-1">
                <input
                    {...register(`languages.${idx}.name`)}
                    placeholder="Language"
                    className="bg-transparent border-none outline-none focus:ring-0 text-text-main font-bold text-sm w-24"
                />
                <select
                    {...register(`languages.${idx}.proficiency`)}
                    className="block bg-transparent border-none outline-none focus:ring-0 text-emerald-500 text-[10px] font-black uppercase tracking-widest cursor-pointer"
                >
                    <option value="Native">Native</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                    <option value="Beginner">Beginner</option>
                </select>
              </div>
              <button type="button" onClick={() => removeLang(idx)} className="text-text-muted opacity-10 hover:text-red-500 group-hover:opacity-40 transition-all">
                <FaTrash size={12} />
              </button>
            </div>
          ))}
          {langFields.length === 0 && <p className="w-full text-center text-text-muted text-xs italic opacity-30">No languages specified.</p>}
        </div>
      </div>

      {/* --- INTERESTS SECTION --- */}
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
          <div className="space-y-1">
              <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                  <FaLaptopCode className="text-violet-500" /> Interests & Hobbies
              </h3>
              <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                  Beyond the desk. What keeps you inspired and engaged?
              </p>
          </div>
          <button
            type="button"
            onClick={() => appendInterest('')}
            className="px-6 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-violet-500/20 transition-all flex items-center gap-2"
          >
            <FaPlus size={10} /> Add Interest
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {interestFields.map((field, idx) => (
            <div key={field.id} className="p-4 bg-midground border border-border-subtle rounded-3xl flex items-center gap-4 hover:border-violet-500/20 transition-all shadow-sm group">
              <input
                  {...register(`interests.${idx}`)}
                  placeholder="e.g. Open Source"
                  className="bg-transparent border-none outline-none focus:ring-0 text-text-main font-bold text-sm min-w-[120px]"
              />
              <button type="button" onClick={() => removeInterest(idx)} className="text-text-muted opacity-10 hover:text-red-500 group-hover:opacity-40 transition-all">
                <FaTrash size={12} />
              </button>
            </div>
          ))}
          {interestFields.length === 0 && <p className="w-full text-center text-text-muted text-xs italic opacity-30">No interests listed.</p>}
        </div>
      </div>

      <div className="pt-8 border-t border-border-subtle">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-10 py-4 bg-primary hover:bg-primary/80 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Deploying Dossier..." : "Save All Credentials"}
        </button>
      </div>
    </form>
  );
};

export default CredentialsManager;
