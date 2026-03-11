import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaHistory, FaSearch, FaUser, FaShieldAlt, FaTerminal, FaBug, FaInfoCircle } from "react-icons/fa";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

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
            <h1 className="text-4xl font-black text-white tracking-tight">Activity Logs</h1>
            <p className="text-text-muted font-bold mt-1">Platform-wide audit trail for users and administrators</p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
             <FaTerminal className="text-blue-400" />
             <span className="text-blue-400 font-black uppercase tracking-widest text-xs">System Events</span>
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
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                            {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                         {log.user ? (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[9px] text-primary"><FaUser /></div>
                                <span className="text-xs font-black text-white truncate max-w-[150px]">@{log.user.username}</span>
                            </div>
                         ) : <span className="text-xs text-text-muted">System</span>}
                      </td>
                      <td className="px-6 py-5">
                         <p className="text-xs font-bold text-text-muted max-w-sm">{log.details}</p>
                         {log.metadata && (
                            <button className="text-[9px] font-black uppercase text-primary mt-1 hover:underline">View Metadata</button>
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
                      <td className="px-6 py-5">
                        <p className="text-xs text-text-muted font-bold whitespace-nowrap">{new Date(log.createdAt).toLocaleDateString()}</p>
                        <p className="text-[9px] text-text-muted opacity-40 uppercase tracking-tighter">{new Date(log.createdAt).toLocaleTimeString()}</p>
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
      </div>
    </div>
  );
};

export default AdminLogs;
