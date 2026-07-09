/**
 * ContactVM — Bundles contact info and form state for theme Contact sections.
 */
export function buildContactVM(user, contactForm, actions) {
  return {
    email:    user?.email    || user?.contact?.email    || "",
    phone:    user?.phoneNumber || user?.contact?.phone || "",
    location: user?.location || "",
    form:     contactForm || { name: "", email: "", subject: "", message: "" },
    setForm:  actions?.setContactForm   || (() => {}),
    onSubmit: actions?.handleContactSubmit || ((e) => e?.preventDefault()),
    isSending: actions?.isSending || false,
  };
}
