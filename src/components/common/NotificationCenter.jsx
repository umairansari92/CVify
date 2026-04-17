import React, { useState, useEffect, useRef } from "react";
import { 
  FiBell, 
  FiCheckCircle, 
  FiInfo, 
  FiAlertTriangle, 
  FiX, 
  FiCheck,
  FiChevronRight
} from "react-icons/fi";
import { FaGem } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
      setUnreadCount(res.data.filter(n => !n.isRead).length);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 60 seconds (Mock real-time)
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setIsOpen(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success": return <FiCheckCircle className="text-emerald-500" />;
      case "warning": return <FiAlertTriangle className="text-amber-500" />;
      case "diamond": return <FaGem className="text-blue-500" />;
      case "nudge": return <FiInfo className="text-primary" />;
      default: return <FiInfo className="text-blue-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-xl bg-foreground/10 border border-border-subtle hover:bg-foreground/20 transition-all relative group"
        aria-label="Notifications"
      >
        <FiBell className={`text-xl ${unreadCount > 0 ? "text-primary animate-tada" : "text-text-muted opacity-70"}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-background shadow-lg">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-[360px] md:w-[400px] glass border border-white/10 rounded-3xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-text-primary uppercase tracking-tighter">Notifications</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">
                  {unreadCount} UNREAD MESSAGES
                </p>
              </div>
              <button 
                onClick={handleMarkAllRead}
                className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
              >
                Mark All Read
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <FiBell className="mx-auto text-4xl text-text-muted opacity-20 mb-4" />
                  <p className="text-sm text-text-muted font-bold">No notifications yet.</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => handleNotificationClick(n)}
                    className={`p-5 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 flex gap-4 items-start ${!n.isRead ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                  >
                    <div className="mt-1 text-lg">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-black truncate pr-2 ${!n.isRead ? "text-text-primary" : "text-text-muted"}`}>
                          {n.title}
                        </h4>
                        <span className="text-[9px] text-text-muted opacity-50 whitespace-nowrap mt-0.5 font-bold">
                          {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                        {n.message}
                      </p>
                      {n.actionUrl && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest">
                          View details <FiChevronRight />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 bg-white/5 text-center">
                <button className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-text-primary transition-colors">
                  View All History
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
