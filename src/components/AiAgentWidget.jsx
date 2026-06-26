import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaRobot } from 'react-icons/fa';
import { useAgentStream } from '../hooks/useAgentStream';

// ── Premium link rendering for contact/social links ──────────────────
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
  li: ({ node, ...props }) => (
    <li className="flex gap-2 items-start">
      <span className="text-teal-400 mt-1 shrink-0">•</span>
      <span {...props} />
    </li>
  ),
};

// ── Parse [ACTIONS: Btn1 | Btn2 | Btn3] from LLM output ──────────────
const parseActions = (text) => {
  const match = text?.match(/\[ACTIONS:\s*([^\]]+)\]/);
  if (!match) return { cleanText: text, actions: [] };

  const rawButtons = match[1].split('|').map((b) => b.trim()).filter(Boolean);
  const actions = rawButtons.map((label) => ({
    label,
    prompt: label.replace(/^[\p{Emoji}\s]+/u, '').trim(),
  }));
  const cleanText = text.replace(/\[ACTIONS:[^\]]+\]/g, '').trim();
  return { cleanText, actions };
};

// ── Determine profession-aware initial buttons ────────────────────────
const buildInitialQuickActions = (profile) => {
  if (!profile) return [];
  const actions = [];

  const hasProjects =
    (Array.isArray(profile.projects) && profile.projects.length > 0) ||
    (Array.isArray(profile.portfolio) && profile.portfolio.length > 0);
  const hasSkills = Array.isArray(profile.skills) && profile.skills.length > 0;
  const hasServices =
    (Array.isArray(profile.services) && profile.services.length > 0) ||
    (Array.isArray(profile.servicesOffering) && profile.servicesOffering.length > 0);
  const hasCerts = Array.isArray(profile.certifications) && profile.certifications.length > 0;

  actions.push({ label: '👤 About', prompt: 'Give me a professional introduction of this candidate.' });
  actions.push({ label: '💼 Experience', prompt: 'Summarize the professional experience.' });
  if (hasProjects) actions.push({ label: '🚀 Projects', prompt: 'Tell me about their featured projects.' });
  if (hasSkills) actions.push({ label: '🛠 Skills', prompt: 'What are their technical skills and expertise?' });
  if (hasServices) actions.push({ label: '🤝 Services', prompt: 'What services are offered?' });
  if (hasCerts) actions.push({ label: '🎓 Certifications', prompt: 'Show their certifications.' });
  actions.push({ label: '📞 Contact', prompt: 'How can I contact this person?' });

  return actions.slice(0, 6);
};

export const AiAgentWidget = ({ profileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [dynamicActions, setDynamicActions] = useState([]);
  const endOfMessagesRef = useRef(null);

  const ownerName = profileData
    ? [profileData.firstName, profileData.lastName].filter(Boolean).join(' ') ||
      profileData.name ||
      'the candidate'
    : 'the candidate';

  const apiUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/agent/stream`
    : '/api/agent/stream';

  const { messages, sendMessage, isTyping, addLocalMessage } = useAgentStream(apiUrl, profileData);

  // Profession-aware initial quick actions
  const initialActions = useMemo(() => buildInitialQuickActions(profileData), [profileData]);

  // After each assistant message, parse [ACTIONS:...] from the last message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === 'assistant') {
      const { actions } = parseActions(lastMsg.content);
      if (actions.length > 0) {
        setDynamicActions(actions);
      }
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (userQuery) => {
    if (!userQuery.trim()) return;
    setDynamicActions([]); // Clear old action buttons while AI is responding
    sendMessage(userQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSend(input);
      setInput('');
    }
  };

  const handleQuickAction = (prompt) => {
    handleSend(prompt);
  };

  // Active quick actions: use dynamicActions from LLM if available, else initialActions
  const activeActions = dynamicActions.length > 0 ? dynamicActions : initialActions;

  // Clean message content — strip [ACTIONS:...] from display
  const getDisplayContent = (content) => parseActions(content).cleanText;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[580px] flex flex-col bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
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
                    {ownerName}
                  </h3>
                  <p className="text-teal-400/60 text-[10px] tracking-widest uppercase mt-0.5">
                    Portfolio Guide · Ready to assist
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
              {/* Welcome state */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl rounded-tl-sm p-4 space-y-2">
                    <p className="text-slate-200 text-sm font-semibold">
                      👋 Welcome!
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      I'm the Portfolio Guide for{' '}
                      <span className="text-teal-400 font-semibold">{ownerName}</span>.
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      I can help you explore this professional profile without browsing every section manually — whether you're a recruiter, potential client, developer, or just curious.
                    </p>
                    <p className="text-slate-300 text-xs font-medium mt-1">
                      How would you like to get started?
                    </p>
                  </div>

                  {/* Persona selector buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '👔 I\'m a Recruiter', prompt: 'I am a recruiter evaluating this candidate for a role.' },
                      { label: '🤝 Potential Client', prompt: 'I am a potential client interested in the services offered.' },
                      { label: '💻 Developer', prompt: 'I am a developer and want to explore the technical projects and stack.' },
                      { label: '👋 Just Browsing', prompt: 'Just give me a general overview of this portfolio.' },
                    ].map((action, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAction(action.prompt)}
                        className="px-3 py-2 bg-slate-700/40 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-slate-600/40 hover:border-teal-500/50 rounded-xl text-xs font-medium transition-all duration-200"
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
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
                        {getDisplayContent(msg.content)}
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

            {/* ── Contextual Quick Actions ── */}
            {profileData && activeActions.length > 0 && !isTyping && messages.length > 0 && (
              <div className="bg-slate-800/90 border-t border-slate-700/40 shrink-0 p-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <div className="flex gap-2">
                  {activeActions.map((action, idx) => (
                    <motion.button
                      key={`${action.label}-${idx}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/30 hover:bg-slate-700/70 text-slate-300 hover:text-teal-400 border border-slate-600/30 hover:border-teal-500/40 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap"
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

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
                Powered by CVify Pro · AI Portfolio Guide
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
        className="relative w-14 h-14 bg-slate-900 border-2 border-teal-500/50 rounded-full flex items-center justify-center text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] backdrop-blur-sm transition-shadow group overflow-visible"
      >
        {/* Neon Pulse Ring */}
        <div className="absolute inset-0 rounded-full border border-teal-400/50 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/10 to-transparent overflow-hidden">
          {profileData?.profilePicture || profileData?.avatar ? (
            <img
              src={profileData.profilePicture || profileData.avatar}
              alt="Portfolio Guide"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaRobot className="text-2xl drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            </div>
          )}
        </div>

        {/* Unread dot before first open */}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-slate-900 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(20,184,166,0.8)]">
            <span className="text-[8px] font-black text-slate-900">1</span>
          </span>
        )}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-full z-20"
            >
              <svg className="w-6 h-6 text-teal-400 drop-shadow-[0_0_5px_rgba(20,184,166,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
