import { useState, useEffect } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import { FaSave, FaCog, FaGem, FaRedo, FaTools, FaExclamationTriangle } from "react-icons/fa";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    atScanCost: 50,
    coverLetterCost: 30,
    referralReward: 50,
    monthlyBonusAmount: 20,
    freeResumeLimit: 2,
    extraResumeCost: 30,
    maintenanceMode: false,
    maintenanceMessage: "",
    maintenanceUntil: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/admin/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/admin/settings", settings);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Platform settings updated",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-text-muted">Loading System Rules...</div>;

  return (
    <div className="min-h-screen bg-mesh p-6 md:p-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <FaCog className="text-2xl animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">System Settings</h1>
            <p className="text-text-muted font-bold">Configure platform economy and global rules</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Economy Section */}
          <div className="premium-card p-8">
            <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3">
              <FaGem className="text-purple-400" /> Diamond Economy & Costs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">ATS Scan Cost (Diamonds)</label>
                <input
                  type="number"
                  value={settings.atScanCost}
                  onChange={(e) => setSettings({ ...settings, atScanCost: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Cover Letter Cost (Diamonds)</label>
                <input
                  type="number"
                  value={settings.coverLetterCost}
                  onChange={(e) => setSettings({ ...settings, coverLetterCost: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Referral Reward (Diamonds)</label>
                <input
                  type="number"
                  value={settings.referralReward}
                  onChange={(e) => setSettings({ ...settings, referralReward: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Monthly Bonus (Diamonds)</label>
                <input
                  type="number"
                  value={settings.monthlyBonusAmount}
                  onChange={(e) => setSettings({ ...settings, monthlyBonusAmount: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Limits Section */}
          <div className="premium-card p-8">
            <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3">
              <FaRedo className="text-emerald-400" /> Usage Limits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Free Resume Limit</label>
                <input
                  type="number"
                  value={settings.freeResumeLimit}
                  onChange={(e) => setSettings({ ...settings, freeResumeLimit: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Extra Resume Cost (Diamonds)</label>
                <input
                  type="number"
                  value={settings.extraResumeCost}
                  onChange={(e) => setSettings({ ...settings, extraResumeCost: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="premium-card p-8 border-red-500/10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-white flex items-center gap-3">
                <FaTools className="text-red-400" /> Platform Maintenance
              </h3>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}>
                 <span className={`text-[10px] font-black uppercase ${settings.maintenanceMode ? 'text-red-500' : 'text-text-muted'}`}>
                    {settings.maintenanceMode ? "ACTIVE" : "INACTIVE"}
                 </span>
                 <div className={`w-12 h-6 rounded-full transition-colors relative ${settings.maintenanceMode ? 'bg-red-500' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'left-7' : 'left-1'}`} />
                 </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                <FaExclamationTriangle className="text-red-500 shrink-0 mt-1" />
                <p className="text-xs text-text-muted font-bold leading-relaxed">
                  Enabling maintenance mode will block all non-admin users from accessing the platform. Use sparingly for critical updates.
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Maintenance Message</label>
                <textarea
                  value={settings.maintenanceMessage}
                  onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-primary outline-none resize-none"
                  placeholder="Tell users why we're down..."
                />
              </div>

              {settings.maintenanceMode && (
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Estimated Duration</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      { label: "15m", value: 15 },
                      { label: "30m", value: 30 },
                      { label: "1h", value: 60 },
                      { label: "2h", value: 120 },
                      { label: "4h", value: 240 },
                      { label: "Clear", value: 0 },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          if (opt.value === 0) {
                            setSettings({ ...settings, maintenanceUntil: null });
                          } else {
                            const date = new Date();
                            date.setMinutes(date.getMinutes() + opt.value);
                            setSettings({ ...settings, maintenanceUntil: date.toISOString() });
                          }
                        }}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          // Simple check: if maintenanceUntil is roughly now + value
                          opt.value === 0 && !settings.maintenanceUntil 
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/5 border-white/10 hover:border-white/20 text-text-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Custom minutes..."
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-primary w-32"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const mins = parseInt(customMinutes);
                        if (mins > 0) {
                          const date = new Date();
                          date.setMinutes(date.getMinutes() + mins);
                          setSettings({ ...settings, maintenanceUntil: date.toISOString() });
                        }
                      }}
                      className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/20 transition-all"
                    >
                      Apply Custom
                    </button>
                  </div>

                  {settings.maintenanceUntil && (
                    <p className="text-[10px] text-primary font-bold">
                      Active until: {new Date(settings.maintenanceUntil).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.01] transition-all shadow-xl disabled:opacity-50"
          >
            <FaSave /> {saving ? "Updating Rules..." : "Commit Platform Settings"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
