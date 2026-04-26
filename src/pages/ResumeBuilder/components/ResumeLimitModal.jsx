import React from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeLimitModal = ({ isOpen, onClose, onConfirm, currentCount, requiredDiamonds = 30 }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden p-8 sm:p-10 text-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Icon Header */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full border-[3px] border-[#3B82F6] flex items-center justify-center text-[#3B82F6]">
              <Info size={48} strokeWidth={1.5} />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Resume Limit Reached
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
            You already have {currentCount} resumes. To create a new one, you can either delete an old one or use {requiredDiamonds} diamonds.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onConfirm}
              className="flex-1 py-4 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Use {requiredDiamonds} Diamonds
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeLimitModal;
