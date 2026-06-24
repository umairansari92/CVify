import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "./tokens";

const Nav = ({ user, setShowResumeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Default to dark, toggle doesn't actually switch global themes in CVifyPro since user chose this theme,
  // but we provide the UI element as requested to match Unsha's portfolio.
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Resume", href: "#resume" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-[#080808]/90 backdrop-blur-md shadow-lg shadow-[#00ffcc]/5 border-b border-[#222222]" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, "#home")}
          className="text-2xl font-bold flex items-center gap-2 group"
          style={{ fontFamily: tokens.fonts.heading }}
        >
          <span className="text-[var(--primary-color)] transition-transform group-hover:rotate-180 duration-500">{"</>"}</span>
          <span className="text-white group-hover:text-[var(--primary-color)] transition-colors">
            {user?.firstName || "My"} {user?.lastName || "Portfolio"}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[#a1a1aa] hover:text-[var(--primary-color)] transition-colors font-medium text-sm uppercase tracking-wider relative group"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all group-hover:w-full shadow-[0_0_8px_var(--primary-color)]"></span>
            </a>
          ))}
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#222] text-[#a1a1aa] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all shadow-[0_0_0_var(--primary-color)] hover:shadow-[0_0_10px_var(--primary-color)]"
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="text-[#a1a1aa] hover:text-[var(--primary-color)]"
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[var(--primary-color)] transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#080808]/95 backdrop-blur-xl border-b border-[#222] py-6 px-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xl text-[#a1a1aa] hover:text-[var(--primary-color)] transition-colors"
                style={{ fontFamily: tokens.fonts.mono }}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                setShowResumeModal(true);
              }}
              className="mt-4 px-6 py-3 bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] rounded uppercase tracking-widest font-bold hover:bg-[var(--primary-color)] hover:text-black transition-all text-center shadow-[0_0_15px_rgba(0,255,204,0.3)] hover:shadow-[0_0_25px_rgba(0,255,204,0.6)]"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              Get CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
