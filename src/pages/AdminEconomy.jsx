import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaGem, FaExchangeAlt, FaArrowUp, FaArrowDown, FaUser, FaSearch, FaHistory } from "react-icons/fa";

const AdminEconomy = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(`/admin/transactions?page=${page}&limit=20`);
      setTransactions(res.data.transactions);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Diamond Economy</h1>
            <p className="text-text-muted font-bold mt-1">Platform-wide financial ledger and transaction history</p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
             <FaGem className="text-amber-400 animate-pulse" />
             <span className="text-amber-400 font-black uppercase tracking-widest text-xs">Immutable Ledger</span>
          </div>
        </div>

        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Type</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">User</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Description</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Amount</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Balance After</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="border-b border-white/5 animate-pulse">
                      <td colSpan="6" className="px-6 py-8"><div className="h-4 bg-white/5 rounded w-full" /></td>
                    </tr>
                  ))
                ) : (
                  transactions.map(t => (
                    <tr key={t._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          t.type === 'credit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {t.type === 'credit' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary"><FaUser /></div>
                          <div>
                            <p className="text-sm font-black text-white leading-none mb-1">{t.user?.firstName} {t.user?.lastName}</p>
                            <p className="text-[10px] text-text-muted font-bold">@{t.user?.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs font-bold text-text-muted line-clamp-1">{t.description}</p>
                        <p className="text-[9px] text-primary font-black uppercase mt-1 tracking-tighter opacity-60">{t.reason}</p>
                      </td>
                      <td className="px-6 py-5">
                         <span className={`text-sm font-black ${t.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {t.type === 'credit' ? '+' : '-'}{t.amount} 💎
                         </span>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-xs font-black text-text-muted">{t.balanceAfter} 💎</span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs text-text-muted font-bold">{new Date(t.createdAt).toLocaleDateString()}</p>
                        <p className="text-[9px] text-text-muted opacity-40 uppercase tracking-tighter">{new Date(t.createdAt).toLocaleTimeString()}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
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

export default AdminEconomy;
