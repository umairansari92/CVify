import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaEnvelopeOpenText, FaSearch, FaUser, FaRobot, FaCheckCircle, FaTrash, FaBan, FaSnowflake } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminCoverLetters = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const res = await api.get("/admin/cover-letters");
      setLetters(res.data);
    } catch (err) {
      console.error("Failed to fetch letters:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Letter?",
      text: "This will permanently remove this record.",
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
        await api.delete(`/admin/cover-letters/${id}`); // Path updated to admin endpoint
        setLetters(prev => prev.filter(l => l._id !== id));
        Swal.fire("Deleted!", "Cover letter removed.", "success");
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
        
        setLetters(prev => prev.map(l => {
          if (l.user?._id === userId) {
            return {
              ...l,
              user: {
                ...l.user,
                isBlocked: isBan ? !currentStatus : l.user.isBlocked,
                isFrozen: !isBan ? !currentStatus : l.user.isFrozen
              }
            };
          }
          return l;
        }));
      } catch (err) {
        /* handled */
      }
    }
  };

  const filteredLetters = letters.filter(l => 
    l.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
    l.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    l.user?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Cover Letter Audit</h1>
            <p className="text-text-muted font-bold mt-1">Monitor AI-generated and template-based letters</p>
          </div>
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-40" />
            <input
              type="text"
              placeholder="Search job or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text-primary font-bold focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 premium-card animate-pulse bg-white/5" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLetters.map(l => (
              <div key={l._id} className="premium-card p-8 flex flex-col group hover:border-primary/30 transition-all border-l-4 border-l-pink-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 shadow-lg shadow-pink-500/5">
                    <FaEnvelopeOpenText className="text-2xl" />
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    l.isAI ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {l.isAI ? 'AI Generated' : 'Template'}
                  </div>
                </div>

                <div className="mb-8">
                   <h3 className="font-black text-white text-xl line-clamp-1 mb-1">{l.jobTitle || "Job Application"}</h3>
                   <div className="flex items-center gap-2 text-text-muted">
                      <span className="text-[10px] font-black uppercase tracking-widest">{l.companyName || "N/A Company"}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Method</p>
                        <div className="flex items-center gap-2 text-blue-400">
                            {l.isAI ? <FaRobot className="text-[10px]" /> : <FaCheckCircle className="text-[10px]" />}
                            <span className="text-[11px] font-black">{l.isAI ? "AI Smart" : "Standard"}</span>
                        </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Tone</p>
                        <div className="flex items-center gap-2 text-primary">
                            <span className="text-[11px] font-black capitalize">{l.tone || "Professional"}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[11px] text-primary"><FaUser /></div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-text-primary leading-none mb-1">@{l.user?.username}</span>
                        <span className="text-[9px] font-bold text-text-muted leading-none">Applicant</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                      <button 
                        onClick={() => handleUserAction(l.user?._id, "freeze", l.user?.isFrozen)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${l.user?.isFrozen ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white'}`}
                        title={l.user?.isFrozen ? "Unfreeze User" : "Freeze User"}
                      >
                        <FaSnowflake className="text-[10px]" />
                      </button>
                      <button 
                        onClick={() => handleUserAction(l.user?._id, "ban", l.user?.isBlocked)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${l.user?.isBlocked ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                        title={l.user?.isBlocked ? "Unban User" : "Ban User"}
                      >
                        <FaBan className="text-[10px]" />
                      </button>
                    </div>
                    <button onClick={() => handleDelete(l._id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"><FaTrash className="text-xs" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredLetters.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <FaEnvelopeOpenText className="text-6xl mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">No cover letters found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoverLetters;
