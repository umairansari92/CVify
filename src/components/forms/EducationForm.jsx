import React, { useEffect, useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";
import { FiTrash2, FiAlertCircle, FiEdit3, FiPlus, FiBookOpen, FiCalendar, FiCheck, FiAward } from "react-icons/fi";
import { isValidDateRange } from "../../utils/dateUtils";

const EducationForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: currentResume?.education || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const educationCopy = value.education
        ? JSON.parse(JSON.stringify(value.education))
        : [];
      dispatch(setResumeField({ field: "education", value: educationCopy }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const handleAddNew = () => {
    const defaultYear = new Date().getFullYear().toString();
    append({
      degree: "",
      institution: "",
      startDate: `Sep ${defaultYear}`,
      endDate: "Present",
    });
    setEditingId(fields.length);
  };

  const educationValues = watch("education") || [];

  if (editingId === null) {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-text-main flex items-center gap-2">
            <FiBookOpen className="text-primary" /> Education History
          </h3>
          <span className="text-xs font-bold text-text-muted bg-foreground/5 px-3 py-1 rounded-full border border-border-subtle">
            {fields.length} Degrees
          </span>
        </div>

        <div className="space-y-3">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="group bg-midground border border-border-subtle p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-primary/30 transition-all hover:shadow-premium cursor-pointer"
              onClick={() => setEditingId(index)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-black text-text-main truncate text-sm lg:text-base capitalize">
                    {educationValues[index]?.degree || "Untitled Degree"}
                  </h4>
                  {index === 0 && (
                    <span className="text-[8px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded tracking-widest uppercase">Latest</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted font-bold">
                  <span className="flex items-center gap-1 truncate max-w-[150px]">
                    <FiAward className="shrink-0" size={12} /> {educationValues[index]?.institution || "Institution Name"}
                  </span>
                  <span className={`flex items-center gap-1 shrink-0 ${!isValidDateRange(educationValues[index]?.startDate, educationValues[index]?.endDate) ? "text-red-500" : ""}`}>
                    <FiCalendar className="shrink-0" size={12} /> {educationValues[index]?.startDate} - {educationValues[index]?.endDate}
                    {!isValidDateRange(educationValues[index]?.startDate, educationValues[index]?.endDate) && (
                      <FiAlertCircle size={12} className="animate-pulse" />
                    )}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(index);
                  }}
                  className="p-2.5 text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <FiEdit3 size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                  className="p-2.5 text-text-muted hover:text-white hover:bg-red-500 rounded-xl transition-all"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="group w-full py-5 bg-foreground/5 text-primary rounded-2xl hover:bg-primary/5 transition-all font-black uppercase tracking-[0.2em] border-2 border-dashed border-primary/20 flex items-center justify-center gap-3 text-xs shadow-sm"
        >
          <FiPlus className="text-lg group-hover:rotate-90 transition-transform" />
          Add Education
        </button>
      </div>
    );
  }

  const index = editingId;

  return (
    <div className="space-y-8 animate-slideUp">
      <div className="flex items-center justify-between border-b border-border-subtle pb-6">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FiBookOpen size={20} />
          </div>
          <div>
            <h3 className="font-black text-lg">Edit Education</h3>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-black">Record #{index + 1}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditingId(null)}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <FiCheck size={16} /> Save & Done
        </button>
      </div>

      {!isValidDateRange(watch(`education.${index}.startDate`), watch(`education.${index}.endDate`)) && (
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 animate-bounce-subtle">
           <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-500/20">
              <FiAlertCircle size={24} />
           </div>
           <div>
              <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">Invalid Timeline Detected</h4>
              <p className="text-[10px] text-red-500/70 font-bold mt-1">Your start date cannot be after your end date. Please adjust the periods below to maintain resume integrity.</p>
           </div>
        </div>
      )}

      <div className="space-y-8 bg-midground/50 p-6 rounded-[2rem] border border-border-subtle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
              Degree / Certification <span className="text-red-500">*</span>
            </label>
            <input
              {...register(`education.${index}.degree`)}
              placeholder="e.g. Bachelor of Science"
              className="input-premium py-4"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
              Institution <span className="text-red-500">*</span>
            </label>
            <input
              {...register(`education.${index}.institution`)}
              placeholder="e.g. Stanford University"
              className="input-premium py-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2.5">
            <Controller
              control={control}
              name={`education.${index}.startDate`}
              render={({ field }) => (
                <DateRangePicker
                  label="Start Period"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Controller
              control={control}
              name={`education.${index}.endDate`}
              rules={{
                validate: (value) => {
                  const startDate = watch(`education.${index}.startDate`);
                  return isValidDateRange(startDate, value) || "Invalid Date Range";
                },
              }}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <DateRangePicker
                    label="End Period"
                    value={field.value}
                    onChange={field.onChange}
                    isPresentAllowed={true}
                  />
                  {fieldState.error && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 ml-1">
                      <FiAlertCircle size={12} />
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setEditingId(null)}
        className="w-full py-5 bg-foreground/10 text-text-main rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-foreground/20 transition-all flex items-center justify-center gap-2"
      >
        Return to Education List
      </button>
    </div>
  );
};

export default EducationForm;
