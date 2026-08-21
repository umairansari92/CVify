import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutDashboard, BookOpen, BarChart3, ExternalLink, Sparkles, UserCheck } from "lucide-react";
import ProfileErrorBoundary from "./ProfileErrorBoundary";

export const ProfileModuleLayout = () => {
  const user = useSelector((state) => state.auth?.user);
  const location = useLocation();

  const subNavItems = [
    { path: "/profile/studio", label: "Identity Studio", icon: UserCheck },
    { path: "/profile", label: "Interactive Guide", icon: Sparkles },
    { path: "/profile/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/profile/guide", label: "Masterclass", icon: BookOpen },
  ];

  return (
    <ProfileErrorBoundary>
      <div className="space-y-6">
        {/* Module Sub-Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar-thin">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/profile"}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {user?.username && (
            <a
              href={`/p/${user.username}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
            >
              <span>/p/{user.username}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Child Routes */}
        <Outlet />
      </div>
    </ProfileErrorBoundary>
  );
};

export default ProfileModuleLayout;
