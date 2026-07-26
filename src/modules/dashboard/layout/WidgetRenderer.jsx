import React, { Component } from "react";
import Card from "../../../components/ui/Card";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

class WidgetErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`[WidgetError] Widget ${this.props.widgetId || 'unknown'} crashed:`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card variant="glass" className="p-6 border-red-500/20 bg-red-500/5 text-center flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
            <FiAlertCircle size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary mb-1">
              {this.props.title || "Widget Temporarily Unavailable"}
            </h4>
            <p className="text-[11px] text-text-muted">
              An error occurred while loading this section.
            </p>
          </div>
          <button
            onClick={this.handleRetry}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary font-bold text-[11px] flex items-center gap-1.5 border border-border-subtle transition-all"
          >
            <FiRefreshCw size={12} />
            <span>Retry</span>
          </button>
        </Card>
      );
    }

    return this.props.children;
  }
}

export const WidgetRenderer = ({ widget, data, user, navigate }) => {
  if (!widget || !widget.component) return null;

  const Component = widget.component;

  return (
    <WidgetErrorBoundary widgetId={widget.id} title={widget.title}>
      <Component
        widget={widget}
        data={data}
        user={user}
        navigate={navigate}
      />
    </WidgetErrorBoundary>
  );
};
