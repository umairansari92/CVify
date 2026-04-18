import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { m } from "framer-motion";
import { FaRocket, FaGem } from "react-icons/fa";

const AnalyticsCharts = ({ smartAnalytics }) => {
  if (!smartAnalytics) return null;

  const funnelData = [
    { name: "Total", value: smartAnalytics.funnel.total, fill: "#64748b" },
    { name: "Active", value: smartAnalytics.funnel.active, fill: "#3b82f6" },
    { name: "Complete", value: smartAnalytics.funnel.completed, fill: "#10b981" },
  ];

  const diamondData = smartAnalytics.diamondFlow.map((d) => ({
    name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
    value: Math.abs(d.total),
  }));

  const COLORS = ["#10b981", "#f43f5e"]; // Credit vs Debit

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Platform Health Funnel */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-6 min-h-[400px]"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <FaRocket />
          </div>
          <div>
            <h3 className="text-xl font-black text-text-primary tracking-tight">Health Funnel</h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">User retention & profile completion</p>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
            <BarChart data={funnelData}>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                itemStyle={{ color: "#fff", fontWeight: "bold" }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </m.div>

      {/* Diamond Economy Flow */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card p-6 min-h-[400px]"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <FaGem />
          </div>
          <div>
            <h3 className="text-xl font-black text-text-primary tracking-tight">Economy Flow</h3>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Total Income vs Spending (7 Days)</p>
          </div>
        </div>

        <div className="h-[280px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
            <PieChart>

              <Pie
                data={diamondData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {diamondData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                itemStyle={{ color: "#fff", fontWeight: "bold" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center">
             <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">Flow</span>
             <span className="text-xl font-black text-text-primary tracking-tighter">7D</span>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default AnalyticsCharts;
