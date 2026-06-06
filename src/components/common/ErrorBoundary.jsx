import React from "react";

/**
 * ErrorBoundary — catches chunk-load failures that happen when a new
 * deployment changes Vite asset hashes while the user still has the old
 * cached bundle open. Shows a clear countdown and auto-reloads once.
 *
 * Loop prevention: sessionStorage flag stops an infinite reload chain in
 * case the new deployment itself is broken.
 */

// ─── Inner countdown UI (function component so it can use hooks) ─────────────
class CountdownReloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 3 };
    this._timer = null;
  }

  componentDidMount() {
    this._timer = setInterval(() => {
      this.setState(prev => {
        if (prev.seconds <= 1) {
          clearInterval(this._timer);
          sessionStorage.removeItem("cvify_chunk_reloaded");
          window.location.reload(true);
          return { seconds: 0 };
        }
        return { seconds: prev.seconds - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  forceReloadNow = () => {
    clearInterval(this._timer);
    sessionStorage.removeItem("cvify_chunk_reloaded");
    window.location.reload(true);
  };

  render() {
    const { seconds } = this.state;
    const circumference = 2 * Math.PI * 28; // r=28
    const progress = circumference - (seconds / 3) * circumference;

    return (
      <div className="min-h-screen bg-[#0c1120] text-white flex flex-col items-center justify-center p-6 text-center gap-6">

        {/* Ring countdown timer */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-2">
          <svg className="absolute inset-0 -rotate-90" width="96" height="96" viewBox="0 0 64 64">
            {/* Track */}
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            {/* Progress arc */}
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              style={{ transition: "stroke-dashoffset 0.8s linear" }}
            />
          </svg>
          <span className="text-3xl font-black tabular-nums text-white">{seconds}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight">New version detected</h1>
          <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
            A fresh build was just deployed. Reloading in <strong className="text-white">{seconds}s</strong> to apply it.
          </p>
        </div>

        <button
          onClick={this.forceReloadNow}
          className="mt-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Reload Now
        </button>

        <p className="text-[10px] text-slate-600 uppercase tracking-widest">
          This only happens once after a deployment
        </p>
      </div>
    );
  }
}

// ─── Manual fallback (shown if auto-reload already ran and error persists) ────
const ManualFallback = () => (
  <div className="min-h-screen bg-[#0c1120] text-white flex flex-col items-center justify-center p-6 text-center gap-6">
    <div className="text-5xl mb-2">⚠️</div>
    <h1 className="text-2xl font-black tracking-tight">Something went wrong</h1>
    <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
      We tried reloading automatically but the error persists.
      Please try clearing your browser cache or reloading manually.
    </p>
    <button
      onClick={() => {
        sessionStorage.removeItem("cvify_chunk_reloaded");
        window.location.reload(true);
      }}
      className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
    >
      Try Again
    </button>
  </div>
);

// ─── Main ErrorBoundary ───────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    const isChunkError =
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.message?.includes("Importing a module script failed") ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("ChunkLoadError");

    return { hasError: true, isChunkError };
  }

  componentDidCatch(error, errorInfo) {
    const isChunkError =
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.message?.includes("Importing a module script failed") ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("ChunkLoadError");

    if (isChunkError) {
      console.warn("[ErrorBoundary] Chunk load error — new deployment detected.");
      // If not reloaded yet: CountdownReloader handles it
      // If already reloaded: ManualFallback shows
    } else {
      // Non-chunk error: log it for debugging
      console.error("[ErrorBoundary] Unexpected error:", error, errorInfo);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.state.isChunkError) {
      // First time: show countdown + auto-reload
      if (!sessionStorage.getItem("cvify_chunk_reloaded")) {
        sessionStorage.setItem("cvify_chunk_reloaded", "true");
        return <CountdownReloader />;
      }
      // Already reloaded and still failing: show manual fallback
      return <ManualFallback />;
    }

    // Non-chunk error fallback
    return <ManualFallback />;
  }
}

export default ErrorBoundary;
