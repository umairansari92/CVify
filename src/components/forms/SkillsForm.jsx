import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";

const InputGroup = ({ label, name, register, height = "h-24", hint }) => (
  <div className="flex flex-col gap-3">
    <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
      {label}
    </label>
    <textarea
      {...register(name)}
      placeholder="e.g. Skill 1, Skill 2, Skill 3..."
      className={`input-premium resize-none leading-relaxed ${height}`}
    />
    {hint && (
      <p className="text-[10px] text-text-muted/60 font-bold italic ml-2">
        {hint}
      </p>
    )}
  </div>
);

const SkillsForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  // Helper to safely join arrays
  const join = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");

  const { register, watch } = useForm({
    defaultValues: {
      frontend: join(currentResume?.technicalSkills?.frontend),
      backend: join(currentResume?.technicalSkills?.backend),
      database: join(currentResume?.technicalSkills?.database),
      aiDevOps: join(currentResume?.technicalSkills?.aiDevOps),
      tools: join(currentResume?.technicalSkills?.tools),
      competencies: join(currentResume?.competencies),
      softwareProficiency: join(currentResume?.softwareProficiency),
      interests: join(currentResume?.interests),
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const split = (str) =>
        str
          ? str
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

      // Dispatch technicalSkills update
      dispatch(
        setResumeField({
          field: "technicalSkills",
          value: {
            frontend: split(value.frontend),
            backend: split(value.backend),
            database: split(value.database),
            aiDevOps: split(value.aiDevOps),
            tools: split(value.tools),
          },
        }),
      );

      // Dispatch other independent fields
      dispatch(
        setResumeField({
          field: "competencies",
          value: split(value.competencies),
        }),
      );
      dispatch(
        setResumeField({
          field: "softwareProficiency",
          value: split(value.softwareProficiency),
        }),
      );
      dispatch(
        setResumeField({ field: "interests", value: split(value.interests) }),
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="space-y-6">
        <h3 className="text-xs font-black text-action dark:text-accent uppercase tracking-[0.2em] flex items-center gap-3">
          Technical Inventory
          <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputGroup
            label="Frontend Tech"
            name="frontend"
            register={register}
            hint="React, Next.js, Vue, Tailwind"
          />
          <InputGroup
            label="Backend Tech"
            name="backend"
            register={register}
            hint="Node.js, Go, Python, Java"
          />
          <InputGroup
            label="Cloud / DevOps"
            name="aiDevOps"
            register={register}
            hint="AWS, Docker, Kubernetes, CI/CD"
          />
          <InputGroup
            label="Data Systems"
            name="database"
            register={register}
            hint="PostgreSQL, MongoDB, GraphQL"
          />
        </div>
        <InputGroup
          label="Professional Utilities"
          name="tools"
          register={register}
          hint="Git, Figma, Jira, Postman, Linux"
          height="h-32"
        />
      </section>

      <section className="space-y-8">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4">
          Core Competencies
          <span className="flex-1 h-px bg-border-subtle"></span>
        </h3>
        <div className="space-y-10">
          <InputGroup
            label="Expertise & Soft Skills"
            name="competencies"
            register={register}
            hint="Agile, System Design, Mentorship, Public Speaking"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputGroup
              label="Tools & Software"
              name="softwareProficiency"
              register={register}
              hint="Office 365, Adobe CC, SAP, CRM"
            />
            <InputGroup
              label="Human Interests"
              name="interests"
              register={register}
              hint="Open Source, Chess, Traveling, Robotics"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsForm;
