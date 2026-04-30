import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaThLarge, 
  FaChartLine, 
  FaRocket, 
  FaUser, 
  FaChevronLeft 
} from "react-icons/fa";
import { m } from "framer-motion";

const SlimSidebar = () => {
  const navItems = [
    { path: "/", icon: <FaHome />, label: "Dashboard" },
    { path: "/templates", icon: <FaThLarge />, label: "Templates" },
    { path: "/ats", icon: <FaChartLine />, label: "ATS System" },
    { path: "/referral", icon: <FaRocket />, label: "Earn Diamonds" },
    { path: "/profile", icon: <FaUser />, label: "My Profile" },
  ];

  return (
    <div className="w-[70px] glass-strong border-r border-card-border h-screen flex flex-col items-center py-8 z-[60] shrink-0">
      <NavLink to="/" className="mb-12 group relative">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-all border border-primary/20">
          <FaChevronLeft size={14} />
        </div>
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Back to Dashboard
        </div>
      </NavLink>

      <div className="flex-1 flex flex-col gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative group ${
                isActive
                  ? "glass-medium text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/[0.05]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-lg ${isActive ? "scale-110" : "group-hover:scale-110 transition-transform"}`}>
                  {item.icon}
                </span>
                
                {/* Modern Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-2xl border border-white/5">
                  {item.label}
                </div>

                {isActive && (
                  <m.div 
                    layoutId="active-pill-slim"
                    className="absolute -left-1 w-1 h-5 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto">
         <div className="w-10 h-10 rounded-2xl overflow-hidden border border-card-border hover:border-primary/50 transition-colors cursor-pointer">
            <img src="/CVify Favicon.jpg" alt="Profile" className="w-full h-full object-cover" />
         </div>
      </div>
    </div>
  );
};

export default SlimSidebar;
