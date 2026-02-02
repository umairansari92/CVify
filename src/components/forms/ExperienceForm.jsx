import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const { register, control, watch } = useForm({
    defaultValues: {
      experience: currentResume?.experience || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const transformedExperience = value.experience?.map((exp) => ({
        ...exp,
        responsibilities:
          typeof exp.responsibilities === "string"
            ? exp.responsibilities.split("\n")
            : exp.responsibilities,
      }));

      dispatch(
        setResumeField({ field: "experience", value: transformedExperience }),
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative group p-8 rounded-[2rem] bg-slate-50/50 dark:bg-midnight/30 border-2 border-slate-100 dark:border-slate-800/50 space-y-8 transition-all duration-300 hover:border-action/20 dark:hover:border-accent/20"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[10px] font-black text-action dark:text-accent uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-6 h-px bg-action/20 dark:bg-accent/20"></span>
              Experience Entry #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
              title="Remove Experience"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`experience.${index}.position`)}
                placeholder="e.g. Software Engineer"
                className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-blue/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
              />
              <p className="text-[10px] text-slate-400 font-medium italic ml-1">
                Your official job title.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`experience.${index}.company`)}
                placeholder="e.g. Google"
                className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-blue/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
              />
              <p className="text-[10px] text-slate-400 font-medium italic ml-1">
                Company where you worked.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
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
              <p className="text-[10px] text-slate-400 font-medium italic ml-1">
                When you embarked on this role.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name={`experience.${index}.endDate`}
                render={({ field }) => (
                  <DateRangePicker
                    label="End Period *"
                    value={field.value}
                    onChange={field.onChange}
                    isPresentAllowed={true}
                  />
                )}
              />
              <p className="text-[10px] text-slate-400 font-medium italic ml-1">
                When you concluded or select "Present".
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
              Impact & Responsibilities
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
                placeholder="Describe your wins (one per line)..."
                className="w-full px-5 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] bg-white dark:bg-slate-blue/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 h-40 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all resize-none font-semibold leading-relaxed shadow-sm"
              />
              <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-[10px] text-slate-400 font-medium italic">
                  Use line breaks for bullet points in the preview.
                </p>
                <span
                  className={`text-[10px] font-black tracking-widest ${(watch(`experience.${index}.responsibilities`)?.length || 0) >= 450 ? "text-orange-500" : "text-slate-400"}`}
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
        className="group w-full px-8 py-5 bg-white dark:bg-slate-blue/30 text-action dark:text-accent rounded-[2rem] hover:bg-slate-50 dark:hover:bg-midnight/50 transition-all font-black uppercase tracking-widest border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1"
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform">
          +
        </span>
        <span>Add Professional Experience</span>
      </button>
    </div>
  );
};

export default ExperienceForm;
