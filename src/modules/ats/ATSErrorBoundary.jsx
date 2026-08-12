import React from "react";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

class ATSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ ATS Module Isolated Exception:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/ats";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 shadow-lg shadow-red-500/5">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-100 mb-2">
            ATS Intelligence Module Interrupted
          </h2>
          
          <p className="text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
            An isolated exception occurred within the ATS Intelligence System. Your saved resumes, user session, and other CVify Pro features remain 100% operational.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Reload ATS System
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700 transition-all active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4" />
              Return to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ATSErrorBoundary;
