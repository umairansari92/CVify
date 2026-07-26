import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { m, AnimatePresence } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";

// Redux
import { fetchDashboardData } from "../../features/dashboard/dashboardThunk";
import { selectDashboardData, selectDashboardLoading, selectIsRefreshing } from "../../features/dashboard/dashboardSlice";

// Registry & Layout Engine
import { WidgetRegistry } from "./registry/WidgetRegistry";
import { initializeDashboardWidgets } from "./registry/initWidgets";
import { DashboardGrid } from "./layout/DashboardGrid";
import { getWidgetSpanClass } from "./layout/LayoutEngine";
import { WidgetRenderer } from "./layout/WidgetRenderer";

// Service Composer
import { dashboardService } from "./services/dashboard.service";
import SkeletonLoader from "../../components/ui/SkeletonLoader";

// Initialize Widget Registry
initializeDashboardWidgets();

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth?.user);
  const rawDashboard = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Compose clean dashboard state via SRP Service
  const composedState = useMemo(() => {
    return dashboardService.composeDashboardState(authUser, rawDashboard);
  }, [authUser, rawDashboard]);

  // Get active registered widgets
  const registeredWidgets = useMemo(() => {
    return WidgetRegistry.getWidgets(authUser);
  }, [authUser]);

  if (loading && !rawDashboard?.resumes) {
    return (
      <div className="min-h-screen p-6 lg:p-10 space-y-8">
        <SkeletonLoader className="h-52 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="h-28" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-48" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-10 pb-20 max-w-[1400px] mx-auto">
      <DashboardGrid>
        {registeredWidgets.map((widget) => {
          const spanClass = getWidgetSpanClass(widget.span);
          return (
            <div key={widget.id} className={spanClass}>
              <WidgetRenderer
                widget={widget}
                data={composedState}
                user={authUser}
                navigate={navigate}
              />
            </div>
          );
        })}
      </DashboardGrid>

      {/* Syncing indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 right-10 z-[100] glass-strong px-5 py-3 rounded-full border border-primary/30 flex items-center gap-3 shadow-glow-primary"
          >
            <FiRefreshCw className="animate-spin text-primary" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Syncing</span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
