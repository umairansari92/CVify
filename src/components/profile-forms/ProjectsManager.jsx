import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaProjectDiagram, FaPlus, FaTrash, FaExternalLinkAlt, FaGithub, FaCloudUploadAlt, FaImage } from 'react-icons/fa';
import { projectSchema } from '../../utils/validationSchemas';

const projectsArraySchema = yup.object().shape({
  projects: yup.array().of(projectSchema),
  sectionName: yup.string().required(),
});

const ProjectsManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [saving, setSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState({}); // Tracking files per index

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(projectsArraySchema),
    defaultValues: {
      projects: user?.projects || [],
      sectionName: user?.sectionNames?.projects || 'Featured Projects',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    if (user) {
      reset({
        projects: user.projects || [],
        sectionName: user.sectionNames?.projects || 'Featured Projects',
      });
    }
  }, [user, reset]);

  const handleImageChange = (idx, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB per project image");
      setImageFiles({ ...imageFiles, [idx]: file });
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Note: This implementation assumes the backend can handle the array of projects.
      // For images, we would ideally need a specialized multi-part upload strategy.
      // For now, we sync the text data first, and then handle images if any were added.
      
      const payload = {
        projects: data.projects,
        sectionNames: { ...user.sectionNames, projects: data.sectionName }
      };

      // Handle image uploads if files exist
      const updatedProjects = [...data.projects];
      for (const [idx, file] of Object.entries(imageFiles)) {
        const fd = new FormData();
        fd.append("image", file);
        // Assuming a specific endpoint for project image upload or we handle it in-line
        try {
            const imgRes = await api.post(`/auth/profile/projects/${idx}/image`, fd);
            if (imgRes.data.imageUrl) {
                updatedProjects[idx].image = imgRes.data.imageUrl;
            }
        } catch (imgErr) {
            console.error(`Failed to upload image for project ${idx}`, imgErr);
        }
      }

      const res = await api.patch("/auth/profile", { ...payload, projects: updatedProjects });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        setImageFiles({});
        toast.success("🚀 Projects synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div className="space-y-1">
            <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                <FaProjectDiagram className="text-primary" /> 
                <input 
                    {...register('sectionName')}
                    className="bg-transparent border-none outline-none focus:ring-0 w-64 text-text-main placeholder-text-muted/20"
                />
            </h3>
            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                Showcase your best work. High-resolution images and clear narratives.
            </p>
        </div>
        <button
          type="button"
          onClick={() => append({ title: '', description: '', link: '', github: '', tech: '', image: '' })}
          className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-black text-[10px] uppercase tracking-widest rounded-full border border-primary/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {fields.map((field, idx) => (
          <div key={field.id} className="group relative bg-midground border border-border-subtle rounded-[3rem] overflow-hidden flex flex-col hover:border-primary/20 transition-all shadow-sm">
            <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute right-6 top-6 z-10 p-2 bg-background/80 text-text-muted opacity-40 hover:text-red-500 rounded-full transition-all"
            >
                <FaTrash size={12} />
            </button>

            {/* Project Image Preview/Upload */}
            <div 
                className="h-56 bg-foreground/10 relative flex items-center justify-center group/img overflow-hidden cursor-pointer"
                onClick={() => document.getElementById(`project-img-${idx}`).click()}
            >
                {imageFiles[idx] || field.image ? (
                    <img 
                        src={imageFiles[idx] ? URL.createObjectURL(imageFiles[idx]) : field.image} 
                        alt="Project" 
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-700" 
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-text-muted opacity-10 uppercase font-black text-[10px] tracking-[0.3em]">
                        <FaImage size={40} />
                        Upload Visual
                    </div>
                )}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <FaCloudUploadAlt className="text-white text-3xl" />
                </div>
                <input 
                    id={`project-img-${idx}`} 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageChange(idx, e)}
                />
            </div>

            <div className="p-8 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-text-muted opacity-40 ml-1">Project Title</label>
                        <input
                            {...register(`projects.${idx}.title`)}
                            placeholder="e.g. AI SaaS Platform"
                            className="w-full bg-transparent border-none p-0 text-text-main focus:ring-0 font-black text-xl placeholder-text-muted/20"
                        />
                        {errors.projects?.[idx]?.title && <p className="text-red-500 text-[8px] font-black uppercase ml-1">{errors.projects[idx].title.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-text-muted opacity-40 ml-1">Core Tech Stack</label>
                        <input
                            {...register(`projects.${idx}.tech`)}
                            placeholder="React, Node.js, OpenAI..."
                            className="w-full bg-transparent border-none p-0 text-primary focus:ring-0 font-bold text-xs placeholder-text-muted/20 uppercase tracking-widest"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted opacity-40 ml-1">System Narrative / Description</label>
                    <textarea
                        {...register(`projects.${idx}.description`)}
                        placeholder="Explain the problem, solution, and high-impact result..."
                        className="w-full bg-foreground/10 border border-border-subtle rounded-2xl p-4 text-text-main/70 focus:border-primary/50 outline-none transition-all font-medium text-xs h-32 resize-none leading-relaxed"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-text-muted opacity-40 ml-1 flex items-center gap-2">
                            <FaExternalLinkAlt size={8} /> Live URL
                        </label>
                        <input
                            {...register(`projects.${idx}.link`)}
                            className="w-full bg-foreground/10 border border-border-subtle rounded-xl px-4 py-2.5 text-text-main/60 focus:border-primary/50 outline-none transition-all font-semibold text-[10px]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-text-muted opacity-40 ml-1 flex items-center gap-2">
                            <FaGithub size={10} /> Source
                        </label>
                        <input
                            {...register(`projects.${idx}.github`)}
                            className="w-full bg-foreground/10 border border-border-subtle rounded-xl px-4 py-2.5 text-text-main/60 focus:border-primary/50 outline-none transition-all font-semibold text-[10px]"
                        />
                    </div>
                </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border-subtle rounded-[4rem] opacity-50">
                <p className="text-text-muted font-black uppercase tracking-widest italic leading-loose"> No projects deployed. Add your first masterpiece. </p>
            </div>
        )}
      </div>

      <div className="pt-8 border-t border-border-subtle">
        <button
          type="submit"
          disabled={saving || (!isDirty && Object.keys(imageFiles).length === 0)}
          className="px-12 py-5 bg-primary hover:bg-primary/80 text-white font-black text-xs uppercase tracking-[0.2em] rounded-3xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {saving ? "Deploying Showcase..." : "Synchronize Portfolio"}
        </button>
      </div>
    </form>
  );
};

export default ProjectsManager;
