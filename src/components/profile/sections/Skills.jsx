import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaNpm,
  FaGitAlt,
  FaGithub,
  FaFire,
  FaServer,
  FaCode,
  FaLaptopCode,
  FaLink,
  FaJava,
  FaLayerGroup,
  FaServicestack,
  FaAws,
  FaDocker,
  FaPython,
  FaPhp,
  FaRust,
  FaFigma,
  FaSwift,
  FaGem,
  FaBrain,
  FaTerminal,
  FaWordpress,
  FaShopify,
  FaUnity,
  FaAndroid,
  FaApple,
  FaAppStore,
  FaWindows,
  FaLinux,
  FaUbuntu,
  FaCentos,
  FaFedora,
  FaSuse,
  FaTrello,
  FaSlack,
  FaJira,
  FaConfluence,
  FaDropbox,
  FaGoogleDrive,
  FaSalesforce,
  FaHubspot,
  FaFileCode,
  FaShieldAlt,
  FaLock,
  FaGlobe,
  FaSearch,
  FaMobileAlt,
  FaDesktop,
  FaTabletAlt,
  FaMicrochip,
  FaRobot,
  FaCloud,
  FaEnvelope,
  FaPaperPlane,
  FaUserShield,
  FaChartLine,
  FaMagic,
  FaBullhorn,
  FaCreditCard,
  FaBitcoin,
  FaLeaf,
  FaFlask,
  FaRocket,
  FaLightbulb,
} from "react-icons/fa";
import {
  SiNextdotjs, SiRedux, SiExpress, SiMongodb, SiPostman, SiTailwindcss, SiBootstrap, SiMui, SiFirebase, SiSupabase, SiReacthookform, SiNodemon, SiVercel, SiTypescript as SiTS,
  SiVuedotjs, SiAngular, SiSvelte, SiJquery, SiHtmx, SiSass, SiLess, SiChakraui, SiShadcnui, SiNestjs, SiDjango, SiFlask, SiFastapi, SiLaravel, SiSpringboot,
  SiPostgresql, SiMysql, SiRedis, SiSqlite, SiNetlify, SiDigitalocean, SiKubernetes, SiJenkins, SiTerraform, SiAnsible, SiGitlab, SiArduino,
  SiJavascript, SiSolidity, SiPrisma, SiMongoose, SiSequelize, SiTypeorm,
  SiGooglecloud, SiHeroku, SiCloudflare, SiOpenai, SiTensorflow, SiPytorch, SiVitest, SiJest, SiWordpress, SiShopify, SiStrapi, SiGhost, SiContentful, SiMagento, SiWoo, SiWeb3Dotjs, SiEthers,
  SiEthereum, SiSolana, SiMetamask, SiPostcss, SiFramer, SiMariadb, SiApachecassandra, SiNeo4J, SiBitbucket
} from "react-icons/si";
import InlineEdit from "../InlineEdit";

