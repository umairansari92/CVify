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
    <form className="space-y-10 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fullName")}
            placeholder="e.g. John Doe"
            className="input-premium"
          />
          <p className="text-[10px] text-text-muted/60 font-bold italic ml-2">
            Your legal name as it should appear on the CV.
          </p>
          {errors.fullName && (
            <p className="text-red-500 text-[10px] font-black ml-2 animate-fadeIn">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("jobTitle")}
            placeholder="e.g. Sales Manager, Office Administrator"
            className="input-premium"
          />
          <p className="text-[10px] text-text-muted/60 font-bold italic ml-2">
            The role you are currently in or applying for.
          </p>
          {errors.jobTitle && (
            <p className="text-red-500 text-[10px] font-black ml-2 animate-fadeIn">
              {errors.jobTitle.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
            Location
          </label>
          <input
            {...register("location")}
            placeholder="e.g. New York, USA"
            className="input-premium"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            placeholder="+1 234 567 890"
            className="input-premium"
          />
          {errors.phone && (
            <p className="text-red-500 text-[10px] font-black ml-2 animate-fadeIn">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            placeholder="john@example.com"
            className="input-premium"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-black ml-2 animate-fadeIn">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-8 pt-6">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4">
          Professional Links
          <span className="flex-1 h-px bg-border-subtle"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-3">
            <input
              {...register("linkedin")}
              placeholder="LinkedIn URL"
              className="input-premium"
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              {...register("github")}
              placeholder="e.g. Work Portfolio or Digital Profile"
              className="input-premium"
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              {...register("portfolio")}
              placeholder="Portfolio URL"
              className="input-premium"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
          Professional Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("profileSummary")}
          placeholder="e.g. Dedicated professional with over 5 years of experience in office management, known for efficiency and strong organization skills..."
          maxLength={500}
          className="input-premium h-44 resize-none leading-relaxed"
        />
        <div className="flex justify-between items-center px-2">
          <p className="text-[10px] text-text-muted/60 font-bold italic">
            Focus on your top achievements and unique skills and experience.
          </p>
          <span
            className={`text-[10px] font-black tracking-widest ${(watch("profileSummary")?.length || 0) >= 450 ? "text-orange-500" : "text-text-muted"}`}
          >
            {watch("profileSummary")?.length || 0} / 500
          </span>
        </div>
        {errors.profileSummary && (
          <p className="text-red-500 text-[10px] font-black ml-2 animate-fadeIn">
            {errors.profileSummary.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default PersonalInfoForm;
