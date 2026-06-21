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

// ── Local Knowledge Engine (Client-Side Hydration) ──
const localIntents = {
  intro: ["introduce", "who is", "about", "summary", "intro"],
  experience: ["experience", "job", "work", "history", "position", "company", "worked"],
  projects: ["project", "portfolio", "built", "apps", "cvify", "lifesync", "nikhaar"],
  skills: ["skills", "tech", "stack", "technologies", "expert", "expertise"],
  services: ["services", "offering", "solutions"],
  strategic: ["strategic", "mindset", "soft skills", "collaboration", "management", "problem solving"],
  education: ["education", "degree", "university", "college", "school", "certifications", "certificate", "eaducation", "academic"],
  contact: ["contact", "email", "phone", "call", "reach", "message", "linkedin", "github", "social"],
  location: ["location", "where", "based", "city", "country", "live", "address"],
  availability: ["available", "availability", "hire", "freelance", "full-time", "part-time"]
};

const serializeExperience = (experience) => {
  if (!Array.isArray(experience) || experience.length === 0) return "No experience listed.";
  return experience.map(e => {
    const title = e.jobTitle || e.role || "Role";
    const company = e.company || "Company";
    const period = `${e.startDate || ""}${e.endDate ? " – " + e.endDate : " – Present"}`;
    const desc = e.description ? `\n  ${e.description.slice(0, 250)}${e.description.length > 250 ? '...' : ''}` : "";
    return `- **${title}** at ${company} (${period})${desc}`;
  }).join("\n\n");
};

const serializeServices = (services) => {
  if (!Array.isArray(services) || services.length === 0) return "No services listed.";
  return services.map(s => {
    const title = typeof s === "string" ? s : s.title || s.name || "";
    const desc = s.description ? `: ${s.description.slice(0, 250)}${s.description.length > 250 ? '...' : ''}` : "";
    return `- **${title}**${desc}`;
  }).join("\n");
};

const serializeStrategicSkills = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) return "No strategic skills listed.";
  return skills.map(s => {
    const name = typeof s === "string" ? s : s.title || s.name || "";
    return `- **${name}**`;
  }).join("\n");
};

const serializeProjects = (projects) => {
  if (!Array.isArray(projects) || projects.length === 0) return "No projects listed.";
  return projects.map(p => {
    const name = p.title || p.name || "Untitled";
    const desc = p.description ? p.description.slice(0, 250) + (p.description.length > 250 ? '...' : '') : "";
    const tech = p.techStack?.length ? ` | Tech: ${p.techStack.join(", ")}` : "";
    const ghLink = p.githubLink ? ` | [GitHub](${p.githubLink})` : "";
    const liveLink = p.liveLink ? ` | [Live](${p.liveLink})` : "";
    return `- **${name}**: ${desc}${tech}${ghLink}${liveLink}`;
  }).join("\n\n");
};

const serializeEducation = (education, certifications) => {
  const eduLines = Array.isArray(education) ? education.map(e =>
    `- **${e.degree || "Degree"}** — ${e.institution || "Institution"} (${e.graduationYear || e.endDate || ""})`
  ) : [];
  const certLines = Array.isArray(certifications) ? certifications.map(c => 
    `- **${c.name || c.title || "Certificate"}**${c.issuer ? ` from ${c.issuer}` : ""}`
  ) : [];
  
  const allLines = [...eduLines, ...certLines];
  return allLines.length > 0 ? allLines.join("\n") : "No education or certifications listed.";
};

