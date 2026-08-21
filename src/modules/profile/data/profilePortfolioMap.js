/**
 * profilePortfolioMap.js
 * Maps Digital Identity Studio fields to their exact rendering location on public portfolio themes (/p/:username).
 */

export const PORTFOLIO_MAPPINGS = {
  profileImage: {
    targetSection: "Hero Section & Universal Navbar",
    description: "Renders as the primary circular headshot with glowing status ring and in the top floating navbar avatar.",
    previewTheme: "NOIR / APEX",
    themeLocationSnippet: "<Hero> → <Avatar ring={accentColor} glow={true} />",
  },
  fullName: {
    targetSection: "Hero Title & Page Meta Tags",
    description: "Displayed as the primary H1 title and dynamically injected into OpenGraph and Twitter card previews.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Hero> → <h1 className='font-black text-5xl'>Umair Ahmed</h1>",
  },
  location: {
    targetSection: "Hero Metadata Pill & Footer",
    description: "Shows geographic location with map pin icon beside your availability status.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Hero> → <LocationBadge text='Karachi, Pakistan' />",
  },
  username: {
    targetSection: "Canonical Web URL & Share Link",
    description: "Your globally unique portfolio address: cvifypro.app/p/yourname.",
    previewTheme: "UNIVERSAL",
    themeLocationSnippet: "https://cvifypro.app/p/umairansari92",
  },
  headline: {
    targetSection: "Hero Animated Typewriter Sequence",
    description: "Dynamically cycles through comma-separated roles with smooth typewriter transitions.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Hero> → <TypeAnimation sequence={['Full Stack Developer', 'AI Specialist']} />",
  },
  availability: {
    targetSection: "Top Navbar & Hero Status Pill",
    description: "Displays a pulsating green beacon indicating immediate readiness for interviews and consulting.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Navbar> → <StatusPill text='OPEN TO WORK' pulse={true} />",
  },
  valueProposition: {
    targetSection: "Hero Sub-Headline Hook",
    description: "The primary 1-sentence value statement displayed prominently beneath your title.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Hero> → <p className='text-lg opacity-80'>Building AI systems that improve hiring...</p>",
  },
  proofPoints: {
    targetSection: "Hero Verified Metric Badges",
    description: "Visual counters showcasing your verified ATS audit pass rate and quantified data throughput.",
    previewTheme: "ORIENTAL LUXE / APEX",
    themeLocationSnippet: "<Hero> → <Badge verified={true} value='95% ATS Score' />",
  },
  socialLinks: {
    targetSection: "Hero Quick Links & Footer Grid",
    description: "Interactive icon buttons for GitHub, LinkedIn, Twitter/X, and personal website.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Hero> → <SocialRow links={['github', 'linkedin', 'twitter']} />",
  },
  projectCard: {
    targetSection: "Showcase / Featured Projects Grid",
    description: "Full-width visual card with screenshot thumbnail, tech stack badges, system narrative, and live/repo buttons.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Showcase> → <ProjectCard liveUrl='...' repoUrl='...' techStack={['React', 'Node']} />",
  },
  experienceTimeline: {
    targetSection: "Professional Experience Timeline",
    description: "Vertical timeline with company logo, job title, tenure badge, and quantified achievement bullet points.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Experience> → <TimelineItem company='...' achievements={[...]} />",
  },
  educationTimeline: {
    targetSection: "Education & Certifications Section",
    description: "Academic history cards displaying degrees, graduation dates, and specialized technology coursework.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Education> → <AcademicCard degree='...' institution='...' />",
  },
  technicalArsenal: {
    targetSection: "Skills & Core Competencies Grid",
    description: "Interactive hard skill chips grouped into frontend, backend, AI, and DevOps buckets.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Skills> → <SkillChipGroup skills={['React', 'Node.js', 'MongoDB']} />",
  },
  professionalServices: {
    targetSection: "Services & Offerings Grid",
    description: "Structured cards highlighting specific consulting or engineering packages with direct CTA buttons.",
    previewTheme: "ORIENTAL LUXE / APEX",
    themeLocationSnippet: "<Services> → <ServiceCard headline='Full-Stack Dev' desc='...' />",
  },
  testimonials: {
    targetSection: "Social Proof & Testimonials Carousel",
    description: "Verified quotes from colleagues and clients with recommender name, title, and avatar.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<Testimonials> → <QuoteCard author='...' company='...' text='...' />",
  },
  aiConcierge: {
    targetSection: "Floating 24/7 AI Recruiter Chat Widget",
    description: "Autonomous chatbot anchored to bottom-right of your portfolio answering visitor queries in real-time.",
    previewTheme: "ALL 11 THEMES",
    themeLocationSnippet: "<AiAgentWidget mode='recruiter' quota={5} userContext={...} />",
  },
  themeEngine: {
    targetSection: "Entire Portfolio Visual Skin & Layout",
    description: "Applies selected design tokens, shaders, fonts, and animation velocities across the full page.",
    previewTheme: "NOIR, ORIENTAL LUXE, APEX, CYBERNEON, etc.",
    themeLocationSnippet: "<ThemeResolver theme='NOIR' tokens={...} />",
  },
};
