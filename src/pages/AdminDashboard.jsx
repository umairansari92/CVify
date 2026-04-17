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
  FaLightbulb,
  FaExclamationTriangle,
  FaRocket,
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
import { motion, AnimatePresence } from "framer-motion";
import AnalyticsCharts from "../components/admin/AnalyticsCharts";
import NudgePanel from "../components/admin/NudgePanel";



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
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  
  // Intelligence Layer State
  const [insights, setInsights] = useState([]);
  const [smartAnalytics, setSmartAnalytics] = useState(null);
  const [intelLoading, setIntelLoading] = useState(true);




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
          params: { 
            page, 
            limit: pagination.limit, 
            search: searchQuery,
            status: statusFilter !== "all" ? statusFilter : undefined,
            industry: industryFilter || undefined,
            dateRange: dateRange !== "all" ? dateRange : undefined
          },
        });

        setUsers(res.data.users);
        setPagination(res.data.pagination);
        setStats(prev => ({ ...prev, ...res.data.stats }));
      } catch (err) {

        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  const fetchIntel = useCallback(async () => {
    setIntelLoading(true);
    try {
      const [insRes, anaRes] = await Promise.all([
        api.get("/admin/insights"),
        api.get("/admin/smart-analytics")
      ]);
      setInsights(insRes.data);
      setSmartAnalytics(anaRes.data);
    } catch (err) {
      console.error("Failed to load platform intelligence:", err);
    } finally {
      setIntelLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchIntel();
    fetchUsers(1, search);
  }, [fetchStats, fetchIntel, fetchUsers, search, statusFilter, industryFilter, dateRange]);




  // Debounced search
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [search, statusFilter, industryFilter]);


  // ─── Actions ────────────────────────────────────────────────────────────
  const handleBan = async (userId, userName, isCurrentlyBlocked) => {
    const action = isCurrentlyBlocked ? "Unsuspend" : "Suspend";
    const { value: reason } = await Swal.fire({
      title: `${action} ${userName}?`,
      text: isCurrentlyBlocked
        ? "This user will regain access to their account."
        : "This user will be blocked from logging in.",
      input: "text",
      inputLabel: "Mandatory Reason for Suspension:",
      inputPlaceholder: "e.g., TOS violation / Spam behavior",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isCurrentlyBlocked ? "#22c55e" : "#ef4444",
      confirmButtonText: `Yes, ${action}`,
      footer: '<span style="color: #ef4444; font-size: 10px; font-weight: 900; text-transform: uppercase;">⚡ FORENSIC GUARD: THIS ACTION IS PERMANENTLY LOGGED</span>',
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
      inputValidator: (value) => {
        if (!value || value.trim().length < 5) {
          return "Please provide a valid reason (min 5 chars) for accountability.";
        }
      }
    });

    if (reason) {
      try {
        const res = await api.put(`/admin/users/${userId}/ban`, { reason });
        setUsers((prev) =>
          prev.map((u) => u._id === userId ? { ...u, isBlocked: res.data.isBlocked } : u)
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
        Swal.fire("Error", err.response?.data?.message || "Action failed", "error");
      }
    }
  };


  const handleFreeze = async (userId, userName, isCurrentlyFrozen) => {
    const action = isCurrentlyFrozen ? "Unfreeze" : "Freeze";
    const { value: reason } = await Swal.fire({
      title: `${action} ${userName}?`,
      text: isCurrentlyFrozen
        ? "User will be able to modify their data again."
        : "User will be able to login but NOT modify or create any data.",
      input: "text",
      inputLabel: "Why are you performing this action? (Mandatory for Audit)",
      inputPlaceholder: "e.g., Investigation required",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: isCurrentlyFrozen ? "#22c55e" : "#3b82f6",
      confirmButtonText: `Yes, ${action}`,
      footer: '<span style="color: #ef4444; font-size: 10px; font-weight: 900; text-transform: uppercase;">⚠️ ACTION LOGGED: FORENSIC AUDIT ACTIVE</span>',
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
      inputValidator: (value) => {
        if (!value || value.trim().length < 5) {
          return "Please provide a proper reason (min 5 characters) for accountability.";
        }
      }
    });

    if (reason) {
      try {
        const res = await api.put(`/admin/users/${userId}/freeze`, { reason });
        setUsers((prev) =>
          prev.map((u) => u._id === userId ? { ...u, isFrozen: res.data.isFrozen } : u)
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
        Swal.fire("Error", err.response?.data?.message || "Action failed", "error");
      }
    }
  };


  const handleDelete = async (userId, userName, userEmail) => {
    const { value: reason } = await Swal.fire({
      title: "EXTREME CAUTION",
      html: `
        <div class="text-left">
          <p class="text-red-500 font-bold mb-4">You are about to PERMANENTLY DELETE <strong>${userName}</strong> (${userEmail}).</p>
          <p class="text-xs opacity-80 mb-4 font-bold">This is a Soft-Delete. Data will be hidden but remains in database for audit.</p>
        </div>
      `,
      input: "text",
      inputLabel: "Mandatory Deletion Reason:",
      inputPlaceholder: "e.g., Requested by user / Spam account",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "PROCEED WITH DELETION",
      footer: '<span style="color: #ef4444; font-size: 10px; font-weight: 900; text-transform: uppercase;">🔴 FORENSIC ALERT: THIS ACTION IS LOGGED PERMANENTLY</span>',
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass border-2 border-red-500/50" },
      inputValidator: (value) => {
        if (!value || value.trim().length < 5) return "Deletion reason required!";
      }
    });

    if (reason) {
      const { value: confirmEmail } = await Swal.fire({
        title: "Final Confirmation",
        text: `Type "${userEmail}" to confirm:`,
        input: "text",
        inputPlaceholder: userEmail,
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "DELETE ACCOUNT",
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
          await api.delete(`/admin/users/${userId}`, { data: { reason } });
          setUsers((prev) => prev.filter((u) => u._id !== userId));
          fetchStats();
          Swal.fire("Deleted!", "User account successfully soft-deleted.", "success");
        } catch (err) {
          Swal.fire("Error", err.response?.data?.message || "Deletion failed", "error");
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
          <textarea id="swal-reason" class="swal2-textarea" placeholder="Why are you adjusting diamonds?" style="margin:0;border-radius:12px;background:rgba(255,255,255,0.05);color:inherit;font-size:14px;border:1px solid rgba(255,255,255,0.1)"></textarea>
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
        const reason = document.getElementById("swal-reason").value;
        if (!amount || parseInt(amount) <= 0) {
          Swal.showValidationMessage("Enter a valid positive amount");
          return false;
        }
        if (!reason || reason.trim().length < 5) {
          Swal.showValidationMessage("Reason required (min 5 chars)");
          return false;
        }
        return { type, amount: parseInt(amount), reason };
      },
    });


    if (formValues) {
      try {
        const res = await api.post(`/admin/users/${userId}/diamonds`, {
          ...formValues,
          reason: formValues.reason
        });
        setUsers((prev) =>
          prev.map((u) => u._id === userId ? { ...u, diamonds: res.data.diamonds } : u)
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
    if (currentUser.role !== "superadmin") {
      return Swal.fire("Access Denied", "Only SuperAdmins can change roles to maintain hierarchy security.", "error");
    }

    const roles = ["user", "admin", "superadmin"].filter((r) => r !== currentRole);
    const { value: formValues } = await Swal.fire({
      title: `Change Role for ${userName}`,
      html: `
        <div style="display:flex;flex-direction:column;gap:16px;padding:8px 0">
          <p class="text-xs text-amber-500 font-black uppercase mb-2">Hierarchy Lock: ON</p>
          <select id="swal-role" class="swal2-select" style="margin:0;border-radius:12px;background:rgba(255,255,255,0.05);color:inherit">
            ${roles.map(r => `<option value="${r}">${r.charAt(0).toUpperCase() + r.slice(1)}</option>`).join('')}
          </select>
          <input id="swal-reason" class="swal2-input" placeholder="Action Reason" style="margin:0;border-radius:12px" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Role",
      confirmButtonColor: "#2563eb",
      footer: '<span style="color: #ef4444; font-size: 10px; font-weight: 900; text-transform: uppercase;">⚠️ SENSITIVE OPERATION: LOGGED BY SYSTEM</span>',
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
      preConfirm: () => {
        const role = document.getElementById("swal-role").value;
        const reason = document.getElementById("swal-reason").value;
        if (!reason || reason.trim().length < 5) {
          Swal.showValidationMessage("Proper reason required (min 5 chars)");
          return false;
        }
        return { role, reason };
      }
    });

    if (formValues) {
      try {
        const res = await api.put(`/admin/users/${userId}/role`, formValues);
        setUsers((prev) =>
          prev.map((u) => u._id === userId ? { ...u, role: res.data.role } : u)
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
        Swal.fire("Error", err.response?.data?.message || "Role update failed", "error");
      }
    }
  };


  const handleBulkAction = async (actionType) => {
    if (selectedUsers.length === 0) return;

    if (actionType === "delete" && currentUser.role !== "superadmin") {
      return Swal.fire("Restricted", "Only SuperAdmins can bulk delete users.", "error");
    }

    const { value: reason } = await Swal.fire({
      title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} ${selectedUsers.length} Users?`,
      text: `Every user in this batch will be affected. Hierarchy checks will be verified individually.`,
      input: "text",
      inputLabel: "Mandatory Reason for Bulk Action:",
      inputPlaceholder: "e.g., Spam cleanup / Batch verification",
      icon: actionType === "delete" ? "error" : "warning",
      showCancelButton: true,
      confirmButtonColor: actionType === "delete" ? "#ef4444" : "#2563eb",
      confirmButtonText: "Yes, Execute Batch",
      footer: '<span style="color: #ef4444; font-size: 10px; font-weight: 900; text-transform: uppercase;">⚡ BULK OPERATION LOGGED: FORENSIC HUB ACTIVE</span>',
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
      inputValidator: (value) => {
        if (!value || value.trim().length < 5) return "Reason required for bulk audit!";
      }
    });

    if (reason) {
      setBulkLoading(true);
      try {
        const res = await api.post("/admin/bulk-action", {
          userIds: selectedUsers,
          actionType,
          reason
        });
        
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
        
        setSelectedUsers([]);
        fetchUsers(pagination.page, search);
        fetchStats();
      } catch (err) {
        Swal.fire("Hierarchy/RBAC Violation", err.response?.data?.message || "Bulk action failed", "error");
      } finally {
        setBulkLoading(false);
      }
    }
  };


  const handleBulkDiamonds = async () => {
    if (selectedUsers.length === 0) return;

    const { value: formValues } = await Swal.fire({
      title: `Bulk Diamonds: ${selectedUsers.length} Users`,
      html: `
        <div style="display:flex;flex-direction:column;gap:16px;padding:8px 0">
          <input id="swal-amount" type="number" class="swal2-input" placeholder="Amount (e.g. 100 or -50)" style="margin:0;border-radius:12px" />
          <input id="swal-reason" class="swal2-input" placeholder="Adjustment Reason" style="margin:0;border-radius:12px" />
        </div>
      `,
      showCancelButton: true,
      background: "var(--midground)",
      color: "var(--text-main)",
      customClass: { popup: "glass" },
      preConfirm: () => {
        const amount = document.getElementById("swal-amount").value;
        const reason = document.getElementById("swal-reason").value;
        if (!amount) {
          Swal.showValidationMessage("Enter an amount!");
          return false;
        }
        if (!reason || reason.trim().length < 5) {
          Swal.showValidationMessage("Reason required (min 5 chars)");
          return false;
        }
        return { amount: parseInt(amount), reason };
      }
    });

    if (formValues) {
      setBulkLoading(true);
      try {
        await api.post("/admin/bulk-action", {
          userIds: selectedUsers,
          actionType: "adjustment",
          amount: formValues.amount,
          reason: formValues.reason
        });
        
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Diamonds adjusted for ${selectedUsers.length} users.`,
          showConfirmButton: false,
          timer: 3000,
        });
        
        setSelectedUsers([]);
        fetchUsers(pagination.page, search);
        fetchStats();
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Bulk diamond adjustment failed", "error");
      } finally {
        setBulkLoading(false);
      }
    }
  };


  const handleExport = async () => {

    setIsExporting(true);
    try {
      const response = await api.get("/admin/export-all", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `CVify_Users_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed:", err);
      Swal.fire("Error", "Failed to export users", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(u => u._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const StatCard = ({ icon: Icon, label, value, gradient, iconColor, onClick }) => (
    <div 
      onClick={onClick}
      className={`group premium-card p-6 relative overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20' : ''}`}
    >
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
        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${config[role] || config.user}`}
      >
        {role}
      </span>
    );
  };

  const CompletionBar = ({ score }) => {
    const color = score > 80 ? "text-green-400" : score > 50 ? "text-blue-400" : "text-amber-400";
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle 
              cx="20" cy="20" r="16" fill="none" 
              stroke="currentColor" strokeWidth="4" 
              className={color}
              strokeDasharray={100}
              strokeDashoffset={100 - score}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[9px] font-black">{score}%</span>
        </div>
      </div>
    );
  };

  const NudgeCard = ({ nudge }) => {
    const severityConfig = {
      CRITICAL: "bg-red-500/10 border-red-500/20 text-red-500",
      HIGH: "bg-rose-500/10 border-rose-500/20 text-rose-500",
      MEDIUM: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      LOW: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      INFO: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
    };

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`min-w-[320px] p-5 rounded-2xl border ${severityConfig[nudge.severity] || severityConfig.INFO} flex flex-col gap-3 relative overflow-hidden group`}
      >
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
          <FaLightbulb className="text-4xl" />
        </div>
        <div className="flex items-center gap-2">
          <FaExclamationTriangle className="text-sm" />
          <span className="text-[10px] font-black uppercase tracking-widest">{nudge.category.replace(/_/g, ' ')}</span>
        </div>
        <div>
          <h4 className="font-black text-sm leading-tight mb-1">{nudge.title}</h4>
          <p className="text-xs opacity-70 font-medium line-clamp-2">{nudge.message}</p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-current/10">
          <span className="text-[9px] font-bold opacity-60 italic">{nudge.severity} Priority</span>
          <button className="text-[9px] font-black uppercase tracking-tighter hover:underline">Investigate &rarr;</button>
        </div>
      </motion.div>
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-primary bg-primary/10 px-4 py-1.5 rounded-xl border border-primary/20 uppercase tracking-[0.2em]">
                  Admin Panel
                </span>
                <span className="flex items-center gap-1.5 text-[8px] font-black text-red-500 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20 uppercase tracking-widest animate-pulse">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                  Forensic Audit Active
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl text-gradient font-extrabold tracking-tight">
              Command Center
            </h1>
            <p className="text-text-muted mt-2 font-bold text-lg">
              Manage users, platform health, and AI insights
            </p>
          </div>
          <div className="flex gap-3">
            <button
               onClick={handleExport}
               disabled={isExporting}
               className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
            >
              {isExporting ? <FaSpinner className="animate-spin" /> : <FaFileAlt />}
              Export Data
            </button>
          </div>
        </div>


        {/* Intelligence & Analytics Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          {/* Main Charts Area */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <AnalyticsCharts smartAnalytics={smartAnalytics} />
            
            {/* Acquisition Charts Moved Here for better flow */}
            {stats?.charts && (
              <div className="premium-card p-6 min-h-[400px]">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-xl font-black text-text-primary">User Acquisition</h3>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Growth over last 6 months</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black tracking-widest uppercase border border-blue-500/20">Real-time</div>
                </div>
                <div className="h-[300px] min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} aspect={2.5}>
                    <AreaChart data={stats.charts.userGrowth}>

                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="_id" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                      <Area type="monotone" dataKey="count" name="New Users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights Sidebar */}
          <div className="lg:col-span-1">
            <NudgePanel insights={insights} loading={intelLoading} />
          </div>
        </div>


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
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:outline-none"
              >
                <option value="all">Any Time</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">This Month</option>
              </select>
              <select 
                value={statusFilter}

                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="banned">Suspended</option>
                <option value="frozen">Frozen</option>
              </select>
              <div className="relative w-full md:w-80">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-40" />
                <input
                  type="text"
                  placeholder="Filter users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text-primary font-bold placeholder:text-text-muted placeholder:opacity-40 focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          </div>


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-left">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={selectedUsers.length === users.length && users.length > 0}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary"
                    />
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    SaaS Insights
                  </th>
                  <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Score
                  </th>
                  <th className="text-center px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    Wealth
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
                      colSpan={7}
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
                        onClick={(e) => {
                          // Prevent navigation if clicking on action buttons
                          if (e.target.closest('button') || e.target.closest('a')) return;
                          navigate(`/admin/users/${u._id}`);
                        }}
                        className={`border-b border-white/[0.03] hover:bg-white/[0.04] transition-all cursor-pointer group/row ${
                          isSelf ? "bg-primary/[0.03]" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            checked={selectedUsers.includes(u._id)}
                            onChange={() => handleSelectUser(u._id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary"
                          />
                        </td>
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
                                    (Self)
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-text-muted font-bold opacity-50 truncate">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col gap-1">
                              <RoleBadge role={u.role || "user"} />
                              <span className="text-[9px] text-text-muted font-bold opacity-40 uppercase">
                                {u.industry || "General"}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <CompletionBar score={u.completionScore || 0} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-black text-purple-400 text-sm">
                              💎 {u.diamonds ?? 0}
                            </span>
                            <span className="text-[9px] text-text-muted font-bold opacity-30">
                              Ref: {u.totalReferrals || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {u.isBlocked ? (
                            <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-[9px] font-black uppercase">Suspended</span>
                          ) : u.isFrozen ? (
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-[9px] font-black uppercase">Frozen</span>
                          ) : (
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-[9px] font-black uppercase">Active</span>
                          )}
                          {!u.isVerified && (
                            <p className="text-[8px] text-amber-500/60 font-black uppercase mt-1">Pending Verify</p>
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

        {/* Floating Bulk Action Bar */}
        <AnimatePresence>
          {selectedUsers.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
            >
              <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-black">{selectedUsers.length}</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-text-primary uppercase tracking-tight">Users Selected</p>
                    <p className="text-[10px] text-text-muted font-bold">Apply bulk changes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleBulkDiamonds}
                    className="p-3 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all" title="Give Diamonds">
                    <FaGem />
                  </button>
                  <button 
                    onClick={() => handleBulkAction("verify")}
                    className="p-3 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all" title="Verify All">
                    <FaCheckCircle />
                  </button>
                  <button 
                    onClick={() => handleBulkAction("freeze")}
                    className="p-3 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all" title="Freeze All">
                    <FaSnowflake />
                  </button>
                  <button 
                    onClick={() => handleBulkAction("block")}
                    className="p-3 rounded-xl bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white transition-all" title="Suspend All">
                    <FaBan />
                  </button>
                  {currentUser?.role === "superadmin" && (
                    <button 
                      onClick={() => handleBulkAction("delete")}
                      className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all" title="Delete All">
                      <FaTrash />
                    </button>
                  )}
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button 
                    onClick={() => setSelectedUsers([])}
                    className="text-xs font-black text-text-muted hover:text-text-primary uppercase tracking-widest px-2">Cancel</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;


