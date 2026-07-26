import React from "react";
import { MetricCard } from "../../../components/ui/MetricCard";
import { FiActivity } from "react-icons/fi";
import { FaFileSignature, FaSearchPlus, FaEnvelopeOpenText } from "react-icons/fa";

export const CareerMetricsWidget = ({ data }) => {
  const metrics = data?.metrics || {};

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <MetricCard title="Career Health" value={`${metrics.healthScore || 0}/100`} trend={5} subtext="from last week" icon={FiActivity} />
      <MetricCard title="Active Resumes" value={metrics.resumesCount || 0} icon={FaFileSignature} />
      <MetricCard title="ATS Scans" value={metrics.atsScansCount || 0} icon={FaSearchPlus} />
      <MetricCard title="Cover Letters" value={metrics.coverLettersCount || 0} icon={FaEnvelopeOpenText} />
    </div>
  );
};
