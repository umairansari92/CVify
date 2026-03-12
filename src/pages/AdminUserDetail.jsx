import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import Swal from "sweetalert2";
import {
  FaUser,
  FaFileAlt,
  FaSearch,
  FaEnvelopeOpenText,
  FaGem,
  FaHistory,
  FaFileDownload,
  FaChevronLeft,
  FaPlus,
  FaMinus,
  FaBan,
  FaSnowflake,
  FaTrash,
  FaSave,
  FaUserShield,
  FaClock,
  FaGlobe,
  FaExternalLinkAlt,
} from "react-icons/fa";

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  // ─── State ──────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);

  // Permission Checks (Moved after state declaration)
  const isSuperAdmin = currentUser?.role === "superadmin";
  const targetIsAdmin = user?.role === "admin" || user?.role === "superadmin";
  const canModify = isSuperAdmin || !targetIsAdmin;

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);
  const [tabData, setTabData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", role: "", diamonds: 0 });

  // ─── Data Fetching ──────────────────────────────────────────────────────
  const fetchUserDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data.user);
      setFormData({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        role: res.data.user.role || "user",
        diamonds: res.data.user.diamonds || 0,
      });
      // Store aggregated data
      setTabData({ 
        counts: res.data.counts,
        activity: res.data.activity,
        diamonds: res.data.diamonds,
        assets: res.data.assets
      });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      Swal.fire("Error", "Could not load user details", "error");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const fetchTabData = useCallback(async (tab) => {
    if (tab === "profile") return;
    setSubLoading(true);
    try {
      let endpoint = "";
      switch (tab) {
        case "resumes": endpoint = `/admin/users/${id}/resumes`; break;
        case "ats-scans": endpoint = `/admin/users/${id}/ats-scans`; break;
        case "cover-letters": endpoint = `/admin/users/${id}/cover-letters`; break;
        case "diamonds": endpoint = `/admin/users/${id}/diamond-history`; break;
        case "activity": endpoint = `/admin/users/${id}/activity`; break;
        default: return;
      }
      const res = await api.get(endpoint);
      setTabData(prev => ({ ...prev, [tab]: res.data }));
    } catch (err) {
      console.error(`Failed to fetch ${tab}:`, err);
    } finally {
      setSubLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  useEffect(() => {
    if (activeTab !== "profile") {
      fetchTabData(activeTab);
    }
  }, [activeTab, fetchTabData]);

  // ─── Actions ────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    try {
      const res = await api.put(`/admin/users/${id}`, formData);
      setUser(res.data.user);
      setEditMode(false);
      Swal.fire("Updated", "User profile updated successfully", "success");
    } catch (err) {
      /* handled */
    }
  };

  const handleExport = async () => {
    try {
      const res = await api.get(`/admin/users/${id}/export`);
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data, null, 2));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `CVify_Export_${user?.username}_${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      Swal.fire("Exported", "User GDPR data exported successfully", "success");
    } catch (err) {
      Swal.fire("Export Failed", "Could not generate data export", "error");
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin/resumes/${resumeId}`);
        setTabData(prev => ({
          ...prev,
          resumes: prev.resumes.filter(r => r._id !== resumeId)
        }));
        Swal.fire("Deleted", "Resume removed", "success");
      } catch (err) { /* handled */ }
    }
  };

  // ─── Helper Components ──────────────────────────────────────────────────
  const TabButton = ({ id, label, icon: Icon, color, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-black text-xs uppercase tracking-widest ${
        activeTab === id
          ? `border-${color || "primary"} text-${color || "primary"} bg-${color || "primary"}/5`
          : "border-transparent text-text-muted hover:text-text-primary hover:bg-white/5"
      }`}
    >
      <Icon className="text-sm" />
      {label}
      {count !== undefined && (
        <span className="ml-1 opacity-50 font-bold">({count})</span>
      )}
    </button>
  );

  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-12 text-center opacity-40">
      <FaHistory className="text-4xl mb-4" />
      <p className="font-bold">{message || "No records found"}</p>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-mesh">
      <div className="flex flex-col items-center gap-4">
        <FaGem className="text-4xl text-primary animate-bounce" />
        <p className="font-black text-xs uppercase tracking-[0.2em] text-primary">Charging Admin Protocol...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Header */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-black text-xs uppercase tracking-widest mb-8"
        >
          <FaChevronLeft /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-fadeIn">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary p-1 shrink-0">
              <div className="w-full h-full rounded-[20px] bg-midground flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-gradient uppercase">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  user?.role === 'superadmin' ? 'bg-amber-500/15 text-amber-400 border-amber-400/30' :
                  user?.role === 'admin' ? 'bg-blue-500/15 text-blue-400 border-blue-400/30' :
                  'bg-slate-500/15 text-slate-400 border-slate-400/30'
                }`}>
                  {user?.role}
                </span>
                {user?.isBlocked && (
                  <span className="px-3 py-1 bg-red-500/15 text-red-400 border border-red-400/30 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    Suspended
                  </span>
                )}
                {user?.isFrozen && (
                  <span className="px-3 py-1 bg-blue-500/15 text-blue-400 border border-blue-400/30 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <FaSnowflake className="text-[8px]" /> Frozen
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-text-muted font-bold mt-1">@{user?.username} • {user?.email}</p>
              <p className="text-[11px] text-text-muted font-black uppercase tracking-widest mt-2 flex items-center gap-4">
                <span>Joined: {new Date(user?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="text-purple-400 flex items-center gap-1"><FaGem /> {user?.diamonds || 0} Diamonds</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
            >
              <FaFileDownload /> Export GDPR Data
            </button>
          </div>
        </div>

        {/* Tab System */}
        <div className="premium-card p-0 overflow-hidden min-h-[600px] flex flex-col">
          <div className="flex border-b border-white/5 overflow-x-auto no-scrollbar bg-white/[0.02]">
            <TabButton id="profile" label="Profile" icon={FaUser} />
            <TabButton id="location" label="Location & Device" icon={FaGlobe} />
            <TabButton id="assets" label="Assets" icon={FaFileAlt} />
            <TabButton id="activity" label="Activity Log" icon={FaHistory} count={tabData.counts?.activityLogs} />
            <TabButton id="diamonds" label="Diamond Ledger" icon={FaGem} count={tabData.counts?.diamondTransactions} />
          </div>

          <div className="p-6 md:p-10 flex-grow relative">
            {subLoading && (
              <div className="absolute inset-0 bg-midground/50 backdrop-blur-sm z-20 flex items-center justify-center">
                <FaGem className="text-3xl text-primary animate-spin" />
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn">
                <div className="space-y-8">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <h3 className="text-lg font-black uppercase tracking-widest text-primary">Core Identity</h3>
                    {canModify && (
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className="text-xs font-black uppercase tracking-widest text-secondary hover:underline"
                      >
                        {editMode ? "Cancel Edit" : "Modify Record"}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">First Name</label>
                      <input
                        disabled={!editMode}
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary/50 outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Last Name</label>
                      <input
                        disabled={!editMode}
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary/50 outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Email Address</label>
                      <input
                        disabled={!editMode}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary/50 outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {editMode && (
                    <button
                      onClick={handleUpdate}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg"
                    >
                      <FaSave /> Commit Changes
                    </button>
                  )}
                </div>

                <div className="space-y-8">
                  <h3 className="text-lg font-black uppercase tracking-widest text-purple-400 bg-purple-400/5 p-4 rounded-2xl">Permissions & Economy</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <FaGem className="text-xl" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Diamond Balance</p>
                          <p className="text-2xl font-black text-white">{user?.diamonds}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          disabled={!canModify}
                          onClick={() => navigate('/admin')} 
                          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-text-muted disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          <FaPlus />
                        </button>
                        <button 
                          disabled={!canModify}
                          onClick={() => navigate('/admin')} 
                          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-text-muted disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          <FaMinus />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <FaUserShield className="text-xl" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Account Role</p>
                          <p className="text-lg font-black text-white uppercase">{user?.role}</p>
                        </div>
                      </div>
                      {isSuperAdmin && (
                        <button onClick={() => navigate('/admin')} className="text-xs font-black uppercase tracking-widest text-blue-400 hover:underline">Change</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location & Device Tab */}
            {activeTab === "location" && (
              <div className="animate-fadeIn space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="premium-card p-8 border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                        <FaGlobe className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">Geolocation</h3>
                        <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Kahan se join kiya</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                        <span className="text-xs font-black uppercase tracking-widest text-text-muted">IP Address</span>
                        <span className="font-mono font-bold text-teal-400">{user?.lastIp || "Not Captured"}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                        <span className="text-xs font-black uppercase tracking-widest text-text-muted">Location</span>
                        <span className="font-bold text-white">{user?.lastLocation || "Unknown"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="premium-card p-8 border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <FaUserShield className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">Browser & OS</h3>
                        <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Device Fingerprint</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-sm font-bold text-blue-400 mb-2">Detected Platform:</p>
                      <p className="text-xl font-black text-white tracking-tight">{user?.lastDevice || "Unknown Device"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assets Tab (Unified view) */}
            {activeTab === "assets" && (
              <div className="animate-fadeIn space-y-12">
                {/* Resumes */}
                <section>
                  <h3 className="text-lg font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                    <FaFileAlt /> Resumes <span className="opacity-30">({tabData.counts?.resumes})</span>
                  </h3>
                  {!tabData.assets?.resumes?.length ? <EmptyState message="No resumes found" /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tabData.assets.resumes.map(r => (
                        <div key={r._id} className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                          <div className="flex justify-between items-start mb-3">
                            <p className="font-black text-sm">{r.personalInfo?.fullName || "Untitled"}</p>
                            <button onClick={() => handleDeleteResume(r._id)} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FaTrash className="text-[10px]" /></button>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-text-muted font-bold uppercase tracking-tight">
                            <span>{r.templateId}</span>
                            <span>{new Date(r.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Scans */}
                <section>
                  <h3 className="text-lg font-black uppercase tracking-widest text-orange-400 mb-6 flex items-center gap-2">
                    <FaSearch /> ATS Scans <span className="opacity-30">({tabData.counts?.atsScans})</span>
                  </h3>
                  {!tabData.assets?.atsScans?.length ? <EmptyState message="No scans found" /> : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tr className="text-left border-b border-white/5 text-[10px] uppercase font-black text-text-muted">
                          <th className="pb-3 px-2">File</th>
                          <th className="pb-3 px-2 text-center">Score</th>
                          <th className="pb-3 px-2 text-right">Date</th>
                        </tr>
                        {tabData.assets.atsScans.map(s => (
                          <tr key={s._id} className="border-b border-white/[0.02] text-xs font-bold">
                            <td className="py-3 px-2">{s.resumeName}</td>
                            <td className="py-3 px-2 text-center">
                              <span className={`px-2 py-0.5 rounded ${s.score?.overall >= 70 ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                {s.score?.overall}%
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right text-text-muted">{new Date(s.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* Activity Log Tab */}
            {activeTab === "activity" && (
              <div className="space-y-4 animate-fadeIn">
                {!tabData.activity?.length ? <EmptyState message="Audit trail is empty" /> : (
                  <div className="relative border-l-2 border-white/5 ml-4 pl-8 space-y-8 py-4">
                    {tabData.activity.map(a => (
                      <div key={a._id} className="relative">
                        <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-midground shadow-lg ${
                          a.action.includes('delete') ? 'bg-red-500' :
                          a.action.includes('create') ? 'bg-green-500' :
                          a.action.includes('login') ? 'bg-blue-500' :
                          'bg-slate-500'
                        }`} />
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-1">
                          <h4 className="font-black text-xs uppercase tracking-widest text-white">{a.action.replace(/_/g, ' ')}</h4>
                          <span className="text-[10px] font-bold text-text-muted">{new Date(a.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{a.details}</p>
                        {a.location && (
                          <p className="text-[10px] text-teal-400/60 mt-1 font-bold flex items-center gap-1">
                            <FaGlobe className="text-[8px]" /> {a.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Diamond Ledger Tab */}
            {activeTab === "diamonds" && (
              <div className="space-y-4 animate-fadeIn">
                {!tabData.diamonds?.length ? <EmptyState message="Financial history is clean" /> : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-white/5">
                          <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-muted">Type</th>
                          <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-muted">Amount</th>
                          <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-muted">Reason</th>
                          <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Balance After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabData.diamonds.map(t => (
                          <tr key={t._id} className="border-b border-white/[0.03] hover:bg-white/[0.01]">
                            <td className="px-4 py-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                                t.type === 'credit' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'
                              }`}>
                                {t.type}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <p className={`font-black text-sm ${t.type === 'credit' ? 'text-green-400' : 'text-red-500'}`}>
                                {t.type === 'credit' ? '+' : '-'}{t.amount} 💎
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-xs font-bold">{t.description}</p>
                              <p className="text-[9px] text-text-muted mt-1 uppercase tracking-tighter">{t.reason}</p>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="text-xs font-black text-text-primary">{t.balanceAfter} 💎</p>
                              <p className="text-[9px] text-text-muted font-bold mt-0.5">{new Date(t.createdAt).toLocaleDateString()}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Cover Letters - Simplistic table for now */}
            {activeTab === "cover-letters" && (
              <div className="space-y-4 animate-fadeIn">
                {!tabData["cover-letters"]?.length ? <EmptyState message="No cover letters found" /> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tabData["cover-letters"].map(cl => (
                      <div key={cl._id} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400"><FaEnvelopeOpenText /></div>
                            <div>
                              <p className="font-black text-sm line-clamp-1">{cl.jobTitle} @ {cl.companyName || "N/A"}</p>
                              <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">{cl.type || "AI"}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-text-muted italic line-clamp-3 mb-4">{cl.content}</p>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted pt-4 border-t border-white/5">
                          <span>Tone: {cl.tone || "Professional"}</span>
                          <span>{new Date(cl.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
