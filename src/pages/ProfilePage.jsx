import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBriefcase, FaGraduationCap, FaTools, FaLaptopCode, FaShieldAlt, FaPalette, FaGem, FaCheckCircle, FaRocket } from 'react-icons/fa';

// Modular Form Imports
import PersonalInfoForm from '../components/profile-forms/PersonalInfoForm';
import BrandingForm from '../components/profile-forms/BrandingForm';
import SocialLinksForm from '../components/profile-forms/SocialLinksForm';
import ExperienceManager from '../components/profile-forms/ExperienceManager';
import EducationManager from '../components/profile-forms/EducationManager';
import SkillsServicesManager from '../components/profile-forms/SkillsServicesManager';
import AwardsManager from '../components/profile-forms/AwardsManager';
import ProjectsManager from '../components/profile-forms/ProjectsManager';
import SecuritySettings from '../components/profile-forms/SecuritySettings';
import ThemeEditor from '../components/profile/ThemeEditor';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('identity');

  const tabs = [
    { id: 'identity', label: 'Identity', icon: <FaUser />, color: 'cyan' },
    { id: 'branding', label: 'Branding', icon: <FaRocket />, color: 'violet' },
    { id: 'portfolio', label: 'Portfolio', icon: <FaLaptopCode />, color: 'emerald' },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase />, color: 'blue' },
    { id: 'education', label: 'Education', icon: <FaGraduationCap />, color: 'amber' },
    { id: 'expertise', label: 'Expertise', icon: <FaTools />, color: 'rose' },
    { id: 'credentials', label: 'Credentials', icon: <FaCheckCircle />, color: 'teal' },
    { id: 'security', label: 'Security', icon: <FaShieldAlt />, color: 'slate' },
    { id: 'theme', label: 'Theme Designer', icon: <FaPalette />, color: 'indigo' },
  ];

  // Calculate Profile Completion (Simplified logic for the new UI)
  const calculateStrength = () => {
    if (!user) return 0;
    let score = 0;
    if (user.profileImage) score += 10;
    if (user.bio || user.summary) score += 15;
    if (user.experience?.length > 0) score += 20;
    if (user.projects?.length > 0) score += 20;
    if (user.skills?.length > 0) score += 15;
    if (user.education?.length > 0) score += 10;
    if (Object.keys(user.socialLinks || {}).length > 0) score += 10;
    return score;
  };

  const strength = calculateStrength();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* --- DASHBOARD HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Builder Dashboard V5.1</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-none">
              Refine Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic">Digital Identity</span>.
            </h1>
            <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
              Every detail you add here powers your high-impact public portfolio. Focus on results, not just roles.
            </p>
          </div>

          <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-xl">
            <div className="relative">
                <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                    <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={226} strokeDashoffset={226 - (226 * strength) / 100} className="text-cyan-500 transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xs">
                    {strength}%
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Profile Strength</p>
                <div className="flex items-center gap-2 text-cyan-400 font-black">
                    <FaGem size={14} className="animate-bounce" />
                    <span>{user?.diamonds || 0} Builder Points</span>
                </div>
            </div>
          </div>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar no-scrollbar border-b border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl whitespace-nowrap transition-all duration-300 font-black text-xs uppercase tracking-widest ${
                activeTab === tab.id
                  ? `bg-${tab.color}-600/10 text-${tab.color}-400 border border-${tab.color}-500/30 shadow-[0_0_20px_-5px_rgba(6,182,212,0.1)]`
                  : 'bg-white/[0.02] text-white/40 border border-white/5 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={activeTab === tab.id ? `text-${tab.color}-400` : 'text-white/20'}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

          {activeTab === 'identity' && <PersonalInfoForm />}
          {activeTab === 'branding' && <BrandingForm />}
          {activeTab === 'portfolio' && <ProjectsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'education' && <EducationManager />}
          {activeTab === 'expertise' && <SkillsServicesManager />}
          {activeTab === 'credentials' && <AwardsManager />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'theme' && <ThemeEditor />}

          <AnimatePresence>
            {!tabs.find(t => t.id === activeTab) && (
                <div className="text-center py-20">
                    <p className="text-white/20 font-black uppercase tracking-widest italic animate-pulse">Initializing Component...</p>
                </div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-8 flex justify-center">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                All edits are synchronized in real-time with your <a href={`/p/${user?.username}`} target="_blank" className="text-cyan-500/50 hover:text-cyan-400 transition-colors">public portfolio website</a>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
