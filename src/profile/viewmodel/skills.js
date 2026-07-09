/**
 * SkillsVM — Normalizes BOTH possible skills schemas into a
 * unified category dictionary.
 *
 * Schema A (Object): { technical: [], soft: [], strategic: [] }
 * Schema B (Array):  [{ name: "React" }, ...] or ["React", ...]
 */
export function buildSkillsVM(user) {
  const raw = user?.skills;
  if (!raw) return {};

  // Schema B — Array
  if (Array.isArray(raw)) {
    const items = raw.map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);
    return items.length ? { Skills: items } : {};
  }

  // Schema A — Object
  if (typeof raw === "object") {
    const groups = {};
    if (Array.isArray(raw.technical)  && raw.technical.length)  groups.Technical  = raw.technical;
    if (Array.isArray(raw.soft)       && raw.soft.length)       groups.Soft        = raw.soft;
    if (Array.isArray(raw.strategic)  && raw.strategic.length)  groups.Strategic   = raw.strategic;
    return groups;
  }

  return {};
}
