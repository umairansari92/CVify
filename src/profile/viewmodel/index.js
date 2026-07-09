/**
 * createViewModel — Aggregates all sub-VM builders into the unified ThemeViewModel.
 *
 * This is the single function that ProfileLoader calls.
 * Themes NEVER call this directly — they receive the built model via ThemeProps.
 */
import { buildHeroVM }           from "./hero.js";
import { buildAboutVM }          from "./about.js";
import { buildProjectsVM }       from "./projects.js";
import { buildExperienceVM }     from "./experience.js";
import { buildEducationVM }      from "./education.js";
import { buildSkillsVM }         from "./skills.js";
import { buildCertificationsVM } from "./certifications.js";
import { buildTestimonialsVM }   from "./testimonials.js";
import { buildInterestsVM }      from "./interests.js";
import { buildContactVM }        from "./contact.js";
import { buildGithubVM }         from "./github.js";
import { buildAnalyticsVM }      from "./analytics.js";

/**
 * @param {Object} user         - Raw user object from Redux activeProfile
 * @param {Array}  projects     - Projects array passed from PublicProfile
 * @param {Object} contactForm  - React contact form state
 * @param {Object} analytics    - Analytics object from Redux
 * @param {Object} githubData   - GitHub stats fetched by ProfileLoader
 * @param {boolean} githubLoading
 * @param {Object} actions      - Stable callbacks from ProfileLoader
 * @returns {ThemeViewModel}
 */
export function createViewModel({
  user,
  projects,
  contactForm,
  analytics,
  githubData,
  githubLoading,
  actions,
}) {
  return {
    hero:           buildHeroVM(user),
    about:          buildAboutVM(user),
    projects:       buildProjectsVM(user, projects),
    experience:     buildExperienceVM(user),
    education:      buildEducationVM(user),
    skills:         buildSkillsVM(user),
    certifications: buildCertificationsVM(user),
    testimonials:   buildTestimonialsVM(user),
    interests:      buildInterestsVM(user),
    contact:        buildContactVM(user, contactForm, { ...actions }),
    social: {
      github:    user?.socialLinks?.github    || null,
      linkedin:  user?.socialLinks?.linkedin  || null,
      twitter:   user?.socialLinks?.twitter   || null,
      instagram: user?.socialLinks?.instagram || null,
      website:   user?.socialLinks?.website   || null,
    },
    github:         buildGithubVM(githubData, githubLoading),
    analytics:      buildAnalyticsVM(analytics),
    flags: {
      isOwner:       user?.isOwner      || false,
      openToWork:    user?.openToWork   || false,
      isSending:     actions?.isSending || false,
      githubLoading: githubLoading      || false,
    },
    actions: {
      handleLiveUpdate:     actions?.handleLiveUpdate     || (() => {}),
      handleArrayUpdate:    actions?.handleArrayUpdate    || (() => {}),
      setShowResumeModal:   actions?.setShowResumeModal   || (() => {}),
      handleContactSubmit:  actions?.handleContactSubmit  || ((e) => e?.preventDefault()),
      setContactForm:       actions?.setContactForm       || (() => {}),
    },
    resumes:    Array.isArray(user?.resumes) ? user.resumes : [],
    resumeUrl:  user?.branding?.resumeUrl || user?.resumeUrl || null,
    username:   user?.username || "",
  };
}
