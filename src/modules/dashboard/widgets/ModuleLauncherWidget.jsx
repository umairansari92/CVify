import React from "react";
import { m } from "framer-motion";
import { Badge } from "../../../components/ui/Badge";
import { FaFileAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

const resolveIcon = (iconString, size = 18) => {
  if (!iconString) return <FaFileAlt size={size} />;
  if (iconString.startsWith("Fa")) {
    const Icon = FaIcons[iconString];
    return Icon ? <Icon size={size} /> : <FaFileAlt size={size} />;
  }
  if (iconString.startsWith("Hi")) {
    const Icon = HiIcons[iconString];
    return Icon ? <Icon size={size} /> : <FaFileAlt size={size} />;
  }
  return <FaFileAlt size={size} />;
};

export const ModuleLauncherWidget = ({ data, navigate }) => {
  const modules = data?.modules || [];

  if (modules.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-text-primary tracking-tight">Career OS Modules</h2>
        <Badge variant="default">{modules.length} Active</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((mod) => (
          <m.div
            key={mod.manifest.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(mod.manifest.routes.main)}
            className="p-4 rounded-2xl bg-midground border border-border-subtle cursor-pointer hover:border-primary/40 transition-all duration-200 flex flex-col gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${mod.manifest.color}15`, color: mod.manifest.color }}>
              {resolveIcon(mod.manifest.icon, 18)}
            </div>
            <div>
              <h3 className="text-xs font-bold text-text-primary mb-0.5 group-hover:text-primary transition-colors">{mod.manifest.name}</h3>
              <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">{mod.manifest.description}</p>
            </div>
            <div className="flex items-center gap-1 mt-auto">
              <span className="text-[11px] text-text-muted font-medium">Open</span>
              <FiArrowRight size={11} className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
};
