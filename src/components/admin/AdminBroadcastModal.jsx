import React, { useState } from "react";
import { FiSend, FiX, FiAlertTriangle, FiInfo, FiCheckCircle } from "react-icons/fi";
import { FaGem } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import Swal from "sweetalert2";

const AdminBroadcastModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    priority: "medium",
    actionUrl: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/admin/broadcast", formData);
      Swal.fire({
        title: "Broadcast Sent!",
        text: "Your message has been queued for all users.",
        icon: "success",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6"
      });
      onClose();
      setFormData({ title: "", message: "", type: "info", priority: "medium", actionUrl: "" });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to send broadcast", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent">
              <div>
                <h2 className="text-2xl font-black text-text-primary uppercase tracking-tighter">System Broadcast</h2>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Push messages to all platform users</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <FiX className="text-xl text-text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Message Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Major Update: Version 2.0 is live!"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-text-primary font-bold focus:outline-none focus:border-primary/50 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Message Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell your users what's happening..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-text-primary font-bold focus:outline-none focus:border-primary/50 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Type</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-text-primary font-bold focus:outline-none appearance-none cursor-pointer"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="info">Information</option>
                    <option value="success">Success / Reward</option>
                    <option value="warning">Warning / Maintenance</option>
                    <option value="diamond">Diamond Related</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Priority</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-text-primary font-bold focus:outline-none appearance-none cursor-pointer"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Action URL (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., /templates"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-text-primary font-bold focus:outline-none focus:border-primary/50 transition-all"
                  value={formData.actionUrl}
                  onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? "Sending Pulse..." : <><FiSend /> Broadcast Now</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminBroadcastModal;
