import React from "react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Testimonials = ({ user, isOwner, handleArrayUpdate }) => {
  const list = Array.isArray(user?.testimonials) ? user.testimonials : [];
  if (list.length === 0 && !isOwner) return null;

  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Testimonials
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            What People Say
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {list.length === 0 && isOwner ? (
          <div
            className="text-center py-10 rounded-2xl border"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
          >
            <p>Add testimonials from your profile editor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((t, index) => (
              <div
                key={t?._id || index}
                className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:border-teal-500/30 flex flex-col"
                style={{
                  backgroundColor: tokens.colors.bg,
                  borderColor: tokens.colors.border,
                }}
              >
                {/* Quote */}
                <div className="text-3xl mb-4" style={{ color: tokens.colors.accent }}>❝</div>

                <InlineEdit
                  isOwner={isOwner}
                  id={`test-msg-${index}`}
                  value={t?.message || ""}
                  type="textarea"
                  multiline={true}
                  onSave={(v) => handleArrayUpdate?.("testimonials", index, { message: v })}
                >
                  <p className="text-sm leading-relaxed flex-1 italic" style={{ color: tokens.colors.secondary }}>
                    {t?.message || "This testimonial was incredibly helpful and insightful."}
                  </p>
                </InlineEdit>

                {/* Author info */}
                <div className="mt-6 flex items-center gap-3 pt-4 border-t" style={{ borderColor: tokens.colors.border }}>
                  {t?.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t?.name || ""}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t?.name || "user")}`;
                      }}
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: `${tokens.colors.accent}30`, color: tokens.colors.accent }}
                    >
                      {(t?.name?.charAt?.(0) || "?").toUpperCase()}
                    </div>
                  )}
                  <div>
                    <InlineEdit
                      isOwner={isOwner}
                      id={`test-name-${index}`}
                      value={t?.name || ""}
                      onSave={(v) => handleArrayUpdate?.("testimonials", index, { name: v })}
                    >
                      <p className="text-sm font-bold" style={{ color: tokens.colors.primary }}>
                        {t?.name || "Person Name"}
                      </p>
                    </InlineEdit>
                    <InlineEdit
                      isOwner={isOwner}
                      id={`test-role-${index}`}
                      value={t?.role || ""}
                      onSave={(v) => handleArrayUpdate?.("testimonials", index, { role: v })}
                    >
                      <p className="text-xs" style={{ color: tokens.colors.secondary }}>
                        {t?.role || "Role"}
                      </p>
                    </InlineEdit>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;
