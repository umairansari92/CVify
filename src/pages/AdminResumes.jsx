import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaFileAlt, FaTrash, FaEye, FaSearch, FaUser, FaSnowflake, FaBan } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      // For global monitoring, we might need a general GET /api/admin/resumes
      // But since I only implemented getUserResumes, I'll update the controller to support global list
      const res = await api.get("/admin/resumes");
      setResumes(res.data);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "This will permanently remove this user content.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin/resumes/${id}`);
        setResumes(prev => prev.filter(r => r._id !== id));
        Swal.fire("Deleted!", "Resume has been removed.", "success");
      } catch (err) { /* handled */ }
    }
  };

  const handleUserAction = async (userId, action, currentStatus) => {
    const isBan = action === "ban";
    const result = await Swal.fire({
      title: `${isBan ? (currentStatus ? "Unban" : "Ban") : (currentStatus ? "Unfreeze" : "Freeze")} User?`,
      text: `Are you sure you want to ${action} this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (result.isConfirmed) {
      try {
        const endpoint = isBan ? `/admin/users/${userId}/ban` : `/admin/users/${userId}/freeze`;
        const res = await api.put(endpoint);
        
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
        
        setResumes(prev => prev.map(r => {
          if (r.user?._id === userId) {
            return {
              ...r,
              user: {
                ...r.user,
                isBlocked: isBan ? !currentStatus : r.user.isBlocked,
                isFrozen: !isBan ? !currentStatus : r.user.isFrozen
              }
            };
          }
          return r;
        }));
      } catch (err) {
        /* handled */
      }
    }
  };

  const filteredResumes = resumes.filter(r => 
    r.personalInfo?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-text-primary tracking-tight">Resume Monitoring</h1>
            <p className="text-text-muted font-bold mt-1">Audit and moderate user-generated resumes</p>
          </div>
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-40" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text-primary font-bold focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 premium-card animate-pulse bg-white/5" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map(r => (
              <div key={r._id} className="premium-card p-6 flex flex-col group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                    <FaFileAlt className="text-xl" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => window.open(`/public/${r.user?.username}`, '_blank')} className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all"><FaEye /></button>
                    <button onClick={() => handleDelete(r._id)} className="w-9 h-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><FaTrash /></button>
                  </div>
                </div>

                <h3 className="font-black text-text-secondary text-lg line-clamp-1">{r.personalInfo?.fullName || "Untitled Resume"}</h3>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1 mb-6">{r.templateId}</p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-text-primary leading-none mb-1">@{r.user?.username}</span>
                      <span className="text-[9px] font-bold text-text-muted leading-none">Creator</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleUserAction(r.user?._id, "freeze", r.user?.isFrozen)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${r.user?.isFrozen ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white'}`}
                      title={r.user?.isFrozen ? "Unfreeze User" : "Freeze User"}
                    >
                      <FaSnowflake className="text-[10px]" />
                    </button>
                    <button 
                      onClick={() => handleUserAction(r.user?._id, "ban", r.user?.isBlocked)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${r.user?.isBlocked ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                      title={r.user?.isBlocked ? "Unban User" : "Ban User"}
                    >
                      <FaBan className="text-[10px]" />
                    </button>
                  </div>
                  <span className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-tighter">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredResumes.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <FaFileAlt className="text-6xl mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">No resumes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResumes;
