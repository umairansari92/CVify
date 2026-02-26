import React, { useEffect } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";
import { FiTrash2, FiAlertCircle } from "react-icons/fi";
import { isValidDateRange } from "../../utils/dateUtils";

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experience: currentResume?.experience || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
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
    // add more as needed
  };

  // track suggestion messages per index
  const [suggestions, setSuggestions] = React.useState({});

  const summarizeOld = () => {
    const tenYearsAgo = new Date().getFullYear() - 10;
    const oldEx = watch("experience") || [];
    const remaining = [];
    const oldEntries = [];

    oldEx.forEach((exp) => {
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
        responsibilities: ["Summary of earlier experience (collapsed)"],
      });
    }

    // update form values directly, react-hook-form will trigger onChange
    remaining.forEach((exp, idx) => {
      Object.keys(exp).forEach((key) => {
        if (key === "responsibilities") return; // we handle separately
        const fieldName = `experience.${idx}.${key}`;
        control.setValue(fieldName, exp[key]);
      });
      if (exp.responsibilities) {
        control.setValue(
          `experience.${idx}.responsibilities`,
          exp.responsibilities.join("\n"),
        );
      }
    });
    // if there are more fields than remaining, remove extras
    for (let i = remaining.length; i < fields.length; i += 1) {
      remove(i);
    }
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
  }, [watch, dispatch, titleSuggestions, control, fields, remove]);

  // derive values for use within render
  const experienceValues = watch("experience") || [];
  const tenYearsAgo = new Date().getFullYear() - 10;
  const oldExists = experienceValues.some((exp) => {
    const year = parseInt(exp.startDate?.split(" ")[1]);
    return year && year < tenYearsAgo;
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {oldExists && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 text-yellow-800">
          You have experience entries older than 10 years.
          <button
            type="button"
            className="underline ml-2"
            onClick={summarizeOld}
          >
            Summarize them automatically
          </button>
        </div>
      )}
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative group p-10 rounded-[2.5rem] bg-foreground/10 border-2 border-border-subtle space-y-10 transition-all duration-500 hover:border-primary/20"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-px bg-primary/20"></span>
              Work Experience #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-3 text-text-muted hover:text-red-500 transition-all rounded-xl hover:bg-red-500/10"
              title="Remove Experience"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`experience.${index}.position`)}
                placeholder="e.g. Manager, Accountant, or Sales Assistant"
                className="input-premium"
              />
              {suggestions[index] && (
                <div className="text-xs text-yellow-600 mt-1">
                  Suggestion: use{" "}
                  <button
                    type="button"
                    className="underline"
                    onClick={() => {
                      const fieldName = `experience.${index}.position`;
                      control.setValue(fieldName, suggestions[index]);
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
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`experience.${index}.company`)}
                placeholder="e.g. ABC Corporation or Standard Bank"
                className="input-premium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name={`experience.${index}.startDate`}
                render={({ field }) => (
                  <DateRangePicker
                    label="Start Period *"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name={`experience.${index}.endDate`}
                rules={{
                  validate: (value) => {
                    const startDate = watch(`experience.${index}.startDate`);
                    return (
                      isValidDateRange(startDate, value) ||
                      "End date cannot be before start date"
                    );
                  },
                }}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <DateRangePicker
                      label="End Period *"
                      value={field.value}
                      onChange={field.onChange}
                      isPresentAllowed={true}
                    />
                    {fieldState.error && (
                      <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 ml-1 animate-fadeIn">
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
            <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
              Job Duties & Achievements
            </label>
            <div className="relative">
              <textarea
                {...register(`experience.${index}.responsibilities`)}
                defaultValue={
                  Array.isArray(
                    currentResume?.experience?.[index]?.responsibilities,
                  )
                    ? currentResume.experience[index].responsibilities.join(
                        "\n",
                      )
                    : ""
                }
                maxLength={500}
                placeholder="Describe your duties and achievements (one per line)..."
                className="input-premium h-44 resize-none leading-relaxed"
              />
              <div className="flex justify-between items-center mt-3 px-2">
                <p className="text-[10px] text-text-muted/60 font-bold italic">
                  Use line breaks for bullet points in the preview.
                </p>
                <span
                  className={`text-[10px] font-black tracking-widest ${(watch(`experience.${index}.responsibilities`)?.length || 0) >= 450 ? "text-orange-500" : "text-text-muted"}`}
                >
                  {watch(`experience.${index}.responsibilities`)?.length || 0} /
                  500
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          const defaultYear = new Date().getFullYear().toString();
          append({
            position: "",
            company: "",
            startDate: `Jan ${defaultYear}`,
            endDate: "Present",
            responsibilities: "",
          });
        }}
        className="group w-full px-8 py-6 bg-foreground/10 text-primary rounded-[2rem] hover:bg-primary/10 transition-all font-black uppercase tracking-[0.25em] border-2 border-dashed border-primary/20 flex items-center justify-center gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1"
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform">
          +
        </span>
        <span>Add Work Experience</span>
      </button>
    </div>
  );
};

export default ExperienceForm;
