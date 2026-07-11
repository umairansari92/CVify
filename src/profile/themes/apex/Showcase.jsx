import React from "react";
import InlineEdit from "../../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const Showcase = ({ projects, isOwner, handleArrayUpdate }) => {
  if (!Array.isArray(projects) || (projects.length === 0 && !isOwner)) return null;

  const getProjectImage = (p) =>
    p?.image || p?.thumbnail || p?.imageUrl || p?.coverImage || null;

  return (
    <section
      id="showcase"
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
            My Projects
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            Portfolio Showcase
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {projects.length === 0 && isOwner ? (
          <div
            className="text-center py-10 rounded-2xl border"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
          >
            <p>Add projects from your profile editor to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => {
              const img = getProjectImage(p);
              const techStack = Array.isArray(p?.techStack) ? p.techStack : [];

              return (
                <div
                  key={p?._id || i}
                  className="group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-teal-500/40"
                  style={{
                    backgroundColor: tokens.colors.bg,
                    borderColor: tokens.colors.border,
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-44 overflow-hidden bg-gray-900">
                    {img ? (
                      <img
                        src={img}
                        alt={p?.title || "Project"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x400/161920/2D9881?text=${encodeURIComponent(p?.title || "Project")}`;
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-4xl"
                        style={{ backgroundColor: tokens.colors.surface }}
                      >
                        🛠️
                      </div>
                    )}
                    <div
                      className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-widest"
                      style={{ backgroundColor: `${tokens.colors.accent}CC`, color: "#fff" }}
                    >
                      {`Project ${i + 1}`}
                    </div>
                  </div>

                  {/* Project Body */}
                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    <InlineEdit
                      isOwner={isOwner}
                      id={`proj-title-${i}`}
                      value={p?.title || ""}
                      onSave={(v) => handleArrayUpdate?.("projects", i, { title: v })}
                    >
                      <h3 className="text-lg font-bold" style={{ color: tokens.colors.primary }}>
                        {p?.title || "Project Title"}
                      </h3>
                    </InlineEdit>

                    <InlineEdit
                      isOwner={isOwner}
                      id={`proj-desc-${i}`}
                      value={p?.description || ""}
                      type="textarea"
                      multiline={true}
                      onSave={(v) => handleArrayUpdate?.("projects", i, { description: v })}
                    >
                      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: tokens.colors.secondary }}>
                        {p?.description || "Project description goes here."}
                      </p>
                    </InlineEdit>

                    {/* Tech Stack Tags */}
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {techStack.map((tech, ti) => (
                          <span
                            key={ti}
                            className="px-2 py-1 rounded-md text-xs font-semibold"
                            style={{
                              backgroundColor: `${tokens.colors.accent}18`,
                              color: tokens.colors.accent,
                              border: `1px solid ${tokens.colors.accent}30`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-3 mt-auto">
                      {p?.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 text-center rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                          style={{ backgroundColor: tokens.colors.accent }}
                        >
                          View Project
                        </a>
                      )}
                      {p?.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 text-center rounded-xl text-sm font-semibold transition-all duration-300 border hover:bg-white/5 hover:-translate-y-0.5"
                          style={{
                            color: tokens.colors.primary,
                            borderColor: tokens.colors.border,
                          }}
                        >
                          GitHub
                        </a>
                      )}
                      {!p?.liveLink && !p?.githubLink && (
                        <span
                          className="flex-1 py-2 text-center rounded-xl text-sm font-semibold border"
                          style={{
                            color: tokens.colors.secondary,
                            borderColor: tokens.colors.border,
                          }}
                        >
                          View Project
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Showcase;
