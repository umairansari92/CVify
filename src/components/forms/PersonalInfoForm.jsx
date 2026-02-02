import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";

const schema = yup.object({
  fullName: yup.string().required("Full Name is essential for your CV"),
  jobTitle: yup.string().required("Target job title is required"),
  location: yup.string().optional(),
  phone: yup.string().required("Phone number is required for contact"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required for communication")
    .transform((value) => (value === "" ? null : value))
    .nullable(),
  linkedin: yup.string().optional(),
  github: yup.string().optional(),
  portfolio: yup.string().optional(),
  profileSummary: yup.string().required("A brief summary helps you stand out"),
});

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: currentResume?.personalInfo || {},
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(setResumeField({ field: "personalInfo", value: { ...value } }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <form className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fullName")}
            placeholder="e.g. John Doe"
            className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
          />
          <p className="text-[10px] text-slate-400 font-medium italic ml-1">
            Your legal name as it should appear on the CV.
          </p>
          {errors.fullName && (
            <p className="text-red-500 text-[10px] font-bold ml-1 animate-fadeIn">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("jobTitle")}
            placeholder="e.g. Senior Frontend Developer"
            className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
          />
          <p className="text-[10px] text-slate-400 font-medium italic ml-1">
            The role you are currently in or applying for.
          </p>
          {errors.jobTitle && (
            <p className="text-red-500 text-[10px] font-bold ml-1 animate-fadeIn">
              {errors.jobTitle.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
            Location
          </label>
          <input
            {...register("location")}
            placeholder="e.g. New York, USA"
            className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
          />
          <p className="text-[10px] text-slate-400 font-medium italic ml-1">
            City and Country is usually enough.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            placeholder="+1 234 567 890"
            className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
          />
          <p className="text-[10px] text-slate-400 font-medium italic ml-1">
            Include country code for international reach.
          </p>
          {errors.phone && (
            <p className="text-red-500 text-[10px] font-bold ml-1 animate-fadeIn">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            placeholder="john@example.com"
            className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
          />
          <p className="text-[10px] text-slate-400 font-medium italic ml-1">
            Use a professional email address.
          </p>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold ml-1 animate-fadeIn">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h3 className="text-xs font-black text-action dark:text-accent uppercase tracking-[0.2em] flex items-center gap-3">
          Social Presence
          <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <input
              {...register("linkedin")}
              placeholder="LinkedIn Profile URL"
              className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              {...register("github")}
              placeholder="GitHub Profile URL"
              className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              {...register("portfolio")}
              placeholder="Portfolio URL"
              className="w-full px-5 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
          Professional Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("profileSummary")}
          placeholder="e.g. Passionate developer with 5+ years of experience..."
          maxLength={500}
          className="w-full px-5 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 h-40 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all resize-none font-semibold leading-relaxed"
        />
        <div className="flex justify-between items-center px-1">
          <p className="text-[10px] text-slate-400 font-medium italic">
            Focus on your top achievements and unique value proposition.
          </p>
          <span
            className={`text-[10px] font-black tracking-widest ${(watch("profileSummary")?.length || 0) >= 450 ? "text-orange-500" : "text-slate-400"}`}
          >
            {watch("profileSummary")?.length || 0} / 500
          </span>
        </div>
        {errors.profileSummary && (
          <p className="text-red-500 text-[10px] font-bold ml-1 animate-fadeIn">
            {errors.profileSummary.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default PersonalInfoForm;
