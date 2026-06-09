import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import {
  FaGem,
  FaRocket,
  FaCopy,
  FaShareAlt,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import Card from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";

const ReferralPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalReferred: 0,
    activeReferrals: 0,
    pendingReferrals: 0,
    potentialDiamonds: 0,
    earnedDiamonds: 0,
  });
  const [loading, setLoading] = useState(true);

  const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode}`;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/auth/referral-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch referral stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const steps = [
    { icon: <FaShareAlt size={20} />, text: "Share your unique link or code with friends." },
    { icon: <FaHandHoldingHeart size={20} />, text: "They sign up and get 100 free diamonds." },
    { icon: <FaRocket size={20} />, text: "Invitees must save at least one resume." },
    { icon: <FaGem size={20} />, text: "You receive 50 diamonds when they save it!" },
  ];

  return (
    <div className="p-4 lg:p-10 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-glow-primary">
          <FaRocket size={36} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
          Earn Diamonds
        </h1>
        <p className="text-text-secondary font-medium opacity-70 max-w-2xl mx-auto">
          Invite your friends to CVify. For every friend who joins, you get 50
          Diamonds to boost your AI power!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <Card key={idx} variant="elevated" className="!p-6 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {step.icon}
            </div>
            <p className="font-semibold text-sm text-text-primary leading-snug">
              {step.text}
            </p>
          </Card>
        ))}
      </div>

      <Card variant="glass" className="p-8 lg:p-12 space-y-8 glow-primary">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="flex-1 space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
              Your Unique Invite Link
            </label>
            <div className="flex bg-bg-primary border border-border-subtle rounded-xl p-1 items-center focus-within:border-primary transition-all">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-transparent border-none flex-1 px-4 text-xs lg:text-sm font-bold text-text-primary truncate outline-none"
              />
              <button
                onClick={() => copyToClipboard(referralLink)}
                className="bg-primary hover:bg-primary/80 text-white p-3 lg:px-5 lg:py-3 rounded-lg transition-all flex items-center gap-2"
              >
                <FaCopy />
                <span className="hidden lg:inline text-xs font-bold">Copy</span>
              </button>
            </div>
          </div>

          <div className="md:w-48 space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
              Referral Code
            </label>
            <div className="flex bg-bg-primary border border-border-subtle rounded-xl p-4 items-center justify-between">
              <span className="font-black text-xl text-text-primary tracking-widest">
                {user?.referralCode || "----"}
              </span>
              <button
                onClick={() => copyToClipboard(user?.referralCode)}
                className="text-text-muted hover:text-primary transition-colors"
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border-subtle">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Total Referred</p>
            <p className="text-2xl font-black text-text-primary">{stats.totalReferred}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-warning mb-1">Pending</p>
            <p className="text-2xl font-black text-warning">{stats.pendingReferrals}
              <span className="text-xs ml-1 opacity-70">({stats.potentialDiamonds} 💎)</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-success mb-1">Active</p>
            <p className="text-2xl font-black text-success">{stats.activeReferrals}</p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Balance</p>
              <p className="text-2xl font-black text-text-primary">{user?.diamonds || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FaGem size={18} />
            </div>
          </div>
        </div>

        <p className="text-center text-xs font-medium text-text-muted opacity-60">
          * Monthly Bonus: You'll also get 20 diamonds automatically every month just for being awesome!
        </p>
      </Card>
    </div>
  );
};

export default ReferralPage;
