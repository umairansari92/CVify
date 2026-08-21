import React, { Component } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export class ProfileErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ProfileErrorBoundary] Captured module fault:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] flex items-center justify-center p-6 bg-[var(--background)]">
          <div className="max-w-md w-full bg-[var(--surface)] border border-red-500/20 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Digital Identity Studio Sandbox Fault
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                The Profile module encountered an isolated exception. Other areas of your Career OS remain fully operational.
              </p>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Studio
              </button>
              <a
                href="/dashboard"
                className="px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] text-[var(--text-secondary)] text-xs font-bold flex items-center gap-2 hover:text-[var(--text-primary)] transition-all border border-[var(--border)]"
              >
                <Home className="w-3.5 h-3.5" />
                Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ProfileErrorBoundary;
