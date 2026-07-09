/**
 * InterestsVM — Returns a flat string array.
 */
export function buildInterestsVM(user) {
  if (!Array.isArray(user?.interests)) return [];
  return user.interests.map((i) => (typeof i === "string" ? i : i?.name || "")).filter(Boolean);
}