const ICON_MAP = {
  // --- WEB CORE ---
  html: <FaHtml5 className="text-[#E34F26]" />,
  css: <FaCss3Alt className="text-[#1572B6]" />,
  js: <FaJs className="text-[#F7DF1E]" />,
  javascript: <FaJs className="text-[#F7DF1E]" />,
  ts: <SiTS className="text-[#3178C6]" />,
  typescript: <SiTS className="text-[#3178C6]" />,

  // --- FRONTEND FRAMEWORKS ---
  react: <FaReact className="text-[#61DAFB]" />,
  next: <SiNextdotjs className="text-white" />,
  vue: <SiVuedotjs className="text-[#4FC08D]" />,
  angular: <SiAngular className="text-[#DD0031]" />,
  svelte: <SiSvelte className="text-[#FF3E00]" />,
  sveltekit: <SiSvelte className="text-[#FF3E00]" />,
  nuxt: <FaCode className="text-[#00DC82]" />,
  solid: <FaCode className="text-[#2C4F7C]" />,
  qwik: <FaCode className="text-[#161616]" />,
  preact: <FaCode className="text-[#673AB8]" />,
  remix: <FaCode className="text-white" />,
  astro: <FaCode className="text-[#FF5D01]" />,
  gatsby: <FaCode className="text-[#663399]" />,
  jquery: <SiJquery className="text-[#0769AD]" />,
  htmx: <SiHtmx className="text-[#3366CC]" />,
  backbone: <FaCode className="text-[#0071B5]" />,
  ember: <FaCode className="text-[#E04E39]" />,
  lit: <FaCode className="text-[#324FFF]" />,
  stencil: <FaCode className="text-[#4C48FF]" />,

  // --- STATE & DATA ---
  redux: <SiRedux className="text-[#764ABC]" />,
  mobx: <FaLayerGroup className="text-[#FF0995]" />,
  zustand: <FaLayerGroup className="text-[#434343]" />,
  recoil: <FaLayerGroup className="text-[#3578E5]" />, // No Si icon, fallback
  jotai: <FaLayerGroup className="text-white" />,
  pinia: <FaLayerGroup className="text-[#FFE485]" />,

  // --- STYLING ---
  tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
  bootstrap: <SiBootstrap className="text-[#7952B3]" />,
  sass: <SiSass className="text-[#CC6699]" />,
  scss: <SiSass className="text-[#CC6699]" />,
  less: <SiLess className="text-[#1D365D]" />,
  mui: <SiMui className="text-[#007FFF]" />,
  chakra: <SiChakraui className="text-[#319795]" />,
  shadcn: <SiShadcnui className="text-white" />,
  postcss: <SiPostcss className="text-[#DD3A0A]" />,
  framer: <SiFramer className="text-white" />,
  styled: <FaFileCode className="text-[#DB7093]" />,

  // --- BACKEND ---
  node: <FaNodeJs className="text-[#339933]" />,
  express: <SiExpress className="text-white" />,
  nest: <SiNestjs className="text-[#E0234E]" />,
  django: <SiDjango className="text-[#092E20]" />,
  flask: <SiFlask className="text-white" />,
  fastapi: <SiFastapi className="text-[#05998B]" />,
  laravel: <SiLaravel className="text-[#FF2D20]" />,
  symfony: <FaTerminal className="text-white" />,
  springboot: <SiSpringboot className="text-[#6DB33F]" />,
  spring: <SiSpringboot className="text-[#6DB33F]" />,
  ruby: <FaGem className="text-[#CC342D]" />,
  rails: <FaGem className="text-[#CC342D]" />,
  php: <FaPhp className="text-[#777BB4]" />,
  go: <FaTerminal className="text-[#00ADD8]" />,
  rust: <FaRust className="text-white" />,
  java: <FaJava className="text-[#007396]" />,
  csharp: <FaCode className="text-[#239120]" />,
  cpp: <FaCode className="text-[#00599C]" />,
  c: <FaCode className="text-[#A8B9CC]" />,
  python: <FaPython className="text-[#3776AB]" />,
  kotlin: <FaCode className="text-[#7F52FF]" />,
  swift: <FaSwift className="text-[#F05138]" />,
  dart: <FaCode className="text-[#0175C2]" />,
  solidity: <SiSolidity className="text-[#363636]" />,

  // --- DATABASES ---
  mongo: <SiMongodb className="text-[#47A248]" />,
  mongodb: <SiMongodb className="text-[#47A248]" />,
  postgre: <SiPostgresql className="text-[#4169E1]" />,
  postgresql: <SiPostgresql className="text-[#4169E1]" />,
  mysql: <SiMysql className="text-[#4479A1]" />,
  redis: <SiRedis className="text-[#DC382D]" />,
  sqlite: <SiSqlite className="text-[#003B57]" />,
  mariadb: <SiMariadb className="text-[#003545]" />,
  cassandra: <SiApachecassandra className="text-[#1287B1]" />,
  neo4j: <SiNeo4J className="text-[#008CC1]" />,
  firebase: <SiFirebase className="text-[#FFCA28]" />,
  supabase: <SiSupabase className="text-[#3ECF8E]" />,
  prisma: <SiPrisma className="text-white" />,
  mongoose: <SiMongoose className="text-[#880000]" />,
  sequelize: <SiSequelize className="text-[#52B0E7]" />,
  typeorm: <SiTypeorm className="text-[#FE0805]" />,

  // --- CLOUD & DEVOPS ---
  aws: <FaAws className="text-[#FF9900]" />,
  azure: <FaServer className="text-[#0089D6]" />,
  googlecloud: <FaServer className="text-[#4285F4]" />,
  gcp: <FaServer className="text-[#4285F4]" />,
  docker: <FaDocker className="text-[#2496ED]" />,
  kubernetes: <SiKubernetes className="text-[#326CE5]" />,
  k8s: <SiKubernetes className="text-[#326CE5]" />,
  vercel: <SiVercel className="text-white" />,
  netlify: <SiNetlify className="text-[#00C7B7]" />,
  digitalocean: <SiDigitalocean className="text-[#0080FF]" />,
  cloudflare: <SiCloudflare className="text-[#F38020]" />,
  heroku: <SiHeroku className="text-[#430098]" />,
  jenkins: <SiJenkins className="text-[#D24939]" />,
  terraform: <SiTerraform className="text-[#7B42BC]" />,
  ansible: <SiAnsible className="text-[#EE0000]" />,
  git: <FaGitAlt className="text-[#F05032]" />,
  github: <FaGithub className="text-white" />,
  gitlab: <SiGitlab className="text-[#FC6D26]" />,
  bitbucket: <SiBitbucket className="text-[#0052CC]" />,

  // --- TOOLS ---
  postman: <SiPostman className="text-[#FF6C37]" />,
  vscode: <FaLaptopCode className="text-[#007ACC]" />,
  figma: <FaFigma className="text-[#F24E1E]" />,
  photoshop: <FaCode className="text-[#31A8FF]" />,
  illustrator: <FaCode className="text-[#FF9A00]" />,
  canva: <FaCode className="text-[#00C4CC]" />,
  trello: <FaTrello className="text-[#0052CC]" />,
  slack: <FaSlack className="text-[#4A154B]" />,
  jira: <FaJira className="text-[#0052CC]" />,
  
  // --- AI & ML ---
  openai: <FaBrain className="text-[#412991]" />,
  gpt: <FaBrain className="text-[#412991]" />,
  tensorflow: <FaBrain className="text-[#FF6F00]" />,
  pytorch: <FaBrain className="text-[#EE4C2C]" />,
  pandas: <FaCode className="text-[#150458]" />,
  numpy: <FaCode className="text-[#013243]" />,
  keras: <FaCode className="text-[#D00000]" />,
  langchain: <FaLink className="text-white" />,

  // --- MOBILE & OTHER ---
  android: <FaAndroid className="text-[#3DDC84]" />,
  ios: <FaApple className="text-white" />,
  flutter: <FaCode className="text-[#02569B]" />,
  reactnative: <FaReact className="text-[#61DAFB]" />,
  unity: <FaUnity className="text-white" />,
  wordpress: <FaWordpress className="text-[#21759B]" />,
  shopify: <FaShopify className="text-[#96BF48]" />,
  web3: <SiWeb3Dotjs className="text-[#627EEA]" />,
  solana: <SiSolana className="text-[#14F195]" />,
  ethereum: <SiEthereum className="text-[#3C3C3D]" />,
  bitcoin: <FaBitcoin className="text-[#F7931A]" />,

  // --- STRATEGIC ---
  leadership: <FaShieldAlt className="text-[#FFD700]" />,
  management: <FaUserShield className="text-[#4CAF50]" />,
  agile: <FaRocket className="text-[#00BCD4]" />,
  scrum: <FaRocket className="text-[#607D8B]" />,
  seo: <FaSearch className="text-[#FF5722]" />,
  marketing: <FaBullhorn className="text-[#E91E63]" />,
  design: <FaMagic className="text-[#9C27B0]" />,
  branding: <FaMagic className="text-[#FFEB3B]" />,
  communication: <FaEnvelope className="text-[#2196F3]" />,
  problem: <FaLightbulb className="text-[#FFD700]" />,
  strategy: <FaPaperPlane className="text-[#FF9800]" />,
};

