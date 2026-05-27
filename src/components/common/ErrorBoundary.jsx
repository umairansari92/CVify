import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Check if the error is a Vite dynamic import chunk error
    if (
      error.message && 
      (error.message.includes("Failed to fetch dynamically imported module") || 
       error.message.includes("Importing a module script failed"))
    ) {
      console.warn("Chunk load error detected. Forcing page reload to fetch latest assets...");
      // Add a flag to sessionStorage to prevent infinite reload loops just in case
      if (!sessionStorage.getItem("cvify_chunk_reloaded")) {
        sessionStorage.setItem("cvify_chunk_reloaded", "true");
        window.location.reload(true);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <h1 className="text-2xl font-black mb-4">Updating CVify...</h1>
          <p className="text-slate-400 mb-8 max-w-md">We are syncing the latest version of the application to your browser. Please wait a moment.</p>
          <button 
            onClick={() => {
              sessionStorage.removeItem("cvify_chunk_reloaded");
              window.location.reload(true);
            }}
            className="px-6 py-3 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl"
          >
            Force Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
