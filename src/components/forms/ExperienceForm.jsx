import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";
import { FiTrash2 } from "react-icons/fi";

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
    <div className="space-y-10 animate-fadeIn">
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
                render={({ field }) => (
                  <DateRangePicker
                    label="End Period *"
                    value={field.value}
                    onChange={field.onChange}
                    isPresentAllowed={true}
                  />
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
