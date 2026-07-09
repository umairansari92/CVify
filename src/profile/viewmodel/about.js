/**
 * AboutVM — Normalizes bio/summary/location data for theme About sections.
 */
export function buildAboutVM(user) {
  return {
    bio:          user?.bio     || user?.summary || "",
    summary:      user?.summary || user?.bio     || "",
    location:     user?.location || "",
    profileImage: user?.profileImage || null,
    coverImage:   user?.coverImage   || null,
  };
}