// ── Dynamically generates quick action buttons based on available profile data ──
const buildQuickActions = (profile) => {
  if (!profile) return [];
  const actions = [];
  
  const strategicSkills = Array.isArray(profile.strategic_skills) ? profile.strategic_skills : (Array.isArray(profile.strategicSkills) ? profile.strategicSkills : (Array.isArray(profile.skills) ? profile.skills.filter(s => s.category?.toLowerCase() === 'strategic').map(s => s.name) : []));
  const services = Array.isArray(profile.services) ? profile.services : (Array.isArray(profile.servicesOffering) ? profile.servicesOffering : []);

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

  if (strategicSkills.length > 0) {
    actions.push({ icon: '🧠', label: 'Strategic Skills', prompt: `What are their strategic skills?` });
  }

  if (services.length > 0) {
    actions.push({ icon: '🤝', label: 'Services Offering', prompt: `What services does this candidate offer?` });
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

  const { messages, sendMessage, isTyping, addLocalMessage } = useAgentStream(apiUrl, profileData);

  // Compute quick actions once when profile data is available
  const quickActions = useMemo(() => buildQuickActions(profileData), [profileData]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSmartQuery = (userQuery) => {
    if (!userQuery.trim()) return;
    const query = userQuery.toLowerCase().trim();

    // Helper to check intent matches
    const hasIntent = (intentKey) => localIntents[intentKey].some(k => query.includes(k));

    if (hasIntent("intro") || query === "hi" || query === "hello") {
      const briefHeadline = profileData?.headline ? profileData.headline.split(",").slice(0, 2).join(" & ") : "Professional";
      addLocalMessage(userQuery, `Hello! I represent **${ownerName}**, a ${briefHeadline}. What would you like to explore?`);
      return;
    }

    if (hasIntent("experience")) {
      addLocalMessage(userQuery, `Here is the work experience for **${ownerName}**:\n${serializeExperience(profileData.experience)}`);
      return;
    }

    if (hasIntent("services")) {
      const services = Array.isArray(profileData.services) ? profileData.services : (Array.isArray(profileData.servicesOffering) ? profileData.servicesOffering : []);
      addLocalMessage(userQuery, `Here are the services and offerings:\n${serializeServices(services)}`);
      return;
    }

    if (hasIntent("strategic")) {
      const strategicSkills = Array.isArray(profileData.strategic_skills) ? profileData.strategic_skills : (Array.isArray(profileData.strategicSkills) ? profileData.strategicSkills : (Array.isArray(profileData.skills) ? profileData.skills.filter(s => s.category?.toLowerCase() === 'strategic').map(s => s.name) : []));
      addLocalMessage(userQuery, `Here are the strategic skills and mindset attributes:\n${serializeStrategicSkills(strategicSkills)}`);
      return;
    }

    if (hasIntent("projects")) {
      const projects = Array.isArray(profileData.projects) ? profileData.projects : profileData.portfolio;
      addLocalMessage(userQuery, `Notable projects in the portfolio:\n${serializeProjects(projects)}`);
      return;
    }

    if (hasIntent("skills")) {
      const techSkills = Array.isArray(profileData.skills) 
        ? profileData.skills.filter(s => s.category?.toLowerCase() !== 'strategic').map(s => typeof s === "string" ? s : s.name).filter(Boolean)
        : [];
      const skillText = techSkills.length > 0 ? techSkills.join(", ") : "No technical skills listed.";
      addLocalMessage(userQuery, `Core technical skills and expertise:\n${skillText}`);
      return;
    }

    if (hasIntent("education")) {
      addLocalMessage(userQuery, `Academic background and certifications:\n${serializeEducation(profileData.education, profileData.certifications)}`);
      return;
    }

    if (hasIntent("contact")) {
      const links = [];
      if (profileData.email) links.push(`- **Email:** [${profileData.email}](mailto:${profileData.email})`);
      if (profileData.phoneNumber) links.push(`- **Phone:** [${profileData.phoneNumber}](tel:${profileData.phoneNumber})`);
      if (profileData.socialLinks?.linkedin) links.push(`- **LinkedIn:** [Profile](${profileData.socialLinks.linkedin})`);
      if (profileData.socialLinks?.github) links.push(`- **GitHub:** [Profile](${profileData.socialLinks.github})`);
      
      if (links.length > 0) {
        addLocalMessage(userQuery, `You can reach out to **${ownerName}** via the following channels:\n${links.join('\n')}`);
      } else {
        addLocalMessage(userQuery, `I don't have direct contact information for **${ownerName}**, but you can use the contact form on this portfolio.`);
      }
      return;
    }

    if (hasIntent("location")) {
      addLocalMessage(userQuery, profileData.location 
        ? `**${ownerName}** is based in **${profileData.location}**.` 
        : `I don't have a specific location listed for **${ownerName}**.`);
      return;
    }

    if (hasIntent("availability")) {
      addLocalMessage(userQuery, profileData.availability 
        ? `**${ownerName}**'s current availability is: **${profileData.availability}**.` 
        : `I don't have specific availability listed right now, but feel free to reach out via contact options!`);
      return;
    }

    // ── DEEP SCANNING ENGINE (Zero-Latency NLP) ──
    const stopWords = ["does", "do", "is", "can", "know", "knows", "has", "have", "he", "she", "they", "the", "a", "an",
      "about", "any", "experience", "with", "in", "of", "and", "or", "for", "to", "what", "his", "her", "their",
      "skills", "skill", "project", "projects", "work", "works", "tell", "me", "please", "show", "list", "give",
      "hi", "hello", "hey", "contact", "how", "who", "where", "when", "why", "which", "summarize", "summary", "this", "candidate"];

    const keywords = query.split(/\s+/).filter(w => w.length > 1 && !stopWords.includes(w));
    
    if (keywords.length > 0) {
      // 1. Scan Skills
      const techSkills = Array.isArray(profileData.skills) 
        ? profileData.skills.filter(s => s.category?.toLowerCase() !== 'strategic').map(s => typeof s === "string" ? s : s.name).filter(Boolean) 
        : [];
      const matchedSkills = techSkills.filter(s => keywords.some(k => s.toLowerCase().includes(k) || k.includes(s.toLowerCase())));
      
      if (matchedSkills.length > 0) {
        addLocalMessage(userQuery, `Yes, **${matchedSkills.join(", ")}** is part of ${ownerName}'s technical expertise.\n\nHere is the full technical stack:\n${techSkills.join(", ")}`);
        return;
      }

      // 2. Scan Projects
      const projects = Array.isArray(profileData.projects) ? profileData.projects : (Array.isArray(profileData.portfolio) ? profileData.portfolio : []);
      const matchedProjects = projects.filter(p => 
        keywords.some(k => 
          (p.techStack && p.techStack.some(t => t.toLowerCase().includes(k))) ||
          (p.title && p.title.toLowerCase().includes(k)) ||
          (p.description && p.description.toLowerCase().includes(k)) ||
          (p.name && p.name.toLowerCase().includes(k))
        )
      );
      if (matchedProjects.length > 0) {
        addLocalMessage(userQuery, `I found relevant projects in the portfolio:\n\n${serializeProjects(matchedProjects)}`);
        return;
      }

      // 3. Scan Experience
      const experience = Array.isArray(profileData.experience) ? profileData.experience : [];
      const matchedExp = experience.filter(e => 
        keywords.some(k => 
          (e.company && e.company.toLowerCase().includes(k)) ||
          (e.jobTitle && e.jobTitle.toLowerCase().includes(k)) ||
          (e.role && e.role.toLowerCase().includes(k)) ||
          (e.description && e.description.toLowerCase().includes(k))
        )
      );
      if (matchedExp.length > 0) {
        addLocalMessage(userQuery, `I found relevant work experience for **${ownerName}**:\n\n${serializeExperience(matchedExp)}`);
        return;
      }
    }

    // Default Fallback to Groq API
    sendMessage(userQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSmartQuery(input);
      setInput('');
    }
  };

  const handleQuickAction = (prompt) => {
    handleSmartQuery(prompt);
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

            {/* ── Persistent Quick Action Matrix ── */}
            {profileData && quickActions.length > 0 && !isTyping && (
              <div className="bg-slate-800/90 border-t border-slate-700/40 shrink-0 p-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <div className="flex gap-2">
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/30 hover:bg-slate-700/70 text-slate-300 hover:text-teal-400 border border-slate-600/30 hover:border-teal-500/40 rounded-xl text-xs font-medium transition-all duration-200"
                    >
                      <span className="text-sm">{action.icon}</span>
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
