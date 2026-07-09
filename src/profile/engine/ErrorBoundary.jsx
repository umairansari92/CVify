import React from "react";
import { Link } from "react-router-dom";

/**
 * ErrorBoundary — Catches runtime errors thrown by theme components.
 * Displays a neutral fallback so the engine never crashes entirely.
 * Themes are isolated — one broken theme cannot break the engine.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[CVify Theme Engine] Theme render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-black mb-2 uppercase tracking-widest">Theme Error</h1>
          <p className="text-slate-400 text-sm mb-2 max-w-md">
            This theme encountered a runtime error and could not render.
            Switch to another theme or contact support.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="text-xs text-red-400 bg-black/30 p-4 rounded-xl max-w-lg overflow-auto mt-4 text-left">
              {this.state.error.toString()}
            </pre>
          )}
          <Link to="/" className="mt-8 px-8 py-3 bg-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
            Back to Dashboard
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
