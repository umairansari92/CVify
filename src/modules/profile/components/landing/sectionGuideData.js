/**
 * sectionGuideData.js
 * Comprehensive masterclass dataset covering all 11 Digital Identity Studio tabs.
 * Provides field definitions, real-world examples, recruiter impact, and portfolio placements.
 */

export const SECTION_GUIDE_DATA = [
  {
    id: "identity",
    title: "Profile Identity",
    subtitle: "Your primary visual and identity anchor for recruiters.",
    icon: "FaUser",
    badge: "Tab 01 • Trust Anchor",
    image: "/Profile/Profile.png",
    purpose:
      "Recruiters decide whether to stay on your portfolio within the first 3 seconds. A clear high-resolution headshot combined with accurate name, contact, and location immediately establishes professional legitimacy and geographic fit.",
    portfolioPlacement:
      "Displays prominently in the Hero Section of all 11 Themes, Navigation bar avatars, and the Resume modal header.",
    fields: [
      {
        name: "Upload Headshot (Profile Picture)",
        description: "High-quality professional avatar or headshot with clean background and good lighting.",
        example: "Square 800x800px photo with subtle contrast and neutral background.",
        tip: "Avoid group photos or low-light selfies. A smiling, front-facing portrait increases recruiter engagement by 40%.",
        required: true,
      },
      {
        name: "First Name & Last Name",
        description: "Your full legal or professional name.",
        example: "First: Umair | Last: Ahmed",
        tip: "Ensure this matches the name on your LinkedIn and official certifications to avoid candidate verification mismatches.",
        required: true,
      },
      {
        name: "Mobile Number",
        description: "Direct contact phone number with international country code.",
        example: "+92 313 8624722",
        tip: "Always include the country code (+1, +44, +92) so international hiring managers can reach you via WhatsApp or phone.",
        required: false,
      },
      {
        name: "Location",
        description: "Your current city, state/province, and country.",
        example: "Karachi, Pakistan (or 'Remote / San Francisco, CA')",
        tip: "If applying for remote international roles, specify 'City, Country • Open to Remote Worldwide'.",
        required: true,
      },
    ],
    proTips: [
      "Keep contact information updated to prevent lost recruiter outreach.",
      "Profile Identity directly powers the universal header and AI Concierge introductions.",
    ],
  },
  {
    id: "branding",
    title: "Branding & Digital Presence",
    subtitle: "Custom URL, headline, ATS proof metrics, and social networks.",
    icon: "FaRocket",
    badge: "Tab 02 • High-Impact Proof",
    image: "/Profile/Profile1.png",
    purpose:
      "Positions you as an authority in your niche. By adding proof metrics (ATS scores, data scale) and your social links, you eliminate skepticism and prove quantifiable real-world capabilities.",
    portfolioPlacement:
      "Powers the Hero title, typewriter headline, verified badge counter, and floating social media links in the navbar and footer.",
    fields: [
      {
        name: "Custom Username (Public URL)",
        description: "Your personalized public portfolio link slug.",
        example: "umairansari92 → cvifypro.app/p/umairansari92",
        tip: "Choose a clean, memorable handle without special characters so you can put it on your email signature and resume header.",
        required: true,
      },
      {
        name: "Main Portfolio Role / Headline (Huge Text)",
        description: "Comma-separated list of roles powering the dynamic typewriter animation.",
        example: "Full Stack Web Developer, AI Chatbot Engineer, React & MERN Specialist",
        tip: "Separate multiple titles with commas. The Theme Engine automatically animates them as an interactive typing sequence.",
        required: true,
      },
      {
        name: "Availability Status",
        description: "Your current employment readiness status.",
        example: "Open to Work (Green status dot)",
        tip: "Setting 'Open to Work' triggers priority badge styling and signals recruiters that you are actively interviewing.",
        required: true,
      },
      {
        name: "Small Status Pill (Badge)",
        description: "A compact highlight pill displayed right beneath your profile photo.",
        example: "AI-Powered Product Dev",
        tip: "Use 2-4 words defining your core specialty or current focus.",
        required: false,
      },
      {
        name: "Value Proposition (Hero Subtext)",
        description: "One clear sentence explaining the specific business value you deliver to companies.",
        example: "Building AI-powered systems that improve hiring, automation, and user experience.",
        tip: "Answer: 'What business problem do I solve and how do I save/make money for my employer?'",
        required: true,
      },
      {
        name: "Verification Proof: ATS Score (%) & Data Points",
        description: "Quantitative proof points that validate your resume quality and career scale.",
        example: "ATS Score: 95% | Data Points: 6.4M records processed",
        tip: "Numbers create immediate trust. Highlight users reached, revenue generated, or speed improvements.",
        required: false,
      },
      {
        name: "Digital Presence (LinkedIn, GitHub, Twitter, Website)",
        description: "Direct verified URLs to your professional engineering footprints.",
        example: "GitHub: https://github.com/umairansari92 | LinkedIn: https://linkedin.com/in/umairansari92",
        tip: "Always ensure your GitHub and live website links are public and working.",
        required: true,
      },
    ],
    proTips: [
      "Candidates with a verified GitHub and LinkedIn receive 3.2x more outreach.",
      "The value proposition is the first sentence read by hiring directors.",
    ],
  },
  {
    id: "portfolio",
    title: "Featured Projects Portfolio",
    subtitle: "Showcase your best builds with screenshots, narrative, and live links.",
    icon: "FaLaptopCode",
    badge: "Tab 03 • Engineering Proof",
    image: "/Profile/Profile2.png",
    purpose:
      "Code speaks louder than words. Featured project cards prove your architectural capabilities through visual screenshots, live deployments, and deep-dive technical narratives.",
    portfolioPlacement:
      "Renders in the Showcase section with interactive modal previewers, tech stack chips, and GitHub/Live demo buttons.",
    fields: [
      {
        name: "Project Title",
        description: "Clear, descriptive product or application name.",
        example: "LifeSync Hub (Full-Stack Productivity Suite) or CVify AI Resume Platform",
        tip: "Include the application domain or niche in parentheses for instant context.",
        required: true,
      },
      {
        name: "Core Tech Stack",
        description: "Comma-separated list of frameworks, databases, and libraries used.",
        example: "React, Node.js, Express, MongoDB, Tailwind CSS, OpenAI API",
        tip: "List 4-6 primary technologies rather than every single npm package.",
        required: true,
      },
      {
        name: "System Narrative / Description",
        description: "Structured summary of the problem solved, architectural approach, and measurable impact.",
        example: "Developed an end-to-end SaaS platform using Google Gemini AI for automated resume audits. Engineered real-time WYSIWYG editor with dynamic theme engine.",
        tip: "Structure as: Problem Identified → Technical Solution Implemented → Business Result Achieved.",
        required: true,
      },
      {
        name: "Live URL & Source Code Repository",
        description: "Working demo URL and GitHub repository link.",
        example: "Live: https://cvifypro.app | Source: https://github.com/umairansari92/cvify",
        tip: "Ensure your live link has SSL (https://) and renders without authentication hurdles.",
        required: true,
      },
    ],
    proTips: [
      "Highlight 3-6 of your most impressive full-stack projects rather than 20 unfinished tutorials.",
      "Projects with live working URLs receive 5x higher evaluation scores.",
    ],
  },
  {
    id: "experience",
    title: "Professional Experience",
    subtitle: "Timeline of career milestones, leadership, and quantified achievements.",
    icon: "FaBriefcase",
    badge: "Tab 04 • Career Trajectory",
    image: "/Profile/Profile3.png",
    purpose:
      "Validates your seniority, team collaboration, and historical ability to ship production systems on schedule.",
    portfolioPlacement:
      "Renders as an interactive vertical timeline in the Experience section with role badges and company metadata.",
    fields: [
      {
        name: "Company / Organization & Job Title",
        description: "Employer name and your official role designation.",
        example: "Dataverse Technologies — MERN Stack Developer",
        tip: "Use standardized industry job titles (e.g. Senior Frontend Engineer vs Code Ninja).",
        required: true,
      },
      {
        name: "Start Date, End Date & 'Present' Toggle",
        description: "Employment duration.",
        example: "01/2023 to Present (Active)",
        tip: "Check 'Present' if you are currently working in this role.",
        required: true,
      },
      {
        name: "Key Achievements & Responsibilities",
        description: "Action-driven bullet points demonstrating quantifiable impact.",
        example: "• Scaled microservices architecture to support 150k+ monthly active users with 99.9% uptime.\n• Spearheaded AI integration reducing manual resume review time by 65%.",
        tip: "Start each line with a strong action verb (Architected, Spearheaded, Engineered) and include a metric (%, $, time saved).",
        required: true,
      },
    ],
    proTips: [
      "Avoid passive phrases like 'Responsible for'. Use 'Engineered', 'Optimized', 'Delivered'.",
      "List roles in reverse chronological order (most recent first).",
    ],
  },
  {
    id: "education",
    title: "Education History",
    subtitle: "Academic foundation, degrees, specialized certifications, and highlights.",
    icon: "FaGraduationCap",
    badge: "Tab 05 • Academic Foundation",
    image: "/Profile/Profile4.png",
    purpose:
      "Confirms your formal education, bootcamps, specialized diplomas, and coursework in computer science or related disciplines.",
    portfolioPlacement:
      "Displays in the Education section with graduation badges, honors, and academic coursework highlights.",
    fields: [
      {
        name: "Institution / School",
        description: "University, college, bootcamp, or training institute name.",
        example: "Saylani Mass IT Training (SMIT) or FAST National University",
        tip: "Use the full official institution name.",
        required: true,
      },
      {
        name: "Degree / Certification",
        description: "Field of study and qualification achieved.",
        example: "BS Computer Science or Certificate in Generative AI & Agentic Systems",
        tip: "Specify your major and any specializations.",
        required: true,
      },
      {
        name: "Enrollment & Graduation Dates",
        description: "Start and completion years.",
        example: "10/2024 to 03/2026 (or 'Currently Enrolled')",
        tip: "Check 'Enrolled' if you are currently studying.",
        required: true,
      },
      {
        name: "Academic Highlights",
        description: "Relevant coursework, GPA, major thesis, or key technologies mastered.",
        example: "HTML, CSS, JavaScript, Agentic AI, Chatbot Development, Distributed Systems.",
        tip: "List specialized technical coursework that aligns with your target job roles.",
        required: false,
      },
    ],
    proTips: [
      "Include specialized diplomas and bootcamps alongside traditional degrees.",
    ],
  },
  {
    id: "expertise",
    title: "Expertise & Professional Services",
    subtitle: "Technical arsenal chips, strategic mindset, and freelancing offerings.",
    icon: "FaTools",
    badge: "Tab 06 • Capabilities",
    image: "/Profile/Profile5.png",
    purpose:
      "Allows automated recruiter search engines to match your profile for technical stacks and offers clear service packages for clients and consulting engagements.",
    portfolioPlacement:
      "Powers the Skills grid and the Professional Services cards on your live portfolio.",
    fields: [
      {
        name: "Technical Arsenal (Hard Skills)",
        description: "Tag chips of programming languages, frameworks, cloud services, and tools.",
        example: "React, Node.js, Express, MongoDB, Redux, Git, Postman, CI/CD, Tailwind CSS",
        tip: "Add your strongest 8-15 technical skills that match your target positions.",
        required: true,
      },
      {
        name: "Strategic Mindset (Soft & Leadership Skills)",
        description: "Competencies in system design, product thinking, team leadership, and communication.",
        example: "Problem Solving, System Architecture, Code Review, Team Collaboration, Agile",
        tip: "Demonstrates that you are a well-rounded engineer who communicates effectively.",
        required: true,
      },
      {
        name: "Professional Services (Offerings)",
        description: "Defined services with headline and value description for clients.",
        example: "Service: Full-Stack Web Development | Value: Architecting and developing secure, scalable MERN web applications with modern frontend frameworks.",
        tip: "Add 2-4 specific service offerings to attract freelance, agency, and consulting inquiries.",
        required: false,
      },
    ],
    proTips: [
      "Group skills into distinct categories (Frontend, Backend, AI, DevOps).",
      "Services make it easy for freelance clients to understand how you can help them immediately.",
    ],
  },
  {
    id: "credentials",
    title: "Credentials & Social Proof",
    subtitle: "Awards, verified certifications, testimonials, languages, and interests.",
    icon: "FaCheckCircle",
    badge: "Tab 07 • Social Proof",
    image: "/Profile/Profile6.png",
    purpose:
      "Third-party validation dramatically increases conversion. Testimonials from colleagues, verified certification links, and spoken languages complete your 360-degree professional persona.",
    portfolioPlacement:
      "Renders in the Certifications badge wall, Client Testimonials carousel, and Languages footer widget.",
    fields: [
      {
        name: "Honors & Awards",
        description: "Recognitions, hackathon wins, and employee awards.",
        example: "Employee of the Month — Designed intelligent context-aware chatbots.",
        tip: "Include the date and a 1-sentence context of why you won.",
        required: false,
      },
      {
        name: "Certifications",
        description: "Verified certificates with issuer, date, and credential URL.",
        example: "AWS Certified Solutions Architect — Amazon Web Services (2024)",
        tip: "Always provide the Credly or certificate verification link for instant validation.",
        required: false,
      },
      {
        name: "Client Testimonials & Trusted Brands",
        description: "Direct quotes from previous managers, clients, or team members.",
        example: "'Umair delivered our AI platform 2 weeks ahead of schedule with flawless code quality.' — Sarah K., VP of Engineering",
        tip: "Include the recommender's name, role, and avatar for maximum credibility.",
        required: false,
      },
      {
        name: "Languages & Dialects",
        description: "Languages spoken and proficiency level (Native, Fluent, Professional, Beginner).",
        example: "English (Fluent), Urdu (Native)",
        tip: "Important for global remote teams to assess communication readiness.",
        required: true,
      },
      {
        name: "Interests & Hobbies",
        description: "Personal passions beyond coding that show personality.",
        example: "AI Research, Open Source Contributing, Chess, Tech Blogging",
        tip: "Helps interviewers establish personal rapport during culture-fit discussions.",
        required: false,
      },
    ],
    proTips: [
      "Testimonials serve as powerful social proof that differentiates you from 99% of applicants.",
    ],
  },
  {
    id: "security",
    title: "Security & Account Control",
    subtitle: "Password rotation, credential management, and data sovereignty.",
    icon: "FaShieldAlt",
    badge: "Tab 08 • Account Security",
    image: "/Profile/Profile7.png",
    purpose:
      "Protects your portfolio workspace with enterprise-grade encryption and password management, while giving you full control over your digital identity.",
    portfolioPlacement:
      "Private account setting — secures access to your public portfolio management dashboard.",
    fields: [
      {
        name: "Current Password & New Secure Password",
        description: "Rotate your workspace credentials securely.",
        example: "Strong 12+ character password with symbols and numbers.",
        tip: "Update your password periodically to protect your public portfolio settings.",
        required: true,
      },
      {
        name: "Termination Zone (Delete Account)",
        description: "Permanent account wipe and removal of digital identity.",
        example: "Requires confirmation password.",
        tip: "Irreversible action that unclaims your username and unpublishes your live portfolio.",
        required: false,
      },
    ],
    proTips: [
      "Always use a unique password for your CVify Pro workspace.",
    ],
  },
  {
    id: "ai",
    title: "AI Recruiter Concierge Settings",
    subtitle: "Configure your autonomous 24/7 AI portfolio guide.",
    icon: "FaRobot",
    badge: "Tab 09 • AI Agent",
    image: "/Profile/Profile8.png",
    purpose:
      "Turns your portfolio into an active, interactive conversational experience. Your custom AI agent pitches your background, answers recruiter questions, and explains your architecture 24/7.",
    portfolioPlacement:
      "Renders as an interactive floating AI Widget on your public portfolio (/p/:username).",
    fields: [
      {
        name: "Enable AI Portfolio Guide Toggle",
        description: "Turn your autonomous chatbot on or off for public visitors.",
        example: "Enabled (Active)",
        tip: "Keep this enabled so international recruiters in different timezones can get instant answers.",
        required: true,
      },
      {
        name: "Global Daily Free AI Replies",
        description: "Total number of free automated AI responses given per 24-hour cycle.",
        example: "5 to 20 daily free replies",
        tip: "Protects your diamond credit quota while giving authentic recruiters instant access.",
        required: true,
      },
      {
        name: "Action After Limit Reached",
        description: "What happens when your daily free AI quota is exhausted.",
        example: "Smart Auto-Pay (Deducts diamonds) | Fixed Package | Block Chat | Prompt Direct Contact",
        tip: "Choose 'Smart Auto-Pay' if actively hunting for high-priority executive roles.",
        required: true,
      },
    ],
    proTips: [
      "The AI Agent uses your Experience, Skills, and Projects as its factual context knowledge base.",
      "Recruiters love testing candidate knowledge through interactive chatbot queries.",
    ],
  },
  {
    id: "theme",
    title: "Theme Designer & Visual Engine",
    subtitle: "Switch between 11 handcrafted themes, brand colors, and typography.",
    icon: "FaPalette",
    badge: "Tab 10 • Theme Engine v4.0",
    image: "/Profile/Profile9.png",
    purpose:
      "Instantly transforms the entire look, feel, animations, and typography of your public portfolio to match your personal brand aesthetic.",
    portfolioPlacement:
      "Controls the overall visual skin, background shaders, color tokens, and font styling of `/p/:username`.",
    fields: [
      {
        name: "One-Click Theme Presets (11 Themes)",
        description: "Curated aesthetic themes designed for different engineering disciplines.",
        example: "NOIR (Minimalist Black), ORIENTAL LUXE (Gold/Emerald), APEX (Modern Clean), CYBERNEON (Cyberpunk)",
        tip: "Preview each theme to see which layout and animation style best fits your industry.",
        required: true,
      },
      {
        name: "Brand Identity Colors",
        description: "Custom primary accent, hero gradients, and heading text colors.",
        example: "Primary Accent: #66907D | Gradient: #101010 to #181818",
        tip: "Use high-contrast hex codes for clear readability across light and dark displays.",
        required: true,
      },
      {
        name: "Typography Style",
        description: "Body and heading font family selector.",
        example: "Outfit, Inter, Plus Jakarta Sans, JetBrains Mono",
        tip: "Inter and Plus Jakarta Sans provide a clean, modern SaaS aesthetic.",
        required: true,
      },
      {
        name: "Component Aesthetics",
        description: "Card styling preference: Minimalist (Flat), Glassmorphism (Frosted glass), or Classic (Shadowed).",
        example: "Glassmorphism (Frosted blur effects)",
        tip: "Glassmorphism pairs beautifully with dark and vibrant background shaders.",
        required: true,
      },
      {
        name: "Hero Backdrop Banner",
        description: "Custom background hero image upload.",
        example: "Subtle geometric or dark gradient pattern.",
        tip: "Use high-resolution banners without text overlays so text remains crisp.",
        required: false,
      },
    ],
    proTips: [
      "You can switch themes at any time with 1 click without losing any of your profile content.",
    ],
  },
  {
    id: "intelligence",
    title: "Career Intelligence & Analytics",
    subtitle: "Real-time metrics, recruiter visits, ATS audit scores, and timeline history.",
    icon: "FaChartLine",
    badge: "Tab 11 • Performance KPI",
    image: "/Profile/Profile10.png",
    purpose:
      "Provides data-backed visibility into your profile's market performance, resume scan scores, and candidate search ranking.",
    portfolioPlacement:
      "Private dashboard analytics tracking visitor engagement and historical scan scores.",
    fields: [
      {
        name: "Best ATS Score (Peak %)",
        description: "Highest achieved score from your AI ATS resume audits.",
        example: "80% Peak Score",
        tip: "Aim for 85%+ to maximize inbound recruiter recommendations.",
        required: false,
      },
      {
        name: "Average Quality (Steady %)",
        description: "Aggregated quality benchmark across all your submitted resumes.",
        example: "46% Steady Benchmark",
        tip: "Use the ATS scanner recommendations to incrementally improve your bullet points.",
        required: false,
      },
      {
        name: "Total Audits & Scans Count",
        description: "Number of completed ATS and market scans.",
        example: "47 Scans Completed",
        tip: "Keep iterating until your keyword gap rate is under 10%.",
        required: false,
      },
      {
        name: "Best Targeted Role & Session Timeline",
        description: "Historical record of roles targeted and scan timestamps.",
        example: "Target: Senior Full Stack Engineer (MERN / AI)",
        tip: "Helps you track your resume customization progress over time.",
        required: false,
      },
    ],
    proTips: [
      "Review your Intelligence timeline weekly to refine your skills and project narratives.",
    ],
  },
];
