/**
 * ExperienceVM — Normalizes work experience entries.
 * Normalizes description to always be an Array<string>.
 */
export function buildExperienceVM(user) {
  if (!Array.isArray(user?.experience)) return [];
  return user.experience.map((exp) => ({
    _id:         exp?._id         || null,
    title:       exp?.title       || "",
    company:     exp?.company     || "",
    location:    exp?.location    || "",
    startDate:   exp?.startDate   || null,
    endDate:     exp?.endDate     || null,
    current:     exp?.current     || false,
    description: Array.isArray(exp?.description)
      ? exp.description
      : exp?.description ? [exp.description] : [],
    achievements: Array.isArray(exp?.achievements) ? exp.achievements : [],
  }));
}
