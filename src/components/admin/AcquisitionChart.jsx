import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const AcquisitionChart = ({ data }) => {
  if (!data?.userGrowth) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 min-h-[400px]"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-black text-text-primary">User Acquisition</h3>
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">
            Growth over last 6 months
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black tracking-widest uppercase border border-blue-500/20">
          Real-time
        </div>
      </div>
      
      <div className="h-[300px] min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} aspect={2.5}>
          <AreaChart data={data.userGrowth}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="_id"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              name="New Users"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default React.memo(AcquisitionChart);
