/**
 * ProjectsVM — Normalizes project/portfolio array for theme Showcase sections.
 * Resolves all possible image field names to a single `image` key.
 */
export function buildProjectsVM(user, projectsProp) {
  const raw = projectsProp?.length
    ? projectsProp
    : [...(user?.projects || user?.portfolio || [])];

  return raw.map((p) => ({
    _id:         p?._id         || null,
    title:       p?.title       || "",
    description: p?.description || "",
    image:       p?.image || p?.thumbnail || p?.imageUrl || p?.coverImage || null,
    githubLink:  p?.githubLink  || p?.github  || null,
    liveLink:    p?.liveLink    || p?.live    || p?.url  || null,
    techStack:   Array.isArray(p?.techStack) ? p.techStack : [],
    isFeatured:  p?.isFeatured  || false,
  }));
}
