import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaHistory, FaSearch, FaUser, FaShieldAlt, FaTerminal, FaBug, FaInfoCircle, FaSearchPlus } from "react-icons/fa";
import AuditViewerModal from "../components/admin/AuditViewerModal";
import { AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";


const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedLog, setSelectedLog] = useState(null);


  useEffect(() => {
    fetchLogs();
  }, [page]);

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/admin/logs?page=${page}&limit=30`);
      setLogs(res.data.activities);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyIntegrity = async () => {
    setVerifying(true);
    try {
      const res = await api.get("/admin/logs/verify");
      if (res.data.isValid) {
        Swal.fire({
          icon: "success",
          title: "Chain Verified",
          text: res.data.message,
          background: "var(--midground)",
          color: "var(--text-main)",
          customClass: { popup: "glass" },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "TAMPERING DETECTED",
          text: res.data.message,
          footer: "Investigate immediately: Logs have been modified or deleted manually.",
          background: "var(--midground)",
          color: "var(--text-main)",
          customClass: { popup: "glass" },
        });
      }
    } catch (err) {
      Swal.fire("Scan Failed", err.response?.data?.message || "Integrity scan could not be completed.", "error");
    } finally {
      setVerifying(false);
    }
  };


  const getLogIcon = (action) => {
    if (action.includes('admin')) return <FaShieldAlt className="text-amber-400" />;
    if (action.includes('error')) return <FaBug className="text-red-400" />;
    return <FaInfoCircle className="text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-text-primary tracking-tight">Activity Logs</h1>
            <p className="text-text-muted font-bold mt-1">Platform-wide audit trail for users and administrators</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <button
              onClick={handleVerifyIntegrity}
              disabled={verifying}
              className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:bg-amber-500 hover:text-white transition-all disabled:opacity-50 group"
            >
              <FaShieldAlt className={`text-amber-400 group-hover:text-white ${verifying ? "animate-spin" : ""}`} />
              <span className="text-amber-400 group-hover:text-white font-black uppercase tracking-widest text-xs">
                {verifying ? "Scanning Chain..." : "Verify Integrity"}
              </span>
            </button>
            <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <FaTerminal className="text-blue-400" />
              <span className="text-blue-400 font-black uppercase tracking-widest text-xs">System Events</span>
            </div>
          </div>
        </div>


        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Audit</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Action</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">User / Subject</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Details</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Performed By</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Date</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {loading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="6" className="px-6 py-8"><div className="h-4 bg-white/5 rounded w-full" /></td>
                    </tr>
                  ))
                ) : (
                  logs.map(log => (
                    <tr key={log._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            {getLogIcon(log.action)}
                         </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-text-primary uppercase tracking-widest">
                            {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                         {log.targetUser ? (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[9px] text-primary"><FaUser /></div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-text-primary truncate max-w-[150px]">
                                    {log.targetUser.firstName} {log.targetUser.lastName}
                                  </span>
                                  <span className="text-[9px] text-text-muted font-bold opacity-40">@{log.targetUser.username || "user"}</span>
                                </div>
                            </div>
                         ) : <span className="text-xs text-text-muted opacity-30">SYSTEM_ENTITY</span>}
                      </td>
                      <td className="px-6 py-5">
                         <p className="text-xs font-bold text-text-muted max-w-sm">
                           {log.reason || log.details || "Administrative state transition triggered."}
                         </p>
                         {(log.previousState || log.newState) && (
                            <div className="flex gap-2 mt-1">
                              <span className="text-[8px] font-black uppercase text-amber-500/60 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">Diff Captured</span>
                              <span className="text-[8px] font-black uppercase text-blue-500/60 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">Forensic ID: {log._id.slice(-6)}</span>
                            </div>
                         )}
                      </td>

                      <td className="px-6 py-5">
                         {log.performedBy ? (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-[9px] text-amber-500"><FaShieldAlt /></div>
                                <span className="text-xs font-black text-amber-500 truncate max-w-[150px]">{log.performedBy.firstName}</span>
                            </div>
                         ) : <span className="text-xs text-text-muted">—</span>}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => setSelectedLog(log)}
                          className="p-2 hover:bg-primary/20 hover:text-primary rounded-xl transition-all text-text-muted group"
                        >
                          <FaSearchPlus className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Pagination placeholder */}
        {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                            page === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-text-muted hover:bg-white/10'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        )}
      <AnimatePresence>
        {selectedLog && (
          <AuditViewerModal 
            log={selectedLog} 
            onClose={() => setSelectedLog(null)} 
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};



export default AdminLogs;
