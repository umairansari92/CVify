import React from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

const Showcase = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="showcase-td" className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">My work</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mt-3 text-[#aaa6c3] text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#151030] p-5 rounded-2xl sm:w-[360px] w-full border border-[#915eff]/20 hover:border-[#915eff]/60 transition-colors shadow-2xl group"
          >
            <div className="relative w-full h-[230px] rounded-2xl overflow-hidden">
              <img
                src={project.image || project.imageUrl || project.coverImage || `https://placehold.co/600x400/151030/915eff?text=${encodeURIComponent(project.title || 'Project')}`}
                alt={project.title}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = `https://placehold.co/600x400/151030/915eff?text=${encodeURIComponent(project.title || 'Project')}`; }}
              />

              <div className="absolute inset-0 flex justify-end m-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.githubLink && (
                  <div
                    onClick={() => window.open(project.githubLink, "_blank")}
                    className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-slate-900/80 hover:bg-[#915eff] transition-colors"
                  >
                    <Github size={20} className="text-white" />
                  </div>
                )}
                {project.liveLink && (
                  <div
                    onClick={() => window.open(project.liveLink, "_blank")}
                    className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-slate-900/80 hover:bg-[#915eff] transition-colors"
                  >
                    <Globe size={20} className="text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-white font-bold text-[24px] group-hover:text-[#915eff] transition-colors">{project.title}</h3>
              <p className="mt-2 text-[#aaa6c3] text-[14px] line-clamp-3">{project.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(project.techStack || []).map((tech, idx) => {
                const colors = ["text-blue-400", "text-green-400", "text-pink-400", "text-orange-400", "text-purple-400"];
                const colorClass = colors[idx % colors.length];
                return (
                  <p key={`${tech}-${idx}`} className={`text-[14px] font-mono ${colorClass}`}>
                    #{tech}
                  </p>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
