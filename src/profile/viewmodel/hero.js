/**
 * HeroVM — Normalizes user identity data for theme Hero sections.
 * Themes never access raw user fields directly.
 */
export function buildHeroVM(user) {
  const firstName = user?.firstName || "";
  const lastName  = user?.lastName  || "";
  return {
    firstName,
    lastName,
    fullName:     [firstName, lastName].filter(Boolean).join(" "),
    initials:     (firstName.charAt(0) || "") + (lastName.charAt(0) || ""),
    headline:     user?.headline || "",
    bio:          user?.bio || user?.summary || "",
    profileImage: user?.profileImage || null,
    coverImage:   user?.coverImage   || null,
    location:     user?.location     || "",
    availability: user?.availability || null,
    openToWork:   user?.openToWork   || false,
  };
}
