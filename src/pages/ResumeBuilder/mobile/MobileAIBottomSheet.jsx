import React, { useState } from "react";
import { Sparkles, Zap, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeData } from "../../../features/resume/resumeSlice";
import { updateDiamonds } from "../../../features/auth/authSlice";
import api from "../../../api/axios";
import toast from "react-hot-toast";

const MobileAIBottomSheet = ({ isOpen, onClose, initialPrompt = "" }) => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [isExecuting, setIsExecuting] = useState(false);

  if (!isOpen) return null;

  const presets = [
    "🚀 Executive Tone",
    "🎯 Tailor for Sr Engineer",
    "📈 Quantify Metrics",
    "🌐 Fix Typos & Grammar",
  ];

  const handleExecute = async (customPrompt) => {
    const targetPrompt = customPrompt || prompt;
    if (!targetPrompt.trim()) return;

    const COST = 30;
    if ((user?.diamonds || 0) < COST) {
      toast.error(`Insufficient Diamonds! You need ${COST} 💎 balance: ${user?.diamonds || 0}`);
      return;
    }

    setIsExecuting(true);
    const toastId = toast.loading(`AI Co-Pilot processing...`);
    try {
      const response = await api.post("/resume-intelligence/optimize-intent", {
        currentResume,
        intent: targetPrompt,
      });

      if (response.data.success) {
        dispatch(setResumeData(response.data.data));
        if (response.data.newDiamondBalance !== undefined) {
          dispatch(updateDiamonds(response.data.newDiamondBalance));
        }
        toast.success(response.data.message || "Resume optimized!", { id: toastId });
        setPrompt("");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "AI failed to process intent", { id: toastId });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
      <div className="w-full bg-slate-900 rounded-t-3xl border-t border-white/10 p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                CVify AI Co-Pilot
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                Reserve: <span className="text-primary font-bold">{user?.diamonds || 0} 💎</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => handleExecute(preset)}
              disabled={isExecuting}
              className="py-2.5 px-3 bg-slate-950/80 border border-white/5 hover:border-primary/40 rounded-xl text-[10px] font-black uppercase text-slate-300 hover:text-white text-left truncate transition-all"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type custom prompt e.g. 'Highlight Cloud Architecture skills'"
            className="w-full bg-slate-950 border border-white/10 focus:border-primary text-xs text-white placeholder:text-slate-500 rounded-xl p-3 outline-none"
          />

          <button
            onClick={() => handleExecute()}
            disabled={isExecuting || !prompt.trim()}
            className="w-full py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-30"
          >
            {isExecuting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Zap size={14} />
                <span>Execute AI Command (30 💎)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAIBottomSheet;
