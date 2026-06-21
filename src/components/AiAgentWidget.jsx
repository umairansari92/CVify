import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAgentStream } from '../hooks/useAgentStream';

// ── Render contact/external links as premium glassmorphism buttons ──
const MarkdownComponents = {
  a: ({ node, ...props }) => {
    const isContactLink =
      props.href?.startsWith('mailto:') ||
      props.href?.startsWith('https://wa.me/') ||
      props.href?.includes('linkedin.com') ||
      props.href?.startsWith('tel:') ||
      props.href?.includes('github.com');

    if (isContactLink) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 mb-1 mr-2 px-4 py-2 bg-teal-500/10 hover:bg-teal-500/25 text-teal-400 border border-teal-500/30 rounded-xl transition-all duration-300 font-medium text-xs tracking-wide shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_20px_rgba(20,184,166,0.25)] backdrop-blur-md"
        >
          {props.children}
        </a>
      );
    }
    return (
      <a
        className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => <ul className="space-y-1 my-1" {...props} />,
  li: ({ node, ...props }) => <li className="flex gap-2 items-start"><span className="text-teal-400 mt-1 shrink-0">•</span><span {...props} /></li>,
};

// ── Dynamically generates quick action buttons based on available profile data ──
const buildQuickActions = (profile) => {
  if (!profile) return [];
  const actions = [];

  // Always present
  actions.push({ icon: '🧑', label: 'Introduce Candidate', prompt: `Give me a concise professional introduction of this candidate.` });

  if (Array.isArray(profile.experience) && profile.experience.length > 0) {
    actions.push({ icon: '💼', label: 'Show Experience', prompt: `Summarize ${[profile.firstName, profile.lastName].filter(Boolean).join(' ')}'s work experience.` });
  }

  const projects = Array.isArray(profile.projects) ? profile.projects : (Array.isArray(profile.portfolio) ? profile.portfolio : []);
  if (projects.length > 0) {
    actions.push({ icon: '🚀', label: 'View Projects', prompt: `Show me the notable projects from this portfolio.` });
  }

  if (Array.isArray(profile.skills) && profile.skills.length > 0) {
    actions.push({ icon: '🛠', label: 'Explore Skills', prompt: `What technologies and skills does this candidate have?` });
  }

  if (Array.isArray(profile.certifications) && profile.certifications.length > 0) {
    actions.push({ icon: '🎓', label: 'Certifications', prompt: `What certifications does this candidate hold?` });
  }

  if (Array.isArray(profile.testimonials) && profile.testimonials.length > 0) {
    actions.push({ icon: '⭐', label: 'Testimonials', prompt: `Show testimonials from this candidate's profile.` });
  }

  // Contact — show if any contact channel exists
  const hasContact = profile.email || profile.phoneNumber ||
    profile.socialLinks?.linkedin || profile.socialLinks?.github;
  if (hasContact) {
    actions.push({ icon: '📞', label: 'Contact Candidate', prompt: `How can I contact this candidate?` });
  }

  return actions;
};

export const AiAgentWidget = ({ profileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  const ownerName = profileData
    ? [profileData.firstName, profileData.lastName].filter(Boolean).join(' ') || profileData.name || 'the candidate'
    : 'the candidate';

  const apiUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/agent/stream`
    : '/api/agent/stream';

  const { messages, sendMessage, isTyping } = useAgentStream(apiUrl, profileData);

  // Compute quick actions once when profile data is available
  const quickActions = useMemo(() => buildQuickActions(profileData), [profileData]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[560px] flex flex-col bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="px-5 py-4 border-b border-slate-700/40 bg-slate-800/60 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400/30 to-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400 text-xs font-black">
                    AI
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm tracking-wide leading-none">
                    {ownerName}'s AI Representative
                  </h3>
                  <p className="text-teal-400/50 text-[10px] tracking-widest uppercase mt-0.5">
                    Portfolio Guide · Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Chat Area ── */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}
            >
              {/* Empty state: intro + quick action buttons */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Intro card */}
                  <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl rounded-tl-sm p-4 space-y-1">
                    <p className="text-slate-200 text-sm font-medium">
                      👋 Hi! I represent <span className="text-teal-400 font-semibold">{ownerName}</span>.
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      I can help you quickly learn about their experience, projects, skills, and how to get in touch.
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
                  {quickActions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest px-1">Quick explore</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleQuickAction(action.prompt)}
                            disabled={isTyping}
                            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/50 hover:border-teal-500/40 rounded-xl text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="text-sm">{action.icon}</span>
                            {action.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Message thread */}
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === 'user'
                        ? 'bg-teal-500/20 text-teal-50 border border-teal-500/25 rounded-tr-sm'
                        : 'bg-slate-800/80 text-slate-200 border border-slate-700/40 rounded-tl-sm'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown components={MarkdownComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-slate-700/40 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-teal-400/70 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-teal-400/70 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 bg-teal-400/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}

              <div ref={endOfMessagesRef} />
            </div>

            {/* ── Input Area ── */}
            <div className="p-3 bg-slate-800/50 border-t border-slate-700/40 shrink-0">
              <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask about ${ownerName}...`}
                  disabled={isTyping}
                  className="flex-1 bg-slate-900/70 text-slate-200 text-sm rounded-full pl-4 pr-4 py-2.5 border border-slate-700/50 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all placeholder-slate-600 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 w-9 h-9 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_12px_rgba(20,184,166,0.3)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-center text-[9px] text-slate-600 mt-2 tracking-wide">
                Powered by CVify Pro · AI Representative
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-slate-900 border border-teal-500/50 rounded-full flex items-center justify-center text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_35px_rgba(20,184,166,0.45)] backdrop-blur-sm transition-shadow"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/10 to-transparent" />
        {/* Unread indicator — visible before first open */}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <span className="text-[8px] font-black text-slate-900">1</span>
          </span>
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
