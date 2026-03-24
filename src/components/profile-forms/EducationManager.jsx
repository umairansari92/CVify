import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaGraduationCap, FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { educationSchema } from '../../utils/validationSchemas';

const educationArraySchema = yup.object().shape({
  educations: yup.array().of(educationSchema),
  sectionName: yup.string().required(),
});

const EducationManager = () => {
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
    resolver: yupResolver(educationArraySchema),
    defaultValues: {
      educations: user?.education || [],
      sectionName: user?.sectionNames?.education || 'Academic Background',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  useEffect(() => {
    if (user) {
      reset({
        educations: user.education || [],
        sectionName: user.sectionNames?.education || 'Academic Background',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        education: data.educations,
        sectionNames: { ...user.sectionNames, education: data.sectionName }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("🎓 Education synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div className="space-y-1">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
                <FaGraduationCap className="text-emerald-500" /> 
                <input 
                    {...register('sectionName')}
                    className="bg-transparent border-none outline-none focus:ring-0 w-48 text-white placeholder-white/20"
                />
            </h3>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                Your academic foundation. Include degrees, certifications, and relevant coursework.
            </p>
        </div>
        <button
          type="button"
          onClick={() => append({ school: '', degree: '', startDate: '', endDate: '', isCurrent: false, description: '' })}
          className="px-6 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-emerald-500/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Education
        </button>
      </div>

      <div className="space-y-10">
        {fields.map((field, idx) => (
          <div key={field.id} className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-6 hover:border-emerald-500/20 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Institution / School</label>
                <input
                  {...register(`educations.${idx}.school`)}
                  placeholder="e.g. Stanford University"
                  className={`w-full px-5 py-4 rounded-2xl border ${errors.educations?.[idx]?.school ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-emerald-500/50 outline-none transition-all font-semibold text-sm`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Degree / Certification</label>
                <input
                  {...register(`educations.${idx}.degree`)}
                  placeholder="e.g. BS in Computer Science"
                  className={`w-full px-5 py-4 rounded-2xl border ${errors.educations?.[idx]?.degree ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-emerald-500/50 outline-none transition-all font-semibold text-sm`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaCalendarAlt size={10} className="text-emerald-500/50" /> Enrollment Date
                </label>
                <input
                  type="date"
                  {...register(`educations.${idx}.startDate`)}
                  className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-emerald-500/50 outline-none transition-all font-semibold text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <FaCalendarAlt size={10} className="text-emerald-500/50" /> Graduation Date
                    </label>
                    <div className="flex items-center gap-2 mr-2">
                        <input 
                            type="checkbox" 
                            {...register(`educations.${idx}.isCurrent`)}
                            className="w-3 h-3 rounded border-white/10 bg-white/5 text-emerald-600 focus:ring-0" 
                        />
                        <span className="text-[9px] font-black uppercase text-white/30">Enrolled</span>
                    </div>
                </div>
                <input
                  type="date"
                  {...register(`educations.${idx}.endDate`)}
                  className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-emerald-500/50 outline-none transition-all font-semibold text-sm disabled:opacity-20"
                />
              </div>

              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-5 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all flex items-center justify-center gap-2 md:w-auto"
              >
                <FaTrash size={14} />
                <span className="md:hidden text-[10px] font-black uppercase tracking-widest">Remove Entry</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Academic Highlights</label>
              <textarea
                {...register(`educations.${idx}.description`)}
                placeholder="Major projects, honors, or relevant extracurriculars..."
                className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-emerald-500/50 outline-none transition-all font-medium text-sm h-32 resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-white/20 font-black uppercase tracking-widest italic">No academic history recorded yet.</p>
            </div>
        )}
      </div>

      <div className="pt-8 border-t border-white/5">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-10 py-4 bg-emerald-600 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Syncing Academy..." : "Save Academic History"}
        </button>
      </div>
    </form>
  );
};

export default EducationManager;
