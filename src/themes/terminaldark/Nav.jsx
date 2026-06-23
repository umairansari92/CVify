import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { tokens } from "./tokens";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

const Nav = ({ setShowResumeModal, user }) => {
  return (
    <nav className="w-full flex items-center justify-between py-5 px-6 max-w-7xl mx-auto absolute top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#915eff]">
          <span className="text-white font-black text-xl">
            {user?.firstName?.charAt(0) || user?.lastname?.charAt(0) || "D"}
          </span>
        </div>
        <p className="text-white text-[18px] font-bold cursor-pointer flex">
          {user?.firstName || "Developer"} &nbsp;
          <span className="sm:block hidden text-[#aaa6c3]">| Portfolio</span>
        </p>
      </div>

      <ul className="list-none hidden sm:flex flex-row gap-10">
        <li 
          onClick={() => document.getElementById('about-td')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[#aaa6c3] hover:text-white text-[16px] font-medium cursor-pointer transition-colors"
        >
          About
        </li>
        <li 
          onClick={() => document.getElementById('experience-td')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[#aaa6c3] hover:text-white text-[16px] font-medium cursor-pointer transition-colors"
        >
          Experience
        </li>
        <li 
          onClick={() => document.getElementById('showcase-td')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[#aaa6c3] hover:text-white text-[16px] font-medium cursor-pointer transition-colors"
        >
          Projects
        </li>
        <li 
          onClick={() => document.getElementById('contact-td')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[#aaa6c3] hover:text-white text-[16px] font-medium cursor-pointer transition-colors"
        >
          Contact
        </li>
        <li>
          <button
            onClick={() => setShowResumeModal(true)}
            className="text-[#915eff] hover:text-white flex items-center gap-1.5 text-[16px] font-medium transition-colors"
          >
            <FileText size={18} /> Resume
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
