/**
 * CertificationsVM
 */
export function buildCertificationsVM(user) {
  if (!Array.isArray(user?.certifications)) return [];
  return user.certifications.map((c) => ({
    _id:           c?._id           || null,
    name:          c?.name          || "",
    issuer:        c?.issuer        || "",
    date:          c?.date          || null,
    credentialUrl: c?.credentialUrl || c?.url || null,
  }));
}
