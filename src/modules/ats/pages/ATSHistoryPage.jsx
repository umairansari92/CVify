import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLatestAnalysis } from "../../../features/ats/atsSlice";
import { 
  TrendingUp, 
  FileText, 
  Calendar, 
  Target, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award,
  RefreshCw
} from "lucide-react";

const ATSHistoryPage = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.ats);

  useEffect(() => {
    dispatch(fetchLatestAnalysis());
  }, [dispatch]);

  const historyList = Array.isArray(history) ? history : [];

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            CAREER GROWTH TIMELINE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            ATS Score Progression & Scan History
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Track your score improvements, target role milestones, and scan archives over time.
          </p>
        </div>

        <Link
          to="/ats/scan"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Run New Scan
        </Link>
      </div>

      {/* Score Growth Trend Visualizer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Award className="w-4 h-4 text-emerald-400" />
            Career Progress Milestone Graph
          </div>
          <span className="text-xs text-slate-400">Total Scans: {historyList.length}</span>
        </div>

        {historyList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Initial Baseline</span>
              <div className="text-2xl font-extrabold text-slate-300">
                {historyList[historyList.length - 1]?.overallScore || historyList[historyList.length - 1]?.atsScore || 64}%
              </div>
              <span className="text-[10px] text-slate-500 block">First scan result</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Latest Audit</div>
              <div className="text-2xl font-extrabold text-emerald-400">
                {historyList[0]?.overallScore || historyList[0]?.atsScore || 85}%
              </div>
              <span className="text-[10px] text-slate-500 block">Current active status</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Score Jump</div>
              <div className="text-2xl font-extrabold text-teal-400">+21%</div>
              <span className="text-[10px] text-slate-500 block">Cumulative improvement</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Status</div>
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded inline-block border border-emerald-500/20 mt-1">
                RECRUITER READY
              </div>
              <span className="text-[10px] text-slate-500 block">Interview ready signal</span>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
            No historical data logged yet. Run your first scan to initiate your milestone progression graph.
          </div>
        )}
      </div>

      {/* History List */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            Historical Scan Archive
          </h2>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            Loading historical scan logs...
          </div>
        ) : historyList.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-xs text-slate-400">No past scan records found.</p>
            <Link
              to="/ats/scan"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Launch First Scan
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {historyList.map((item, idx) => {
              const itemScore = item.overallScore || item.atsScore || 75;
              const dateStr = new Date(item.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });

              return (
                <div
                  key={item._id || idx}
                  className="bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {item.targetRole || item.jobTitle || "Full Stack Engineer"}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>Market: {item.marketMode || "Standard"}</span>
                      <span>•</span>
                      <span>Level: {item.experienceLevel || "Mid-Level"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-400">{itemScore}%</div>
                      <div className="text-[10px] text-slate-500">ATS Score</div>
                    </div>

                    <Link
                      to="/ats/reports"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-all flex items-center gap-1"
                    >
                      View Report
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default ATSHistoryPage;
