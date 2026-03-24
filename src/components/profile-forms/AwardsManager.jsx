import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaTrophy, FaPlus, FaTrash, FaCalendarAlt, FaMedal } from 'react-icons/fa';
import { awardSchema } from '../../utils/validationSchemas';

const awardsArraySchema = yup.object().shape({
  awards: yup.array().of(awardSchema),
  sectionName: yup.string().required(),
});

const AwardsManager = () => {
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
    resolver: yupResolver(awardsArraySchema),
    defaultValues: {
      awards: user?.awards || [],
      sectionName: user?.sectionNames?.awards || 'Recognition & Accolades',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  });

  useEffect(() => {
    if (user) {
      reset({
        awards: user.awards || [],
        sectionName: user.sectionNames?.awards || 'Recognition & Accolades',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        awards: data.awards,
        sectionNames: { ...user.sectionNames, awards: data.sectionName }
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("🏆 Awards synchronized!");
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
                <FaTrophy className="text-yellow-500" /> 
                <input 
                    {...register('sectionName')}
                    className="bg-transparent border-none outline-none focus:ring-0 w-64 text-white placeholder-white/20"
                />
            </h3>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                Celebrate your wins. Awards, honors, and professional recognition.
            </p>
        </div>
        <button
          type="button"
          onClick={() => append({ title: '', issuer: '', date: '', description: '' })}
          className="px-6 py-2 bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-yellow-500/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Award
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map((field, idx) => (
          <div key={field.id} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-4 hover:border-yellow-500/20 transition-all relative group">
            <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute right-6 top-6 text-white/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
            >
                <FaTrash size={12} />
            </button>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <FaMedal size={10} className="text-yellow-500" /> Award Title
                    </label>
                    <input
                        {...register(`awards.${idx}.title`)}
                        placeholder="e.g. Employee of the Year"
                        className={`w-full px-5 py-3 rounded-2xl border ${errors.awards?.[idx]?.title ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-white focus:border-yellow-500/50 outline-none transition-all font-bold text-sm`}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Issuer</label>
                        <input
                            {...register(`awards.${idx}.issuer`)}
                            placeholder="e.g. Microsoft"
                            className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-yellow-500/50 outline-none transition-all font-semibold text-xs"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Date</label>
                        <input
                            type="date"
                            {...register(`awards.${idx}.date`)}
                            className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-yellow-500/50 outline-none transition-all font-semibold text-xs"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Brief Context</label>
                    <textarea
                        {...register(`awards.${idx}.description`)}
                        placeholder="Why was this awarded? Key contribution..."
                        className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-yellow-500/50 outline-none transition-all font-medium text-xs h-20 resize-none leading-relaxed"
                    />
                </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-white/20 font-black uppercase tracking-widest italic">No awards listed yet. Time to win something!</p>
            </div>
        )}
      </div>

      <div className="pt-8 border-t border-white/5">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-10 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Publishing Wins..." : "Save Recognition"}
        </button>
      </div>
    </form>
  );
};

export default AwardsManager;
