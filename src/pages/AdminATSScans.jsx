import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaSearchPlus, FaSearch, FaUser, FaChartLine, FaCheckCircle, FaTrash, FaBan, FaSnowflake } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminATSScans = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const res = await api.get("/admin/ats-scans");
      setScans(res.data);
    } catch (err) {
      console.error("Failed to fetch scans:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScan = async (id) => {
    const result = await Swal.fire({
      title: "Delete ATS Scan?",
      text: "This record will be removed permanently.",
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
        await api.delete(`/admin/ats-scans/${id}`);
        setScans((prev) => prev.filter((s) => s._id !== id));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Scan record deleted",
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        /* handled */
      }
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
        
        // Refresh scans to show updated user status if we were showing it
        // Or just show success toast
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
        
        // Update local state if needed (though user status is nested in scan.user)
        setScans(prev => prev.map(s => {
          if (s.user?._id === userId) {
            return {
              ...s,
              user: {
                ...s.user,
                isBlocked: isBan ? !currentStatus : s.user.isBlocked,
                isFrozen: !isBan ? !currentStatus : s.user.isFrozen
              }
            };
          }
          return s;
        }));
      } catch (err) {
        /* handled */
      }
    }
  };

  const filteredScans = scans.filter(s => 
    s.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
    s.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
    s.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">ATS Scan Monitoring</h1>
            <p className="text-text-muted font-bold mt-1">Review AI analysis and job matching activities</p>
          </div>
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-40" />
            <input
              type="text"
              placeholder="Search by job or user..."
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
            {filteredScans.map(s => (
              <div key={s._id} className="premium-card p-8 flex flex-col group hover:border-primary/30 transition-all border-l-4 border-l-purple-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/5">
                    <FaSearchPlus className="text-2xl" />
                  </div>
                  <div className="flex gap-2">
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      (s.score?.overall || 0) >= 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                    }`}>
                      {s.score?.overall || 0}% Match
                    </div>
                    <button 
                      onClick={() => handleDeleteScan(s._id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                   <h3 className="font-black text-xl line-clamp-1 mb-1">{s.jobTitle || "Custom Scan"}</h3>
                   <div className="flex items-center gap-2 text-text-muted">
                      <FaChartLine className="text-[10px]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Analysis Performed</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Status</p>
                        <div className="flex items-center gap-2 text-emerald-400">
                            <FaCheckCircle className="text-[10px]" />
                            <span className="text-[11px] font-black">Scanned</span>
                        </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Complexity</p>
                        <div className="flex items-center gap-2 text-blue-400">
                            <FaSearchPlus className="text-[10px]" />
                            <span className="text-[11px] font-black">High</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[11px] text-primary"><FaUser /></div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-text-primary leading-none mb-1">@{s.user?.username}</span>
                        <span className="text-[9px] font-bold text-text-muted leading-none">User Analysis</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleUserAction(s.user?._id, "freeze", s.user?.isFrozen)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${s.user?.isFrozen ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white'}`}
                      title={s.user?.isFrozen ? "Unfreeze User" : "Freeze User"}
                    >
                      <FaSnowflake className="text-[10px]" />
                    </button>
                    <button 
                      onClick={() => handleUserAction(s.user?._id, "ban", s.user?.isBlocked)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${s.user?.isBlocked ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                      title={s.user?.isBlocked ? "Unban User" : "Ban User"}
                    >
                      <FaBan className="text-[10px]" />
                    </button>
                  </div>
                  <span className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-tighter">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredScans.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <FaSearchPlus className="text-6xl mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">No ATS scans found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminATSScans;