const Skills = React.memo(
  ({ user, isOwner, displayValue, handleLiveUpdate }) => {
    // ROBUST DATA NORMALIZATION: Handle both Object {technical, strategic} and Array [{name, category}] formats
    const normalizedData = useMemo(() => {
      let tech = [];
      let strat = [];

      // 1. Handle Object format (new dashboard structure)
      if (user.skills && !Array.isArray(user.skills)) {
        tech = user.skills.technical || [];
        strat = user.skills.strategic || [];
      }
      // 2. Handle Array format (legacy / Mongoose schema default)
      else if (Array.isArray(user.skills)) {
        user.skills.forEach((skill) => {
          const name = typeof skill === "string" ? skill : skill.name || "";
          const category = skill.category?.toLowerCase() || "";

          if (
            category === "strategic" ||
            category === "soft skills" ||
            category === "administrative"
          ) {
            strat.push(name);
          } else {
            tech.push(name);
          }
        });
      }

      return { tech, strat };
    }, [user.skills]);

    const technicalSkills = normalizedData.tech;
    const strategicSkills = normalizedData.strat;
    const services = useMemo(() => {
      const rawServices = user.services || [];
      return Array.isArray(rawServices) ? rawServices : [];
    }, [user.services]);

    const getSkillIcon = (name) => {
      if (!name || typeof name !== "string")
        return <FaCode className="text-gray-400" />;

      // Clean the input: lowercase and remove special characters
      const rawName = name.toLowerCase().replace(/[\s\-_.]/g, "");
      const keys = Object.keys(ICON_MAP);

      // 1. Prioritize Exact Match
      if (ICON_MAP[rawName]) return ICON_MAP[rawName];

      // 2. Prioritize "Starts With" (e.g., "Postgre" matches "Postgresql")
      const startMatch = keys.find(
        (key) => rawName.startsWith(key) || key.startsWith(rawName),
      );
      if (startMatch) return ICON_MAP[startMatch];

      // 3. Fallback to "Includes" (substring match)
      const includeMatch = keys.find((key) => rawName.includes(key));
      if (includeMatch) return ICON_MAP[includeMatch];

      return <FaCode className="text-gray-400" />;
    };

    const SkillPill = ({ name, index }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
          borderColor: "var(--primary-color)",
        }}
        className="group relative flex items-center gap-3 px-6 py-4 bg-white/[0.05] dark:bg-white/[0.02] border border-white/10 dark:border-white/5 rounded-2xl cursor-default transition-all duration-500 hover:bg-white dark:hover:bg-white hover:text-slate-900 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
        <div className="relative z-10 text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
          {getSkillIcon(name)}
        </div>
        <div className="flex flex-col relative z-10">
          <span className="text-[11px] md:text-sm font-black text-[var(--text-primary)] group-hover:text-slate-900 uppercase tracking-tighter leading-none transition-colors">
            {name}
          </span>
          <span className="text-[7px] font-bold text-[var(--primary-color)] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            Verified
          </span>
        </div>
      </motion.div>
    );

    return (
      <section
        id="expertise"
        className="py-24 md:py-36 border-b border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary-color)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-32 relative z-10">
          {/* --- EXPERIENCE & SKILLS SECTION --- */}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 mb-4"
              >
                <FaLayerGroup className="text-[var(--primary-color)] text-xs" />
                <span className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest">
                  Expertise Engine
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter"
              >
                <InlineEdit
                  isOwner={isOwner}
                  label="Section Name"
                  value={user.sectionNames?.skills}
                  onSave={(v) => handleLiveUpdate({ "sectionNames.skills": v })}
                >
                  {user.sectionNames?.skills ? (
                    user.sectionNames.skills
                  ) : (
                    <>
                      My{" "}
                      <span className="text-[var(--primary-color)]">
                        Skills
                      </span>
                    </>
                  )}
                </InlineEdit>
              </motion.h2>
            </div>

            <div className="space-y-12">
              {/* Technical Group */}
              {technicalSkills.length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-[9px] font-black text-[var(--primary-color)] text-center uppercase tracking-[0.5em] opacity-40">
                    Technical Arsenal
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
                    {technicalSkills.map((skill, idx) => (
                      <SkillPill key={idx} name={skill} index={idx} />
                    ))}
                  </div>
                </div>
              )}

              {/* Strategic Group */}
              {strategicSkills.length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-[9px] font-black text-[var(--primary-color)] text-center uppercase tracking-[0.5em] opacity-40">
                    Strategic Mindset
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
                    {strategicSkills.map((skill, idx) => (
                      <SkillPill
                        key={idx}
                        name={skill}
                        index={idx + technicalSkills.length}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- PROFESSIONAL SERVICES SECTION --- */}
          {(isOwner || services.length > 0) && (
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4"
                >
                  <FaServicestack className="text-violet-500 text-xs" />
                  <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">
                    Solutions Factory
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter"
                >
                  <InlineEdit
                    isOwner={isOwner}
                    label="Section Name"
                    value={user.sectionNames?.services}
                    onSave={(v) =>
                      handleLiveUpdate({ "sectionNames.services": v })
                    }
                  >
                    {user.sectionNames?.services ? (
                      user.sectionNames.services
                    ) : (
                      <>
                        Professional{" "}
                        <span className="text-violet-500">Services</span>
                      </>
                    )}
                  </InlineEdit>
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-6 hover:bg-white/[0.04] hover:border-violet-500/20 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-[50px] rounded-full pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500">
                        <FaServicestack size={20} />
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-4 py-1.5 rounded-full uppercase tracking-widest">
                        Ready to Deploy
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[var(--text-secondary)] opacity-70 leading-relaxed italic line-clamp-3">
                        “{service.description}”
                      </p>
                    </div>
                  </motion.div>
                ))}
                {services.length === 0 && (
                  <div className="col-span-full py-20 text-center opacity-20 italic">
                    No services listed yet.
                  </div>
                )}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-10 flex flex-col items-center gap-4"
          >
            <div className="h-px w-20 bg-white/10" />
            <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] opacity-30">
              Verified Expertise & Value Propositions
            </p>
          </motion.div>
        </div>
      </section>
    );
  },
);

export default Skills;
