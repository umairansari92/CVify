import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiAlertTriangle, FiHome } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../api/axios";

const Maintenance = () => {
  const [message, setMessage] = useState("CVify is currently undergoing maintenance. Please check back later.");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/system/status`);
        if (response.data.message) {
          setMessage(response.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch maintenance status");
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FiSettings className="w-10 h-10 text-red-500 animate-spin-slow" style={{ animation: 'spin 4s linear infinite' }} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">Under Maintenance</h1>
        
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
          <FiAlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-amber-800 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <p className="text-slate-600 mb-8 px-4">
          We're performing some essential upgrades to improve your experience. We'll be back online shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            to="/login" 
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            <FiHome className="w-4 h-4" />
            Go to Home
          </Link>
          <p className="text-xs text-slate-400 mt-4">
            If you are an administrator, you can <Link to="/login" className="text-red-500 hover:underline">log in</Link> to access the platform.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Maintenance;
