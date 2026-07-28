/**
 * MetricsRow.jsx — Executive Resume Metrics (4 Cards)
 * All values computed from Redux resumes array — zero hardcoded data.
 */

import React from "react";
import { m } from "framer-motion";
import { FaFilePdf, FaChartLine, FaTrophy, FaGlobe } from "react-icons/fa";
import Card from "../../../components/ui/Card";

const MetricCard = ({ icon: Icon, iconBg, iconColor, label, value, sub }) => (
  <m.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card variant="glass" className="p-4 border border-border-subtle flex items-center gap-4 hover:border-primary/30 transition-all">
      <div className={`w-11 h-11 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-text-muted">{label}</p>
        <h3 className="text-xl font-bold text-text-primary mt-0.5 leading-none">{value}</h3>
        {sub && <p className="text-[10px] text-text-muted mt-0.5">{sub}</p>}
      </div>
    </Card>
  </m.div>
);

const MetricsRow = ({ metrics }) => {
  const { total, avgAts, bestAts, publicCount, privateCount } = metrics;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon={FaFilePdf}
        iconBg="bg-blue-500/10"
        iconColor="text-blue-400"
        label="Total Resumes"
        value={total}
        sub={total === 1 ? "1 document" : `${total} documents`}
      />
      <MetricCard
        icon={FaChartLine}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-400"
        label="Avg ATS Score"
        value={avgAts > 0 ? `${avgAts}` : "—"}
        sub={avgAts > 0 ? (avgAts >= 75 ? "Above average" : "Needs improvement") : "No scans yet"}
      />
      <MetricCard
        icon={FaTrophy}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-400"
        label="Best ATS"
        value={bestAts > 0 ? `${bestAts}` : "—"}
        sub={bestAts > 0 ? "Your strongest resume" : "Run a scan first"}
      />
      <MetricCard
        icon={FaGlobe}
        iconBg="bg-purple-500/10"
        iconColor="text-purple-400"
        label="Visibility"
        value={`${publicCount} / ${total}`}
        sub={`${publicCount} public · ${privateCount} private`}
      />
    </div>
  );
};

export default MetricsRow;
