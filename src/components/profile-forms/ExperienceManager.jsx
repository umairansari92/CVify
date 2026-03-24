import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaBriefcase, FaPlus, FaTrash, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { experienceSchema } from '../../utils/validationSchemas';

const experiencesArraySchema = yup.object().shape({
  experiences: yup.array().of(experienceSchema),
  sectionName: yup.string().required(),
});

const ExperienceManager = () => {
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
    resolver: yupResolver(experiencesArraySchema),
    defaultValues: {
      experiences: user?.experience || [],
      sectionName: user?.sectionNames?.experience || 'Professional Journey',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    if (user) {
      reset({
        experiences: user.experience || [],
        sectionName: user.sectionNames?.experience || 'Professional Journey',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        experience: data.experiences,
        sectionNames: { ...user.sectionNames, experience: data.sectionName }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("💼 Experience synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div className="space-y-1">
            <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                <FaBriefcase className="text-primary" /> 
                <input 
                    {...register('sectionName')}
                    className="bg-transparent border-none outline-none focus:ring-0 w-48 text-text-main placeholder-text-muted/20"
                />
            </h3>
            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                Your professional narrative. Focus on outcomes and quantifiable impact.
            </p>
        </div>
        <button
          type="button"
          onClick={() => append({ company: '', role: '', startDate: '', endDate: '', isCurrent: false, achievements: '' })}
          className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-black text-[10px] uppercase tracking-widest rounded-full border border-primary/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Role
        </button>
      </div>

      <div className="space-y-10">
        {fields.map((field, idx) => (
          <div key={field.id} className="group relative p-8 bg-midground border border-border-subtle rounded-[2.5rem] space-y-6 hover:border-primary/20 transition-all shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Company / Organization</label>
                <input
                  {...register(`experiences.${idx}.company`)}
                  className={`w-full px-5 py-4 rounded-2xl border ${errors.experiences?.[idx]?.company ? 'border-red-500/50' : 'border-border-subtle'} bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Job Title</label>
                <input
                  {...register(`experiences.${idx}.role`)}
                  className={`w-full px-5 py-4 rounded-2xl border ${errors.experiences?.[idx]?.role ? 'border-red-500/50' : 'border-border-subtle'} bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2 opacity-60">
                    <FaCalendarAlt size={10} className="text-primary/50" /> Start Date
                </label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.startDate`)}
                  className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2 opacity-60">
                        <FaCalendarAlt size={10} className="text-primary/50" /> End Date
                    </label>
                    <div className="flex items-center gap-2 mr-2">
                        <input 
                            type="checkbox" 
                            {...register(`experiences.${idx}.isCurrent`)}
                            className="w-3 h-3 rounded border-border-subtle bg-foreground/10 text-primary focus:ring-0" 
                        />
                        <span className="text-[9px] font-black uppercase text-text-muted opacity-40">Present</span>
                    </div>
                </div>
                <input
                  type="date"
                  {...register(`experiences.${idx}.endDate`)}
                  className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm disabled:opacity-20"
                />
              </div>

              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-5 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all flex items-center justify-center gap-2 md:w-auto"
              >
                <FaTrash size={14} />
                <span className="md:hidden text-[10px] font-black uppercase tracking-widest">Remove Role</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Key Achievements & Responsibilities</label>
              <textarea
                {...register(`experiences.${idx}.achievements`)}
                placeholder="e.g. Scaled platform to 1M+ users, Managed 15+ engineers, etc."
                className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-medium text-sm h-32 resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-border-subtle rounded-[3rem] opacity-50">
                <p className="text-text-muted font-black uppercase tracking-widest italic">No professional history recorded yet.</p>
            </div>
        )}
      </div>

      <div className="pt-8 border-t border-border-subtle">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-10 py-4 bg-primary hover:bg-primary/80 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Syncing Journey..." : "Save Professional History"}
        </button>
      </div>
    </form>
  );
};

export default ExperienceManager;
