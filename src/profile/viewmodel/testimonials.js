/**
 * TestimonialsVM
 */
export function buildTestimonialsVM(user) {
  if (!Array.isArray(user?.testimonials)) return [];
  return user.testimonials.map((t) => ({
    _id:     t?._id     || null,
    name:    t?.name    || "",
    role:    t?.role    || "",
    message: t?.message || "",
    avatar:  t?.avatar  || null,
  }));
}
