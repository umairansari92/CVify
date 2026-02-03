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
import ThreeBackground from "../components/three/ThreeBackground";
import Swal from "react-sweetalert2";
import { TypeAnimation } from "react-type-animation";

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
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "This action cannot be undone. Your resume will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: {
        popup: "glass",
        confirmButton: "btn-primary",
        cancelButton: "btn-secondary",
      },
    });

    if (result.isConfirmed) {
      await dispatch(deleteResume(id));
      Swal.fire({
        title: "Deleted!",
        text: "Your resume has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: {
          popup: "glass",
        },
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleClone = async (id, e) => {
    e.stopPropagation();
    const result = await dispatch(cloneResume(id));
    if (result.type.includes("fulfilled")) {
      Swal.fire({
        title: "Cloned!",
        text: "Resume has been duplicated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: {
          popup: "glass",
        },
      });
    }
  };

  const handleCreateNew = () => {
    dispatch(clearCurrentResume());
    navigate("/create");
  };

  return (
    <div className="min-h-screen relative bg-mesh p-6 md:p-12 transition-colors duration-300">
      <ThreeBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-8 animate-fadeIn">
          <div className="w-full md:w-auto">
            <h1 className="text-5xl text-gradient font-extrabold tracking-tight flex items-center gap-4">
              Welcome to Your Dashboard
              <span className="text-xs font-black text-primary bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20 shadow-sm animate-float">
                {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"}
              </span>
            </h1>

            <p className="text-text-muted mt-4 font-bold text-lg max-w-lg leading-relaxed">
              <TypeAnimation
                sequence={[
                  "Elevate your career with precision-crafted, high-impact resumes.",
                  3000,
                  "Build professional resumes that get you noticed.",
                  3000,
                  "Transform your career story into compelling narratives.",
                  3000,
                ]}
                wrapper="span"
                speed={60}
                repeat={Infinity}
              />
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleCreateNew}
              className="btn-primary flex items-center gap-3 px-10 py-4 text-lg"
            >
              <FiPlus className="text-2xl" />
              <span>Create New CV</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-12 p-6 glass border-l-8 border-red-500 rounded-3xl flex justify-between items-center shadow-xl animate-shake">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🚀</span>
              <div>
                <p className="font-black text-primary uppercase text-xs tracking-[0.2em] mb-1">
                  System Notice
                </p>
                <p className="font-bold text-text-primary text-lg">{error}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(getMyResumes())}
              className="btn-glass text-primary hover:scale-105"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Resumes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-95 glass rounded-[3rem] animate-pulse"
              ></div>
            ))}
          </div>
        ) : resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="premium-card group h-full flex flex-col p-8 bg-white/40 dark:bg-surface border-white/40 dark:border-white/5"
              >
                {/* Visual Header */}
                  <div className="relative mb-8 aspect-16/6 bg-linear-to-br from-primary/10 to-accent/10 rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-mesh opacity-30"></div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-xl border border-white/20 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {resume.templateId || "Modern"}
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-text-primary leading-tight mb-2 truncate max-w-55">
                        {resume.personalInfo?.fullName || "Untitled Resume"}
                      </h3>
                      <p className="text-xs font-black text-primary uppercase tracking-[0.15em] opacity-80 mb-4">
                        {resume.personalInfo?.jobTitle || "Resume Builder"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-text-secondary font-bold mb-8">
                    <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <FiEdit2 size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest opacity-50">
                        Last Modified
                      </span>
                      <span>
                        {new Date(resume.updatedAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleEdit(resume._id)}
                      className="btn-primary px-0! bg-primary/10 text-black! border border-primary/20 hover:bg-primary hover:text-white! flex items-center justify-center group/btn"
                    >
                      <FiEdit2 className="group-hover/btn:rotate-12 transition-transform" />
                      <span className="ml-2 hidden lg:block">Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDownloadPDF(resume, resume.templateId)
                      }
                      className="btn-primary px-0! bg-success/10 text-success! border border-success/20 hover:bg-success hover:text-white! flex items-center justify-center group/btn"
                    >
                      <FiDownload className="group-hover/btn:translate-y-1 transition-transform" />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleClone(resume._id, e)}
                        className="flex-1 btn-glass px-0! flex items-center justify-center hover:scale-110 active:scale-95"
                        title="Duplicate"
                      >
                        <FiCopy />
                      </button>
                      <button
                        onClick={(e) => handleDelete(resume._id, e)}
                        className="flex-1 btn-glass px-0! bg-red-500/10! text-red-500! border border-red-500/20! hover:bg-red-500! hover:text-white! flex items-center justify-center hover:scale-110 active:scale-95"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="premium-card p-24 text-center max-w-4xl mx-auto border-2 border-dashed border-primary/20 bg-primary/5">
            <div className="w-32 h-32 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-glow ring-4 ring-primary/5 group transition-all duration-500 hover:scale-110 hover:rotate-12">
              <FiPlus className="text-6xl" />
            </div>
            <h2 className="text-4xl font-black text-text-primary mb-6 tracking-tight">
              Create Your Career Masterpiece
            </h2>
            <p className="text-text-secondary mb-12 max-w-md mx-auto font-bold text-xl leading-relaxed opacity-70">
              Your dream job is waiting. Unleash your potential with CVify’s
              premium templates.
            </p>
            <button
              onClick={handleCreateNew}
              className="btn-primary px-16 py-5 text-xl font-black rounded-3xl"
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
