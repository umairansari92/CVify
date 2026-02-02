import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  getMyResumes,
  deleteResume,
  cloneResume,
} from "../features/resume/resumeThunk";
import { clearCurrentResume } from "../features/resume/resumeSlice";
import { handleDownloadPDF } from "../utils/pdfExport";
import {
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiEye,
  FiPlus,
  FiCopy,
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resumes, loading, error } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getMyResumes());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to delete this resume? This action cannot be undone.",
      )
    ) {
      await dispatch(deleteResume(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleClone = async (id, e) => {
    e.stopPropagation();
    await dispatch(cloneResume(id));
  };

  const handleCreateNew = () => {
    dispatch(clearCurrentResume());
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-slate-soft dark:bg-midnight p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl font-bold text-primary dark:text-slate-50 dark:font-jakarta tracking-tight flex items-baseline gap-3">
              My Workspace
              <span className="text-base font-medium text-slate-400 bg-white dark:bg-slate-blue/50 px-4 py-1.5 rounded-full border border-slate-200/50 dark:border-white/5 shadow-sm">
                {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"}
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium max-w-md">
              Your professional journey, managed with precision and style.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleCreateNew}
              className="group flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3.5 bg-action hover:bg-blue-600 text-white rounded-2xl shadow-premium hover:shadow-action/40 transition-all font-bold active:scale-95 glow-btn"
            >
              <FiPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
              <span>Create New CV</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3.5 bg-white dark:bg-slate-blue text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-midnight transition-all font-semibold shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-2xl flex justify-between items-center shadow-lg animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span className="font-semibold">Error: {error}</span>
            </div>
            <button
              onClick={() => dispatch(getMyResumes())}
              className="text-sm bg-white dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 px-5 py-2 rounded-xl transition-all font-bold border border-red-200 dark:border-red-900/50"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Resumes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-white/50 dark:bg-slate-blue/30 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="group relative bg-white dark:bg-slate-blue rounded-[2rem] shadow-premium hover:shadow-2xl hover:-translate-y-2 border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-500"
              >
                {/* Status Bar */}
                <div className="h-3 bg-gradient-to-r from-action to-accent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-primary dark:text-slate-50 dark:font-jakarta mb-1 truncate max-w-[200px]">
                        {resume.personalInfo?.fullName || "Legacy CV"}
                      </h3>
                      <p className="text-sm text-action dark:text-accent font-bold uppercase tracking-wider">
                        {resume.personalInfo?.jobTitle || "Growth Specialist"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 dark:bg-midnight/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5 shadow-inner mb-2">
                        {resume.templateId || "Modern"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    Ready for export •{" "}
                    {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-5 gap-2 pt-6 border-t border-slate-100 dark:border-white/5">
                    <button
                      onClick={() => handleEdit(resume._id)}
                      title="Edit Resume"
                      className="p-3 text-action hover:bg-action hover:text-white dark:hover:bg-accent dark:hover:text-primary rounded-xl transition-all duration-300 border border-slate-50 dark:border-white/5 flex items-center justify-center active:scale-90"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(resume._id)}
                      title="Quick Preview"
                      className="p-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-midnight rounded-xl transition-all duration-300 border border-slate-50 dark:border-white/5 flex items-center justify-center active:scale-90"
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      onClick={(e) => handleClone(resume._id, e)}
                      title="Duplicate Resume"
                      className="p-3 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-xl transition-all duration-300 border border-slate-50 dark:border-white/5 flex items-center justify-center active:scale-90"
                    >
                      <FiCopy size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleDownloadPDF(resume, resume.templateId)
                      }
                      title="Download PDF"
                      className="p-3 text-success hover:bg-success hover:text-white rounded-xl transition-all duration-300 border border-slate-50 dark:border-white/5 flex items-center justify-center active:scale-90"
                    >
                      <FiDownload size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(resume._id, e)}
                      title="Delete Forever"
                      className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-slate-50 dark:border-white/5 flex items-center justify-center active:scale-90"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/70 dark:bg-slate-blue/30 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10 p-20 text-center animate-fadeIn shadow-inner">
            <div className="w-24 h-24 bg-action/10 text-action dark:text-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow ring-8 ring-action/5">
              <FiPlus className="text-5xl" />
            </div>
            <h2 className="text-3xl font-bold text-primary dark:text-slate-50 dark:font-jakarta mb-4">
              You’re just one click away.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto font-medium text-lg leading-relaxed font-manrope">
              Our professional templates are waiting to showcase your expertise.
              Create your first CV in minutes.
            </p>
            <button
              onClick={handleCreateNew}
              className="px-12 py-4 bg-action hover:bg-blue-600 text-white rounded-2xl font-black text-lg shadow-premium shadow-action/40 hover:-translate-y-1 transition-all active:scale-95 glow-btn"
            >
              Start Building Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
