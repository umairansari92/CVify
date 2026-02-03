import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";
import { FiTrash2 } from "react-icons/fi";

const ProjectsForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const { register, control, watch } = useForm({
    defaultValues: {
      projects: currentResume?.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const projectsCopy = value.projects
        ? JSON.parse(JSON.stringify(value.projects))
        : [];
      dispatch(
        setResumeField({
          field: "projects",
          value: projectsCopy,
        }),
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
              Project Entry #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-3 text-text-muted hover:text-red-500 transition-all rounded-xl hover:bg-red-500/10"
              title="Remove Project"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`projects.${index}.name`)}
                placeholder="e.g. CVify Explorer"
                className="input-premium"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                Access Link (Optional)
              </label>
              <input
                {...register(`projects.${index}.link`)}
                placeholder="e.g. github.com/user/cvify"
                className="input-premium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name={`projects.${index}.startDate`}
                render={({ field }) => (
                  <DateRangePicker
                    label="Project Inception *"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name={`projects.${index}.endDate`}
                render={({ field }) => (
                  <DateRangePicker
                    label="Project Conclusion *"
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
              Project Brief
            </label>
            <div className="relative">
              <textarea
                {...register(`projects.${index}.description.0`)}
                maxLength={500}
                placeholder="Detail the tech stack and your primary contributions..."
                className="input-premium h-44 resize-none leading-relaxed"
              />
              <div className="flex justify-between items-center mt-3 px-2">
                <p className="text-[10px] text-text-muted/60 font-bold italic">
                  Keep it concise and impact-oriented.
                </p>
                <span
                  className={`text-[10px] font-black tracking-widest ${(watch(`projects.${index}.description.0`)?.length || 0) >= 450 ? "text-orange-500" : "text-text-muted"}`}
                >
                  {watch(`projects.${index}.description.0`)?.length || 0} / 500
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
            name: "",
            link: "",
            description: [""],
            startDate: `Jan ${defaultYear}`,
            endDate: "Present",
          });
        }}
        className="group w-full px-8 py-6 bg-foreground/10 text-primary rounded-[2rem] hover:bg-primary/10 transition-all font-black uppercase tracking-[0.25em] border-2 border-dashed border-primary/20 flex items-center justify-center gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1"
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform">
          +
        </span>
        <span>Register New Project</span>
      </button>
    </div>
  );
};

export default ProjectsForm;
