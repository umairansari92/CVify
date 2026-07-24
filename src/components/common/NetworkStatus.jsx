import React, { useEffect, useState } from "react";
import { WifiOff, SignalLow, CheckCircle2, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSlow, setIsSlow] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);
  const [dismissSlow, setDismissSlow] = useState(false);

  // 1. Online / Offline Listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (wasOffline) {
        setShowRestored(true);
        setTimeout(() => setShowRestored(false), 4000);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      setWasOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [wasOffline]);

  // 2. Network Speed / Connection Quality Detector (Native Network API)
  useEffect(() => {
    if (isOffline) return;

    const checkNetworkQuality = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (connection) {
        const slowTypes = ["slow-2g", "2g"];
        const isSlowType = slowTypes.includes(connection.effectiveType);
        const isHighRtt = connection.rtt && connection.rtt > 1500;
        const isLowDownlink = connection.downlink && connection.downlink < 0.5;

        if (isSlowType || isHighRtt || isLowDownlink) {
          setIsSlow(true);
          return;
        }
      }

      setIsSlow(false);
    };

    checkNetworkQuality();

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      connection.addEventListener("change", checkNetworkQuality);
      return () => connection.removeEventListener("change", checkNetworkQuality);
    }
  }, [isOffline]);

  // 3. Fallback Latency Monitor (for browsers without Network Info API or for latency spikes)
  useEffect(() => {
    if (isOffline) return;

    let isMounted = true;
    const interval = setInterval(async () => {
      if (!isMounted || !navigator.onLine) return;

      const startTime = performance.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch("/api/health", {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        });

        clearTimeout(timeoutId);
        const latency = performance.now() - startTime;

        if (isMounted && res.ok) {
          // If response latency > 3000ms, flag as slow connection
          if (latency > 3000) {
            setIsSlow(true);
          } else if (!navigator.connection) {
            setIsSlow(false);
          }
        }
      } catch {
        // Suppress network errors silently during offline transitions
      }
    }, 30000); // Check every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isOffline]);

  return (
    <AnimatePresence>
      {/* ─── 1. NO INTERNET (OFFLINE) OVERLAY ─── */}
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[9999] p-4 flex items-center justify-center pointer-events-auto"
        >
          <div className="max-w-md w-full bg-red-950/90 dark:bg-red-950/95 backdrop-blur-xl border border-red-500/40 rounded-2xl p-4 shadow-2xl text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 animate-pulse">
              <WifiOff className="w-6 h-6 text-red-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-black text-sm text-red-200">No Internet Connection</h4>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <p className="text-xs text-red-300/80 font-medium mt-0.5 leading-snug">
                You are currently offline. Changes will sync automatically once reconnected.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors text-xs font-bold flex items-center gap-1 flex-shrink-0 border border-red-500/30"
              title="Retry Connection"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── 2. RESTORED ONLINE TOAST ─── */}
      {!isOffline && showRestored && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-[9999] pointer-events-auto"
        >
          <div className="bg-emerald-950/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-3.5 shadow-2xl text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-xs text-emerald-200">Internet Restored!</h5>
              <p className="text-[11px] text-emerald-300/80 font-medium">You're back online. Platform fully synchronized.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 3. LOW / SLOW INTERNET BANNER ─── */}
      {!isOffline && isSlow && !dismissSlow && !showRestored && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-[9998] pointer-events-auto max-w-sm"
        >
          <div className="bg-amber-950/90 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-3.5 shadow-2xl text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 animate-pulse">
              <SignalLow className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="font-black text-xs text-amber-200 flex items-center gap-1.5">
                <span>Slow Network Detected</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">2G / Lag</span>
              </h5>
              <p className="text-[11px] text-amber-300/80 font-medium mt-0.5 leading-tight">
                Your connection seems slow. AI operations &amp; imports may take longer.
              </p>
            </div>

            <button
              onClick={() => setDismissSlow(true)}
              className="text-amber-400 hover:text-amber-200 font-bold text-xs p-1"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatus;
