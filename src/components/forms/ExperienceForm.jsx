import React, { useEffect, useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";
import { FiTrash2, FiAlertCircle, FiEdit3, FiPlus, FiBriefcase, FiCalendar, FiMapPin, FiCheck } from "react-icons/fi";
import { isValidDateRange } from "../../utils/dateUtils";

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  const [editingId, setEditingId] = useState(null); // null, 'new', or index

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experience: currentResume?.experience || [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "experience",
  });

  // map of common generic job titles to industry-standard replacements
  const titleSuggestions = {
    "MERN Specialist": "Full-Stack Developer",
    "MERN Developer": "Full-Stack Developer",
    "MERN Engineer": "Full-Stack Developer",
    "React Developer": "Frontend Developer",
    "Frontend Engineer": "Frontend Developer",
    "Backend Engineer": "Backend Developer",
  };

  const [suggestions, setSuggestions] = useState({});

  const summarizeOld = () => {
    const tenYearsAgo = new Date().getFullYear() - 10;
    const currentEx = watch("experience") || [];
    const remaining = [];
    const oldEntries = [];

    currentEx.forEach((exp) => {
      const year = parseInt(exp.startDate?.split(" ")[1]);
      if (year && year < tenYearsAgo) {
        oldEntries.push(exp);
      } else {
        remaining.push(exp);
      }
    });

    if (oldEntries.length > 0) {
      remaining.push({
        position: "Various roles prior to " + tenYearsAgo,
        company: "Multiple Employers",
        startDate: oldEntries[0]?.startDate,
        endDate: oldEntries[oldEntries.length - 1]?.endDate,
        responsibilities: "Summary of earlier experience (collapsed)",
      });
    }

    replace(remaining);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      const transformedExperience = value.experience?.map((exp) => ({
        ...exp,
        responsibilities:
          typeof exp.responsibilities === "string"
            ? exp.responsibilities.split("\n")
            : exp.responsibilities,
      }));

      // check for title suggestions
      const newSuggestions = {};
      value.experience?.forEach((exp, idx) => {
        const cleaned = exp.position?.trim();
        if (
          cleaned &&
          titleSuggestions[cleaned] &&
          cleaned !== titleSuggestions[cleaned]
        ) {
          newSuggestions[idx] = titleSuggestions[cleaned];
        }
      });
      setSuggestions(newSuggestions);

      dispatch(
        setResumeField({ field: "experience", value: transformedExperience }),
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, titleSuggestions]);

  const handleAddNew = () => {
    const defaultYear = new Date().getFullYear().toString();
    append({
      position: "",
      company: "",
      startDate: `Jan ${defaultYear}`,
      endDate: "Present",
      responsibilities: "",
    });
    setEditingId(fields.length); // The index of the newly appended item
  };

  const experienceValues = watch("experience") || [];
  const tenYearsAgo = new Date().getFullYear() - 10;
  const oldExists = experienceValues.some((exp) => {
    const year = parseInt(exp.startDate?.split(" ")[1]);
    return year && year < tenYearsAgo;
  });

  // Render List of Summary Cards
  if (editingId === null) {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-text-main flex items-center gap-2">
            <FiBriefcase className="text-primary" /> Professional Experience
          </h3>
          <span className="text-xs font-bold text-text-muted bg-foreground/5 px-3 py-1 rounded-full border border-border-subtle">
            {fields.length} Entries
          </span>
        </div>

        {oldExists && (
          <div className="bg-yellow-100/40 backdrop-blur-sm border border-yellow-200 p-4 rounded-2xl text-yellow-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-lg">💡</span>
              <p className="text-xs font-bold">Entries older than 10 years detected.</p>
            </div>
            <button
              type="button"
              className="text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-lg shadow-sm hover:scale-105 transition-all"
              onClick={summarizeOld}
            >
              Summarize
            </button>
          </div>
        )}

        <div className="space-y-3">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="group bg-midground border border-border-subtle p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-primary/30 transition-all hover:shadow-premium cursor-pointer"
              onClick={() => setEditingId(index)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-black text-text-main truncate text-sm lg:text-base">
                    {experienceValues[index]?.position || "Untitled Position"}
                  </h4>
                  {index === 0 && (
                    <span className="text-[8px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded tracking-widest uppercase">Latest</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted font-bold">
                  <span className="flex items-center gap-1 truncate max-w-[150px]">
                    <FiMapPin className="shrink-0" size={12} /> {experienceValues[index]?.company || "Company Name"}
                  </span>
                  <span className={`flex items-center gap-1 shrink-0 ${!isValidDateRange(experienceValues[index]?.startDate, experienceValues[index]?.endDate) ? "text-red-500" : ""}`}>
                    <FiCalendar className="shrink-0" size={12} /> {experienceValues[index]?.startDate} - {experienceValues[index]?.endDate}
                    {!isValidDateRange(experienceValues[index]?.startDate, experienceValues[index]?.endDate) && (
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
          Add New Experience
        </button>
      </div>
    );
  }

  // Render Detailed Form View
  const index = editingId;
  const isNew = editingId === 'new';

  return (
    <div className="space-y-8 animate-slideUp">
      <div className="flex items-center justify-between border-b border-border-subtle pb-6">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FiEdit3 size={20} />
          </div>
          <div>
            <h3 className="font-black text-lg">Edit Experience</h3>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-black">Entry #{index + 1}</p>
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
      
      {!isValidDateRange(watch(`experience.${index}.startDate`), watch(`experience.${index}.endDate`)) && (
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
              Position <span className="text-red-500">*</span>
            </label>
            <input
              {...register(`experience.${index}.position`)}
              placeholder="e.g. Full Stack Developer"
              className="input-premium py-4"
            />
            {suggestions[index] && (
              <div className="text-[10px] text-yellow-600 font-bold bg-yellow-50 dark:bg-yellow-900/10 p-2 rounded-lg flex items-center gap-2">
                <FiAlertCircle size={14} />
                <span>Suggestion: </span>
                <button
                  type="button"
                  className="underline decoration-dotted"
                  onClick={() => {
                    setValue(`experience.${index}.position`, suggestions[index]);
                    setSuggestions((s) => {
                      const copy = { ...s };
                      delete copy[index];
                      return copy;
                    });
                  }}
                >
                  {suggestions[index]}
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              {...register(`experience.${index}.company`)}
              placeholder="e.g. Google, DataVerse"
              className="input-premium py-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2.5">
            <Controller
              control={control}
              name={`experience.${index}.startDate`}
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
              name={`experience.${index}.endDate`}
              rules={{
                validate: (value) => {
                  const startDate = watch(`experience.${index}.startDate`);
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

        <div className="space-y-4">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
            Job Duties & Key Achievements
          </label>
          <div className="relative">
            <textarea
              {...register(`experience.${index}.responsibilities`)}
              placeholder="Describe what you did... One bullet point per line."
              className="input-premium min-h-[12rem] py-4 resize-none leading-relaxed text-sm"
              defaultValue={
                Array.isArray(currentResume?.experience?.[index]?.responsibilities)
                  ? currentResume.experience[index].responsibilities.join("\n")
                  : ""
              }
            />
            <div className="flex justify-between items-center mt-3 px-2">
              <p className="text-[9px] text-text-muted/60 font-bold italic">
                Press Enter for new bullet point
              </p>
              <span className={`text-[9px] font-black tracking-widest ${(watch(`experience.${index}.responsibilities`)?.length || 0) >= 1800 ? "text-orange-500" : "text-text-muted"}`}>
                {watch(`experience.${index}.responsibilities`)?.length || 0} / 2000
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setEditingId(null)}
        className="w-full py-5 bg-foreground/10 text-text-main rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-foreground/20 transition-all flex items-center justify-center gap-2"
      >
        Return to Experience List
      </button>
    </div>
  );
};

export default ExperienceForm;
