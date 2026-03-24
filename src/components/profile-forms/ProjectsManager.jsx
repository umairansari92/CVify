import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { FaLaptopCode, FaPlus, FaTrash, FaLink, FaGithub, FaEye, FaImage, FaCloudUploadAlt } from 'react-icons/fa';

const ProjectsManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [projects, setProjects] = useState(user?.projects || []);
  const [sectionName, setSectionName] = useState(user?.sectionNames?.projects || 'Selected Works');
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    if (user?.projects) setProjects(user.projects);
    if (user?.sectionNames?.projects) setSectionName(user.sectionNames.projects);
  }, [user]);

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", image: "", link: "", githubLink: "", tags: [], isFeatured: false },
    ]);
  };

  const updateProject = (idx, field, value) => {
    const newProjects = [...projects];
    newProjects[idx] = { ...newProjects[idx], [field]: value };
    setProjects(newProjects);
  };

  const deleteProject = (idx) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const handleImageUpload = async (idx, file) => {
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const fd = new FormData();
      fd.append("image", file);
      // Assuming a general upload endpoint exists or we use the specific project update logic from the old ProfilePage
      const res = await api.post("/upload/image", fd); // Adjust endpoint based on your backend
      if (res.data.url) {
        updateProject(idx, 'image', res.data.url);
        toast.success("Image uploaded!");
      }
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.patch("/auth/profile", { 
        projects, 
        sectionNames: { ...user.sectionNames, projects: sectionName } 
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("✅ Portfolio synchronized!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div className="space-y-1">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
                <FaLaptopCode size={20} className="text-cyan-500" />
                <input 
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0 w-full"
                />
            </h3>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">
                Showcase your most impactful builds and experiments.
            </p>
        </div>
        <button
          onClick={addProject}
          className="px-6 py-2 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 font-black text-[10px] uppercase tracking-widest rounded-full border border-cyan-500/20 transition-all flex items-center gap-2"
        >
          <FaPlus size={10} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((proj, idx) => (
          <div key={idx} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-6 hover:border-cyan-500/20 transition-all">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Project Image Preview/Upload */}
              <div className="md:w-64 h-48 rounded-3xl bg-gray-900 border border-white/5 overflow-hidden relative border-dashed flex flex-col items-center justify-center group-hover:border-cyan-500/30 transition-all">
                {proj.image ? (
                  <>
                    <img src={proj.image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                        onClick={() => updateProject(idx, 'image', '')}
                        className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-red-500 opacity-0 group-hover/img:opacity-100 transition-opacity"
                    >
                        <FaTrash size={12} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2 text-white/20 hover:text-cyan-500 transition-colors">
                    <FaCloudUploadAlt size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Cover</span>
                    <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => {
                            // Since a general upload endpoint might not exist, 
                            // we'll just allow URL input for now or use the file path if provided
                            // In a real scenario, this would trigger a file upload thunk
                            toast.info("Image upload requires a backend endpoint. Use URL for now.");
                        }} 
                    />
                  </label>
                )}
                {uploadingIdx === idx && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-cyan-400 animate-pulse">Uploading...</div>}
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <input 
                        value={proj.title}
                        onChange={(e) => updateProject(idx, 'title', e.target.value)}
                        placeholder="Project Title"
                        className="flex-1 bg-transparent text-lg font-black text-white outline-none focus:border-b border-cyan-500/30"
                    />
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            checked={proj.isFeatured} 
                            onChange={(e) => updateProject(idx, 'isFeatured', e.target.checked)}
                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-600 focus:ring-0"
                        />
                        <label className="text-[9px] font-black uppercase text-white/40">Featured</label>
                    </div>
                </div>

                <textarea 
                    value={proj.description}
                    onChange={(e) => updateProject(idx, 'description', e.target.value)}
                    placeholder="Short description of the technical challenge and solution..."
                    className="w-full bg-transparent text-sm text-white/40 h-24 resize-none outline-none leading-relaxed"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                        <FaImage className="text-white/20" size={12} />
                        <input value={proj.image} onChange={(e) => updateProject(idx, 'image', e.target.value)} placeholder="Image URL" className="bg-transparent text-[10px] text-white/60 outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                        <FaLink className="text-white/20" size={12} />
                        <input value={proj.link} onChange={(e) => updateProject(idx, 'link', e.target.value)} placeholder="Live Demo" className="bg-transparent text-[10px] text-white/60 outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                        <FaGithub className="text-white/20" size={12} />
                        <input value={proj.githubLink} onChange={(e) => updateProject(idx, 'githubLink', e.target.value)} placeholder="Source Code" className="bg-transparent text-[10px] text-white/60 outline-none w-full" />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex-1 mr-6">
                        <input 
                            value={proj.tags?.join(", ")}
                            onChange={(e) => updateProject(idx, 'tags', e.target.value.split(",").map(t => t.trim()))}
                            placeholder="Tags (e.g. React, Node.js, AI)"
                            className="w-full bg-white/5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-500 border border-white/5 focus:border-cyan-500/20"
                        />
                    </div>
                    <button
                        onClick={() => deleteProject(idx)}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-white/5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? "Syncing Portfolio..." : "Save Works"}
        </button>
      </div>
    </div>
  );
};

export default ProjectsManager;
