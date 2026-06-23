import React from "react";
import { motion } from "framer-motion";

const About = ({ user }) => {
  if (!user?.summary && !user?.services?.length && !user?.strategicSkills?.length) return null;

  return (
    <section id="about-td" className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[#aaa6c3] text-[18px] uppercase tracking-wider">Introduction</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Overview.</h2>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="mt-4 text-[#aaa6c3] text-[17px] max-w-3xl leading-[30px]"
      >
        {user?.summary || "Passionate professional with a knack for solving complex problems and delivering high-quality solutions."}
      </motion.p>

      {/* Services / Strategic Skills as Glassmorphic Cards */}
      <div className="mt-20 flex flex-wrap gap-10">
        {(user?.services || user?.strategicSkills || []).map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-full sm:w-[250px]"
          >
            <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-[0_0_20px_rgba(145,94,255,0.1)]">
              <div className="bg-[#151030] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col border border-[#915eff]/20 hover:border-[#915eff]/60 transition-colors">
                <div className="w-16 h-16 rounded-full bg-[#915eff]/10 flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(145,94,255,0.3)]">
                  {service.icon || "💻"}
                </div>
                <h3 className="text-white text-[20px] font-bold text-center">
                  {service.name || service.title || service}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
