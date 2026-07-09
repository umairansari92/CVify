/**
 * EducationVM — Normalizes education entries.
 */
export function buildEducationVM(user) {
  if (!Array.isArray(user?.education)) return [];
  return user.education.map((edu) => ({
    _id:         edu?._id         || null,
    degree:      edu?.degree      || "",
    institution: edu?.institution || edu?.school || "",
    location:    edu?.location    || "",
    startDate:   edu?.startDate   || null,
    endDate:     edu?.endDate     || null,
    description: edu?.description || "",
    grade:       edu?.grade       || null,
  }));
}
