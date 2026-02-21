import React from "react";
import { useSelector } from "react-redux";
import {
  FaGem,
  FaRocket,
  FaCopy,
  FaShareAlt,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const ReferralPage = () => {
  const { user } = useSelector((state) => state.auth);

  const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const steps = [
    {
      icon: <FaShareAlt size={24} />,
      text: "Share your unique link or code with friends.",
    },
    {
      icon: <FaHandHoldingHeart size={24} />,
      text: "They sign up and get 100 free diamonds.",
    },
    {
      icon: <FaGem size={24} className="text-blue-400" />,
      text: "You instantly receive 50 diamonds per referral!",
    },
  ];

  return (
    <div className="p-4 lg:p-10 max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-10 duration-700">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <FaRocket
            size={60}
            className="text-primary mx-auto relative z-10 animate-float"
          />
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-text-primary tracking-tighter">
          Spread the Love,{" "}
          <span className="text-primary italic">Earn Diamonds!</span>
        </h1>
        <p className="text-text-secondary text-lg font-medium opacity-80 max-w-2xl mx-auto italic">
          Invite your friends to CVify. For every friend who joins, you get 50
          Diamonds to boost your AI power!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center space-y-4 hover:border-primary/20 hover:scale-105 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
              {step.icon}
            </div>
            <p className="font-black text-text-primary leading-tight px-2">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="relative glass p-10 lg:p-16 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-1000"></div>

        <div className="relative z-10 space-y-10">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Your Unique Invite Link
              </label>
              <div className="flex bg-background/50 border border-border-subtle rounded-2xl p-1 items-center focus-within:ring-2 ring-primary/20 transition-all">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="bg-transparent border-none flex-1 px-4 text-xs lg:text-sm font-bold text-text-primary truncate"
                />
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="bg-primary hover:bg-primary-dark text-white p-3 lg:px-6 lg:py-3 rounded-xl transition-all flex items-center gap-2 group/btn"
                >
                  <FaCopy className="group-hover/btn:rotate-12 transition-transform" />
                  <span className="hidden lg:inline text-xs font-black uppercase">
                    Copy Link
                  </span>
                </button>
              </div>
            </div>

            <div className="md:w-48 space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
                Referral Code
              </label>
              <div className="flex bg-background/50 border border-border-subtle rounded-2xl p-4 items-center justify-between">
                <span className="font-black text-xl lg:text-2xl text-text-primary tracking-widest leading-none">
                  {user?.referralCode || "----"}
                </span>
                <button
                  onClick={() => copyToClipboard(user?.referralCode)}
                  className="text-text-secondary hover:text-secondary transition-colors"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 py-8 border-y border-white/5 border-dashed">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-50">
                  Current Balance
                </p>
                <p className="text-3xl font-black text-text-primary tracking-tight">
                  {user?.diamonds || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 animate-bounce">
                <FaGem size={24} />
              </div>
            </div>
          </div>

          <p className="text-center text-xs font-medium text-text-secondary italic opacity-60">
            * Monthly Bonus: You'll also get 20 diamonds automatically every
            month just for being awesome!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
