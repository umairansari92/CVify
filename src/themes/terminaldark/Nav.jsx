import React from "react";
import { FileText } from "lucide-react";

const Nav = ({ setShowResumeModal, user }) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#915eff]/15 bg-[#050816]/80 px-4 py-3 shadow-[0_0_35px_rgba(5,8,22,0.7)] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#915eff]">
            <span className="text-xl font-black text-white">
              {user?.firstName?.charAt(0) || user?.lastname?.charAt(0) || "D"}
            </span>
          </div>
          <p className="flex cursor-pointer text-[18px] font-bold text-white">
            {user?.firstName || "Developer"} &nbsp;
            <span className="hidden text-[#aaa6c3] sm:block">| Portfolio</span>
          </p>
        </div>

        <ul className="hidden list-none flex-row gap-8 sm:flex">
          <li
            onClick={() => document.getElementById("about-td")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer text-[16px] font-medium text-[#aaa6c3] transition-colors hover:text-white"
          >
            About
          </li>
          <li
            onClick={() => document.getElementById("experience-td")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer text-[16px] font-medium text-[#aaa6c3] transition-colors hover:text-white"
          >
            Experience
          </li>
          <li
            onClick={() => document.getElementById("skills-td")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer text-[16px] font-medium text-[#aaa6c3] transition-colors hover:text-white"
          >
            Skills
          </li>
          <li
            onClick={() => document.getElementById("showcase-td")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer text-[16px] font-medium text-[#aaa6c3] transition-colors hover:text-white"
          >
            Projects
          </li>
          <li
            onClick={() => document.getElementById("contact-td")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer text-[16px] font-medium text-[#aaa6c3] transition-colors hover:text-white"
          >
            Contact
          </li>
          <li>
            <button
              onClick={() => setShowResumeModal(true)}
              className="flex items-center gap-1.5 text-[16px] font-medium text-[#915eff] transition-colors hover:text-white"
            >
              <FileText size={18} /> Resume
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
