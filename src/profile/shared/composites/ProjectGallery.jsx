import React from "react";
import Image from "../primitives/Image.jsx";
import Badge from "../primitives/Badge.jsx";
import { ExternalLink, Github } from "lucide-react";

/**
 * ProjectGallery — Shared composite. Grid of project cards.
 *
 * Props:
 *   projects: ProjectVM[]  — from ViewModel
 *   columns:  2 | 3        — grid columns (default 3)
 */
const ProjectGallery = ({ projects = [], columns = 3 }) => {
  if (!projects.length) return null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns >= 3 ? "lg:grid-cols-3" : ""} gap-6`}>
      {projects.map((p, i) => (
        <div
          key={p._id || i}
          className="group flex flex-col bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-[var(--card-bg)]">
            <Image
              src={p.image}
              alt={p.title || "Project"}
              fallback={`https://placehold.co/600x340?text=${encodeURIComponent(p.title || "Project")}`}
              className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="text-base font-black text-[var(--text-primary)] leading-tight">{p.title}</h3>
            {p.description && (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">{p.description}</p>
            )}

            {Array.isArray(p.techStack) && p.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.techStack.slice(0, 4).map((t, ti) => <Badge key={ti} variant="muted">{t}</Badge>)}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 border-t border-[var(--card-border)]">
              {p.githubLink && (
                <a href={p.githubLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                  <Github size={13} /> Code
                </a>
              )}
              {p.liveLink && (
                <a href={p.liveLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                  <ExternalLink size={13} /> Live
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;
