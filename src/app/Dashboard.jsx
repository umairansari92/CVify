import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { m } from "framer-motion";
import { ModuleRegistry } from "../core/registry/ModuleRegistry";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

// Helper to resolve icon from string
const resolveIcon = (iconString) => {
  if (iconString && iconString.startsWith("Fa")) {
    const Icon = FaIcons[iconString];
    return Icon ? <Icon size={24} /> : <FaIcons.FaFileAlt size={24} />;
  }
  if (iconString && iconString.startsWith("Hi")) {
    const Icon = HiIcons[iconString];
    return Icon ? <Icon size={24} /> : <FaIcons.FaFileAlt size={24} />;
  }
  return <FaIcons.FaFileAlt size={24} />;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    setModules(ModuleRegistry.getModules());
  }, []);

  const healthScore = user?.completionScore || 45;

  return (
    <div className="space-y-12 lg:space-y-16 pb-20 max-w-7xl mx-auto p-6">
      {/* CAREER OS HEADER */}
      <div className="relative p-10 lg:p-14 overflow-hidden rounded-3xl bg-bg-secondary border border-border-subtle shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              CVifyPro Command Center
            </h1>
            <p className="text-xl text-text-secondary font-medium">
              Welcome back, <span className="text-primary font-bold">{user?.name?.split(' ')[0] || "User"}</span>.
            </p>
          </div>
          <div className="flex justify-end items-center">
             <div className="text-right">
                <span className="text-5xl font-bold text-text-primary">{healthScore}%</span>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-2">Career Health Score</p>
             </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODULE LAUNCHER */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Active Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <m.div
              key={mod.manifest.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(mod.manifest.routes.main)}
              className="p-6 rounded-3xl bg-midground border border-border-subtle cursor-pointer hover:border-primary/50 transition-colors flex flex-col items-start gap-4"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${mod.manifest.color}15`, color: mod.manifest.color }}
              >
                {resolveIcon(mod.manifest.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">{mod.manifest.name}</h3>
                <p className="text-sm text-text-muted">{mod.manifest.description}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {mod.manifest.features.map(feat => (
                  <span key={feat} className="px-2 py-1 bg-white/5 text-text-secondary text-[10px] font-bold uppercase rounded-md">
                    {feat}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
          {modules.length === 0 && (
             <div className="col-span-full text-center p-12 border border-dashed border-border-subtle rounded-3xl text-text-muted">
                No modules registered in the system.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
