import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import DateRangePicker from "../common/DateRangePicker";
import { FiTrash2 } from "react-icons/fi";

const EducationForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const { register, control, watch } = useForm({
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
              Education Details #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-3 text-text-muted hover:text-red-500 transition-all rounded-xl hover:bg-red-500/10"
              title="Remove Education"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                Degree / Certification <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`education.${index}.degree`)}
                placeholder="e.g. High School Diploma or Bachelor of Commerce"
                className="input-premium"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                {...register(`education.${index}.institution`)}
                placeholder="e.g. City High School or National University"
                className="input-premium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name={`education.${index}.startDate`}
                render={({ field }) => (
                  <DateRangePicker
                    label="Start Date *"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name={`education.${index}.endDate`}
                render={({ field }) => (
                  <DateRangePicker
                    label="End Date *"
                    value={field.value}
                    onChange={field.onChange}
                    isPresentAllowed={true}
                  />
                )}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          const defaultYear = new Date().getFullYear().toString();
          append({
            degree: "",
            institution: "",
            startDate: `Sep ${defaultYear}`,
            endDate: "Present",
          });
        }}
        className="group w-full px-8 py-6 bg-foreground/10 text-primary rounded-[2rem] hover:bg-primary/10 transition-all font-black uppercase tracking-[0.25em] border-2 border-dashed border-primary/20 flex items-center justify-center gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1"
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform">
          +
        </span>
        <span>Add Education</span>
      </button>
    </div>
  );
};

export default EducationForm;
