import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAgentStream } from '../hooks/useAgentStream';

// Custom Markdown Component to render links as Glassmorphism buttons
const MarkdownComponents = {
  a: ({ node, ...props }) => {
    const isContactLink = props.href?.startsWith('mailto:') || 
                          props.href?.startsWith('https://wa.me/') || 
                          props.href?.includes('linkedin.com') ||
                          props.href?.startsWith('tel:');

    if (isContactLink) {
      return (
        <a 
          href={props.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-2 mb-1 px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl transition-all duration-300 font-medium tracking-wide shadow-[0_0_15px_rgba(20,184,166,0.15)] hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] backdrop-blur-md"
        >
          {props.children}
        </a>
      );
    }
    
    // Default link styling
    return <a className="text-teal-400 hover:text-teal-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />;
  },
  p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
};

export const AiAgentWidget = ({ candidateId = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);
  
  // API endpoint would be defined based on your environment
  const apiUrl = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/agent/stream` 
    : '/api/agent/stream';
    
  const { messages, sendMessage, isTyping } = useAgentStream(apiUrl, candidateId);

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] flex flex-col bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.8)]"></div>
                <h3 className="text-white font-semibold tracking-wide">AI Chief of Staff</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
              {messages.length === 0 && (
                <div className="text-slate-400 text-sm text-center mt-10">
                  <p>Ask me anything about the candidate's experience, skills, or contact info.</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-teal-500/20 text-teal-50 border border-teal-500/30 rounded-tr-sm' 
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                  }`}>
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
              
              {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-700/50">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-slate-900/80 text-slate-200 text-sm rounded-full pl-4 pr-12 py-3 border border-slate-700/50 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder-slate-500"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                >
                  <svg className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 border border-teal-500/50 rounded-full flex items-center justify-center text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] backdrop-blur-sm transition-shadow z-50 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors"></div>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </motion.button>
    </div>
  );
};
