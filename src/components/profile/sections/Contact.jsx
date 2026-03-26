import React from "react";
import { getDynamicWhatsAppLink } from "../../../utils/whatsappUtils";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaFacebook, FaGlobe, FaWhatsapp } from "react-icons/fa";
import InlineEdit from "../InlineEdit";

const Contact = React.memo(({ user, isOwner, contactForm, setContactForm, handleContactSubmit, isSending, handleLiveUpdate, ensureAbsoluteUrl }) => {
  const personalInfo = user?.personalInfo || {
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    image: user?.profileImage,
    jobTitle: user?.headline,
    objective: user?.bio,
    location: user?.location,
    email: user?.email,
    phone: user?.phoneNumber
  };

  const getIcon = (platform) => {
    switch(platform) {
      case 'linkedin': return <FaLinkedin size={20} />;
      case 'github': return <FaGithub size={20} />;
      case 'twitter': return <FaTwitter size={20} />;
      case 'instagram': return <FaInstagram size={20} />;
      case 'facebook': return <FaFacebook size={20} />;
      case 'portfolio': return <FaGlobe size={20} />;
      case 'whatsapp': return <FaWhatsapp size={20} />;
      default: return <FaGlobb size={20} />;
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 border-b border-[var(--card-border)] overflow-hidden bg-[var(--bg-primary)]/50">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none select-none overflow-hidden flex justify-center">
        <h2 className="text-[10vw] font-black text-[var(--text-primary)] opacity-[0.03] uppercase tracking-tighter whitespace-nowrap">
          Available for Hire
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] flex flex-col items-center gap-1">
            <span className="text-[var(--primary-color)] text-xs tracking-[0.5em] mb-2 opacity-60">Ready for the next step?</span>
            Let's Work <span className="text-[var(--primary-color)] underline decoration-wavy decoration-2 underline-offset-8">Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8 uppercase tracking-wider">Contact Me Here</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[var(--primary-color)]"><MapPin size={24} /></div>
                  <div>
                    <span className="block text-sm text-[var(--text-secondary)] opacity-50 uppercase font-medium mb-1">Location</span>
                    <span className="text-[var(--text-primary)] opacity-90 text-lg">
                      <InlineEdit isOwner={isOwner} id="loc" value={personalInfo.location} onSave={(v) => handleLiveUpdate({ "personalInfo.location": v })}>
                        {personalInfo.location || 'City, Country'}
                      </InlineEdit>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[var(--primary-color)]"><Mail size={24} /></div>
                  <div>
                    <span className="block text-sm text-[var(--text-secondary)] opacity-50 uppercase font-medium mb-1">Email</span>
                    <span className="text-[var(--text-primary)] opacity-90 text-lg">
                      <InlineEdit isOwner={isOwner} id="email" value={personalInfo.email} onSave={(v) => handleLiveUpdate({ "personalInfo.email": v })}>
                        {personalInfo.email || 'your.email@example.com'}
                      </InlineEdit>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[var(--primary-color)]"><Phone size={24} /></div>
                  <div>
                    <span className="block text-sm text-[var(--text-secondary)] opacity-50 uppercase font-medium mb-1">Mobile Number</span>
                    <span className="text-[var(--text-primary)] opacity-90 text-lg">
                      <InlineEdit isOwner={isOwner} id="phone" value={personalInfo.phone} onSave={(v) => handleLiveUpdate({ phoneNumber: v })}>
                        {personalInfo.phone || '+00 123 456 789'}
                      </InlineEdit>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-wider">Follow Me:</h3>
              <div className="flex flex-wrap gap-4">
                {['linkedin', 'github', 'whatsapp', 'twitter', 'portfolio'].map((platform) => {
                  let link = user.socialLinks?.[platform];
                  
                  // WhatsApp Logic: Use dynamic link
                  if (platform === 'whatsapp') {
                    const phone = user.phoneNumber || user.personalInfo?.phoneNumber;
                    const ownerName = personalInfo.fullName || user.firstName;
                    if (!phone) return null;
                    link = getDynamicWhatsAppLink(ownerName, phone);
                  }

                  if (!link && !isOwner) return null;
                  return (
                    <a 
                      key={platform}
                      href={platform === 'whatsapp' ? link : (ensureAbsoluteUrl(link) || '#')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={platform}
                      className="w-12 h-12 rounded-full border border-[var(--primary-color)]/50 bg-[var(--primary-color)]/10 text-[var(--primary-color)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:bg-[var(--primary-color)] hover:text-gray-900 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    >
                      {getIcon(platform)}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="YOUR NAME" 
                  className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  disabled={isSending}
                />
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL" 
                  className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  disabled={isSending}
                />
              </div>
              <input 
                type="text" 
                placeholder="ENTER SUBJECT" 
                className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                disabled={isSending}
              />
              <textarea 
                placeholder="Message Here..." 
                rows="6"
                className="w-full bg-[var(--bg-primary)]/50 border border-[var(--card-border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-30 focus:opacity-100 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all resize-none"
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                disabled={isSending}
              ></textarea>
              
              <div className="text-right pt-4">
                <button 
                  type="submit" 
                  disabled={isSending}
                  className={`px-10 py-4 bg-transparent border border-[var(--card-border)] hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)] rounded-full text-[var(--text-primary)] font-medium transition-all duration-300 flex items-center justify-center gap-2 ml-auto ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSending ? "Sending..." : "Submit"} <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
