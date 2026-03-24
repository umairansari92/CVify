import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaCode, FaLightbulb, FaServicestack, FaPlus, FaTrash, FaStar } from 'react-icons/fa';

const skillsServicesSchema = yup.object().shape({
  technicalSkills: yup.array().of(yup.string().required("Skill name required")),
  strategicSkills: yup.array().of(yup.string().required("Skill name required")),
  services: yup.array().of(yup.object().shape({
    title: yup.string().required("Service title required"),
    description: yup.string().required("Description required"),
  })),
  sectionNames: yup.object().shape({
    skills: yup.string().required(),
    services: yup.string().required(),
  })
});

const SkillsServicesManager = () => {
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
    resolver: yupResolver(skillsServicesSchema),
    defaultValues: {
      technicalSkills: user?.skills?.technical || [],
      strategicSkills: user?.skills?.strategic || [],
      services: user?.services || [],
      sectionNames: {
        skills: user?.sectionNames?.skills || 'Expertise & Capabilities',
        services: user?.sectionNames?.services || 'Available Services',
      }
    }
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control,
    name: "technicalSkills",
  });

  const { fields: stratFields, append: appendStrat, remove: removeStrat } = useFieldArray({
    control,
    name: "strategicSkills",
  });

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control,
    name: "services",
  });

  useEffect(() => {
    if (user) {
      reset({
        technicalSkills: user.skills?.technical || [],
        strategicSkills: user.skills?.strategic || [],
        services: user.services || [],
        sectionNames: {
          skills: user.sectionNames?.skills || 'Expertise & Capabilities',
          services: user.sectionNames?.services || 'Available Services',
        }
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        skills: {
          technical: data.technicalSkills,
          strategic: data.strategicSkills,
        },
        services: data.services,
        sectionNames: {
          ...user.sectionNames,
          skills: data.sectionNames.skills,
          services: data.sectionNames.services,
        }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("⚡ Expertise synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* Skills Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="space-y-1">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <FaStar className="text-yellow-500" /> 
                    <input 
                        {...register('sectionNames.skills')}
                        className="bg-transparent border-none outline-none focus:ring-0 w-64 text-white placeholder-white/20"
                    />
                </h3>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                    Categorize your masteries. Blend code with strategy.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <FaCode className="text-cyan-500" /> Technical Arsenal
                    </h4>
                    <button type="button" onClick={() => appendTech("")} className="text-cyan-500 hover:text-cyan-400 p-1 transition-all">
                        <FaPlus size={10} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {techFields.map((field, idx) => (
                        <div key={field.id} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full group hover:border-cyan-500/50 transition-all">
                            <input
                                {...register(`technicalSkills.${idx}`)}
                                placeholder="Skill..."
                                className="bg-transparent border-none outline-none text-xs font-bold text-white w-20 placeholder-white/10"
                            />
                            <button type="button" onClick={() => removeTech(idx)} className="text-white/20 hover:text-red-500 transition-colors">
                                <FaTrash size={8} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strategic Skills */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <FaLightbulb className="text-amber-500" /> Strategic mindset
                    </h4>
                    <button type="button" onClick={() => appendStrat("")} className="text-amber-500 hover:text-amber-400 p-1 transition-all">
                        <FaPlus size={10} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {stratFields.map((field, idx) => (
                        <div key={field.id} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full group hover:border-amber-500/50 transition-all">
                            <input
                                {...register(`strategicSkills.${idx}`)}
                                placeholder="Concept..."
                                className="bg-transparent border-none outline-none text-xs font-bold text-white w-24 placeholder-white/10"
                            />
                            <button type="button" onClick={() => removeStrat(idx)} className="text-white/20 hover:text-red-500 transition-colors">
                                <FaTrash size={8} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-8 pt-8 border-t border-white/5">
        <div className="flex items-center justify-between pb-6">
            <div className="space-y-1">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <FaServicestack className="text-violet-500" /> 
                    <input 
                        {...register('sectionNames.services')}
                        className="bg-transparent border-none outline-none focus:ring-0 w-64 text-white placeholder-white/20"
                    />
                </h3>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                    What can you do for others? Clear value propositions.
                </p>
            </div>
            <button
                type="button"
                onClick={() => appendService({ title: '', description: '' })}
                className="px-6 py-2 bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-violet-500/20 transition-all flex items-center gap-2"
            >
                <FaPlus size={10} /> New Service
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceFields.map((field, idx) => (
                <div key={field.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 hover:border-violet-500/20 transition-all relative group">
                    <button
                        type="button"
                        onClick={() => removeService(idx)}
                        className="absolute right-4 top-4 text-white/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <FaTrash size={12} />
                    </button>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Service Headline</label>
                        <input
                            {...register(`services.${idx}.title`)}
                            placeholder="e.g. Fullstack Web Architecture"
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-violet-500/50 outline-none transition-all font-bold text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Value Description</label>
                        <textarea
                            {...register(`services.${idx}.description`)}
                            placeholder="Describe the problem you solve and the value you provide..."
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-violet-500/50 outline-none transition-all font-medium text-xs h-24 resize-none leading-relaxed"
                        />
                    </div>
                </div>
            ))}
        </div>
      </section>

      <div className="pt-8 border-t border-white/5">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50 border border-white/10"
        >
          {saving ? "Deploying Expertise..." : "Save Professional Capabilities"}
        </button>
      </div>
    </form>
  );
};

export default SkillsServicesManager;
