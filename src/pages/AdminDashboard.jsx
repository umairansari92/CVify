import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaGem,
  FaFileAlt,
  FaChartBar,
  FaSearch,
  FaBan,
  FaCheckCircle,
  FaUserShield,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelopeOpenText,
  FaShieldAlt,
  FaSpinner,
  FaSnowflake,
  FaTrash,
  FaEdit,
  FaEye,
  FaIdCard,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  // ─── State ──────────────────────────────────────────────────────────────
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // ─── Data Fetching ──────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(
    async (page = 1, searchQuery = "") => {
      setLoading(true);
      try {
        const res = await api.get("/admin/users", {
          params: { page, limit: pagination.limit, search: searchQuery },
        });
        setUsers(res.data.users);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [fetchStats, fetchUsers]);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers(1, search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, fetchUsers]);

  // ─── Actions ────────────────────────────────────────────────────────────
  const handleBan = async (userId, userName, isCurrentlyBlocked) => {
    const action = isCurrentlyBlocked ? "Unsuspend" : "Suspend";
    const result = await Swal.fire({
      title: `${action} ${userName}?`,
      text: isCurrentlyBlocked
        ? "This user will regain access to their account."
        : "This user will be blocked from logging in.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isCurrentlyBlocked ? "#22c55e" : "#ef4444",
      confirmButtonText: `Yes, ${action}`,
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (result.isConfirmed) {
      try {
        const res = await api.put(`/admin/users/${userId}/ban`);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isBlocked: res.data.isBlocked } : u
          )
        );
        fetchStats();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        /* handled */
      }
    }
  };

  const handleFreeze = async (userId, userName, isCurrentlyFrozen) => {
    const action = isCurrentlyFrozen ? "Unfreeze" : "Freeze";
    const result = await Swal.fire({
      title: `${action} ${userName}?`,
      text: isCurrentlyFrozen
        ? "User will be able to modify their data again."
        : "User will be able to login but NOT modify or create any data.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: isCurrentlyFrozen ? "#22c55e" : "#3b82f6",
      confirmButtonText: `Yes, ${action}`,
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (result.isConfirmed) {
      try {
        const res = await api.put(`/admin/users/${userId}/freeze`);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isFrozen: res.data.isFrozen } : u
          )
        );
        fetchStats();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        /* handled */
      }
    }
  };

  const handleDelete = async (userId, userName, userEmail) => {
    const result = await Swal.fire({
      title: "EXTREME CAUTION",
      html: `
        <div class="text-left">
          <p class="text-red-500 font-bold mb-4">You are about to PERMANENTLY DELETE <strong>${userName}</strong> (${userEmail}).</p>
          <p class="text-sm opacity-80 mb-4">This will cascade delete all:</p>
          <ul class="text-xs list-disc pl-5 opacity-70 mb-4">
            <li>Resumes & Profiles</li>
            <li>ATS Scans & History</li>
            <li>Cover Letters</li>
            <li>Diamond Transactions</li>
            <li>Activity Logs</li>
          </ul>
          <p class="text-xs font-bold uppercase tracking-widest text-red-400">This action CANNOT be undone.</p>
        </div>
      `,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "YES, DELETE EVERYTHING",
      cancelButtonText: "Cancel",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass border-2 border-red-500/50" },
    });

    if (result.isConfirmed) {
      const { value: confirmEmail } = await Swal.fire({
        title: "Final Confirmation",
        text: `Type the user's email "${userEmail}" to confirm deletion:`,
        input: "text",
        inputPlaceholder: userEmail,
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "DELETE PERMANENTLY",
        background: "var(--midground)",
        color: "var(--text-main)",
        customClass: { popup: "glass" },
        preConfirm: (value) => {
          if (value !== userEmail) {
            Swal.showValidationMessage("Email does not match");
            return false;
          }
          return value;
        },
      });

      if (confirmEmail) {
        try {
          await api.delete(`/admin/users/${userId}`);
          setUsers((prev) => prev.filter((u) => u._id !== userId));
          fetchStats();
          Swal.fire("Deleted!", "User and all associated data wiped.", "success");
        } catch (err) {
          /* handled */
        }
      }
    }
  };

  const handleDiamonds = async (userId, userName) => {
    const { value: formValues } = await Swal.fire({
      title: `Adjust Diamonds for ${userName}`,
      html: `
        <div style="display:flex;flex-direction:column;gap:16px;padding:8px 0">
          <select id="swal-type" class="swal2-select" style="padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:inherit;font-weight:700">
            <option value="add">➕ Add Diamonds</option>
            <option value="deduct">➖ Deduct Diamonds</option>
          </select>
          <input id="swal-amount" type="number" min="1" class="swal2-input" placeholder="Amount" style="margin:0;border-radius:12px;font-weight:700" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#2563eb",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
      preConfirm: () => {
        const type = document.getElementById("swal-type").value;
        const amount = document.getElementById("swal-amount").value;
        if (!amount || parseInt(amount) <= 0) {
          Swal.showValidationMessage("Enter a valid positive amount");
          return false;
        }
        return { type, amount: parseInt(amount) };
      },
    });

    if (formValues) {
      try {
        const res = await api.post(`/admin/users/${userId}/diamonds`, formValues);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, diamonds: res.data.diamonds } : u
          )
        );
        fetchStats();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        /* handled */
      }
    }
  };

  const handleRoleChange = async (userId, userName, currentRole) => {
    const roles = ["user", "admin", "superadmin"].filter(
      (r) => r !== currentRole
    );
    const { value: newRole } = await Swal.fire({
      title: `Change Role for ${userName}`,
      text: `Current role: ${currentRole}`,
      input: "select",
      inputOptions: Object.fromEntries(roles.map((r) => [r, r.charAt(0).toUpperCase() + r.slice(1)])),
      inputPlaceholder: "Select new role",
      showCancelButton: true,
      confirmButtonText: "Update Role",
      confirmButtonColor: "#2563eb",
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
    });

    if (newRole) {
      try {
        const res = await api.put(`/admin/users/${userId}/role`, {
          role: newRole,
        });
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, role: res.data.role } : u
          )
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        /* handled */
      }
    }
  };

  // ─── Stat Card Component ────────────────────────────────────────────────
  const StatCard = ({ icon: Icon, label, value, gradient, iconColor }) => (
    <div className="group premium-card p-6 relative overflow-hidden hover:scale-[1.03] transition-all duration-300">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconColor} bg-white/5 shadow-lg`}
        >
          <Icon className="text-2xl" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary opacity-60">
            {label}
          </p>
          {statsLoading ? (
            <div className="h-8 w-20 bg-white/5 rounded-lg animate-pulse mt-1" />
          ) : (
            <p className="text-3xl font-black text-text-primary">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // ─── Role Badge ─────────────────────────────────────────────────────────
  const RoleBadge = ({ role }) => {
    const config = {
      superadmin: "bg-amber-500/15 text-amber-400 border-amber-400/30",
      admin: "bg-blue-500/15 text-blue-400 border-blue-400/30",
      user: "bg-slate-500/15 text-slate-400 border-slate-400/30",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${config[role] || config.user}`}
      >
        {role}
      </span>
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative bg-mesh p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 animate-fadeIn">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt className="text-primary text-2xl animate-pulse" />
              <span className="text-xs font-black text-primary bg-primary/10 px-4 py-1.5 rounded-xl border border-primary/20 uppercase tracking-[0.2em]">
                Admin Panel
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl text-gradient font-extrabold tracking-tight">
              Command Center
            </h1>
            <p className="text-text-muted mt-2 font-bold text-lg">
              Manage users, diamonds, and platform analytics
            </p>
          </div>
        </div>

        {/* Unified Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12 animate-fadeIn">
          <StatCard
            icon={FaUsers}
            label="Total Users"
            value={stats?.totalUsers}
            gradient="from-blue-500/10 to-cyan-500/10"
            iconColor="text-blue-400"
          />
          <StatCard
            icon={FaGem}
            label="Diamonds"
            value={stats?.totalDiamonds}
            gradient="from-purple-500/10 to-pink-500/10"
            iconColor="text-purple-400"
          />
          <StatCard
            icon={FaFileAlt}
            label="Resumes"
            value={stats?.totalResumes}
            gradient="from-green-500/10 to-emerald-500/10"
            iconColor="text-green-400"
          />
          <StatCard
            icon={FaChartBar}
            label="ATS Scans"
            value={stats?.totalATSScans}
            gradient="from-orange-500/10 to-amber-500/10"
            iconColor="text-orange-400"
          />
          <StatCard
            icon={FaSnowflake}
            label="Frozen"
            value={stats?.frozenUsers}
            gradient="from-slate-500/10 to-gray-500/10"
            iconColor="text-slate-400"
          />
          <StatCard
            icon={FaShieldAlt}
            label="Admins"
            value={stats?.adminCount}
            gradient="from-indigo-500/10 to-blue-500/10"
            iconColor="text-indigo-400"
          />
        </div>

        {/* Analytics Charts */}
        {stats?.charts && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* User Growth Chart */}
            <div className="premium-card p-6 min-h-[400px] animate-fadeIn">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xl font-black text-white">User Acquisition</h3>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Growth over last 6 months</p>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black tracking-widest uppercase border border-blue-500/20">Real-time</div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.charts.userGrowth}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="_id" 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => {
                        const date = new Date(val + "-01");
                        return date.toLocaleString('default', { month: 'short' });
                      }}
                    />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                      itemStyle={{ color: "#fff", fontWeight: "bold" }}
                      cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                    <Area type="monotone" dataKey="count" name="New Users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feature Usage Chart */}
            <div className="premium-card p-6 min-h-[400px] animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xl font-black text-white">Platform Activity</h3>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Resumes vs AI Scans</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-text-muted font-black uppercase tracking-tighter">Resumes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-[10px] text-text-muted font-black uppercase tracking-tighter">Scans</span>
                  </div>
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.charts.resumeGrowth.map((val, idx) => ({
                    month: val._id,
                    resumes: val.count,
                    scans: stats.charts.atsGrowth.find(a => a._id === val._id)?.count || 0
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => {
                        const date = new Date(val + "-01");
                        return date.toLocaleString('default', { month: 'short' });
                      }}
                    />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                    />
                    <Bar dataKey="resumes" name="Resumes" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                    <Bar dataKey="scans" name="Scans" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Users Table Section */}
        <div className="premium-card p-0 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                User Management
              </h2>
              <p className="text-sm text-text-muted font-bold mt-1">
                {pagination.total} users total
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-40" />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text-primary font-bold placeholder:text-text-muted placeholder:opacity-40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Email
                  </th>
                  <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Role
                  </th>
                  <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Diamonds
                  </th>
                  <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Status
                  </th>
                  <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/[0.03]">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-6 py-5">
                          <div className="h-5 bg-white/5 rounded-lg animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-text-muted font-bold text-lg"
                    >
                      No users found matching &quot;{search}&quot;
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const isSelf = currentUser?._id === u._id;
                    return (
                      <tr
                        key={u._id}
                        className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${
                          isSelf ? "bg-primary/[0.03]" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-sm font-black text-primary uppercase overflow-hidden shrink-0">
                              {u.profileImage ? (
                                <img
                                  src={u.profileImage}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-text-primary text-sm truncate">
                                {u.firstName} {u.lastName}
                                {isSelf && (
                                  <span className="ml-2 text-[9px] text-primary opacity-70">
                                    (You)
                                  </span>
                                )}
                              </p>
                              <p className="text-[11px] text-text-muted font-bold opacity-50 truncate">
                                @{u.username}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-text-secondary truncate max-w-[200px]">
                            {u.email}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <RoleBadge role={u.role || "user"} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-black text-purple-400 text-sm">
                            💎 {u.diamonds ?? 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {u.isBlocked ? (
                            <span className="px-3 py-1 bg-red-500/15 text-red-400 border border-red-400/30 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              Suspended
                            </span>
                          ) : u.isFrozen ? (
                            <span className="px-3 py-1 bg-blue-500/15 text-blue-400 border border-blue-400/30 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <FaSnowflake className="text-[8px]" /> Frozen
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-500/15 text-green-400 border border-green-400/30 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-[180px]">
                            {/* View Detail */}
                            <button
                              onClick={() => navigate(`/admin/users/${u._id}`)}
                              title="View Full Detail"
                              className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-400/20 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all hover:scale-110 active:scale-95"
                            >
                              <FaEye className="text-[10px]" />
                            </button>

                            {/* Diamond Adjust */}
                            <button
                              onClick={() => {
                                if (u.role !== "user" && currentUser.role !== "superadmin") {
                                  Swal.fire("Access Denied", "Only SuperAdmins can adjust diamonds for other admins.", "warning");
                                  return;
                                }
                                handleDiamonds(u._id, u.firstName);
                              }}
                              disabled={u.role !== "user" && currentUser.role !== "superadmin"}
                              title={u.role !== "user" && currentUser.role !== "superadmin" ? "SuperAdmin required" : "Adjust Diamonds"}
                              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                                u.role !== "user" && currentUser.role !== "superadmin"
                                  ? "bg-slate-500/5 text-slate-500 border-slate-500/10 cursor-not-allowed opacity-50"
                                  : "bg-purple-500/10 text-purple-400 border-purple-400/20 hover:bg-purple-500 hover:text-white"
                              }`}
                            >
                              <FaGem className="text-[10px]" />
                            </button>

                            {/* Freeze/Unfreeze */}
                            {!isSelf && (
                              <button
                                onClick={() => {
                                  if (u.role !== "user" && currentUser.role !== "superadmin") {
                                    Swal.fire("Access Denied", "Only SuperAdmins can freeze other admins.", "warning");
                                    return;
                                  }
                                  handleFreeze(u._id, u.firstName, u.isFrozen);
                                }}
                                disabled={u.role !== "user" && currentUser.role !== "superadmin"}
                                title={u.role !== "user" && currentUser.role !== "superadmin" ? "SuperAdmin required" : (u.isFrozen ? "Unfreeze" : "Freeze")}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                                  u.role !== "user" && currentUser.role !== "superadmin"
                                    ? "bg-slate-500/5 text-slate-500 border-slate-500/10 cursor-not-allowed opacity-50"
                                    : u.isFrozen
                                      ? "bg-green-500/10 text-green-400 border-green-400/20 hover:bg-green-500 hover:text-white"
                                      : "bg-blue-500/10 text-blue-400 border-blue-400/20 hover:bg-blue-500 hover:text-white"
                                }`}
                              >
                                <FaSnowflake className="text-[10px]" />
                              </button>
                            )}

                            {/* Ban/Unban */}
                            {!isSelf && (
                              <button
                                onClick={() => {
                                  if (u.role !== "user" && currentUser.role !== "superadmin") {
                                    Swal.fire("Access Denied", "Only SuperAdmins can suspend other admins.", "warning");
                                    return;
                                  }
                                  handleBan(u._id, u.firstName, u.isBlocked);
                                }}
                                disabled={u.role !== "user" && currentUser.role !== "superadmin"}
                                title={u.role !== "user" && currentUser.role !== "superadmin" ? "SuperAdmin required" : (u.isBlocked ? "Unsuspend" : "Suspend")}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                                  u.role !== "user" && currentUser.role !== "superadmin"
                                    ? "bg-slate-500/5 text-slate-500 border-slate-500/10 cursor-not-allowed opacity-50"
                                    : u.isBlocked
                                      ? "bg-green-500/10 text-green-400 border-green-400/20 hover:bg-green-500 hover:text-white"
                                      : "bg-red-500/10 text-red-400 border-red-400/20 hover:bg-red-500 hover:text-white"
                                }`}
                              >
                                {u.isBlocked ? (
                                  <FaCheckCircle className="text-[10px]" />
                                ) : (
                                  <FaBan className="text-[10px]" />
                                )}
                              </button>
                            )}

                            {/* Role Change */}
                            {!isSelf && currentUser.role === "superadmin" && (
                              <button
                                onClick={() =>
                                  handleRoleChange(
                                    u._id,
                                    u.firstName,
                                    u.role || "user"
                                  )
                                }
                                title="Change Role"
                                className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-400/20 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all hover:scale-110 active:scale-95"
                              >
                                <FaUserShield className="text-[10px]" />
                              </button>
                            )}

                            {/* Delete */}
                            {!isSelf && currentUser.role === "superadmin" && (
                              <button
                                onClick={() => handleDelete(u._id, u.firstName, u.email)}
                                title="Permanently Delete"
                                className="w-8 h-8 rounded-lg bg-red-600/10 text-red-600 border border-red-600/20 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-95"
                              >
                                <FaTrash className="text-[10px]" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="p-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm font-bold text-text-muted">
                Page {pagination.page} of {pagination.totalPages}
              </p>
              <div className="flex gap-3">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchUsers(pagination.page - 1, search)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary/50 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <FaChevronLeft className="text-xs" />
                </button>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchUsers(pagination.page + 1, search)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary/50 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
