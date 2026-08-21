import React, { useState, useCallback, useEffect, useRef } from "react";
import { PROFILE_SECTIONS } from "../../data/profileSections";
import StudioSectionTabs from "./StudioSectionTabs";
import StudioPreviewCanvas from "./StudioPreviewCanvas";
import FieldGuidePanel from "./FieldGuidePanel";
import PublicPortfolioMapper from "./PublicPortfolioMapper";

// Static preview image imports (all 11 sections)
import img0  from "../../../../../Profile/Profile.png";
import img1  from "../../../../../Profile/Profile1.png";
import img2  from "../../../../../Profile/Profile2.png";
import img3  from "../../../../../Profile/Profile3.png";
import img4  from "../../../../../Profile/Profile4.png";
import img5  from "../../../../../Profile/Profile5.png";
import img6  from "../../../../../Profile/Profile6.png";
import img7  from "../../../../../Profile/Profile7.png";
import img8  from "../../../../../Profile/Profile8.png";
import img9  from "../../../../../Profile/Profile9.png";
import img10 from "../../../../../Profile/Profile10.png";

const PREVIEW_IMAGES = {
  identity:     img0,
  branding:     img1,
  portfolio:    img2,
  experience:   img3,
  education:    img4,
  expertise:    img5,
  credentials:  img6,
  security:     img7,
  ai:           img8,
  theme:        img9,
  intelligence: img10,
};

/**
 * ProfileStudioExplorer.jsx
 * Root orchestrator for the interactive 11-section studio guide.
 * Manages 2-way synchronized state between:
 *   - StudioSectionTabs (left nav)
 *   - StudioPreviewCanvas (center — live interactive UI canvas + hotspots)
 *   - FieldGuidePanel (right — 7-part field guide cards)
 *   - PublicPortfolioMapper (modal — shows public portfolio field placement)
 */
const ProfileStudioExplorer = () => {
  const [activeSectionId, setActiveSectionId] = useState("identity");
  const [activeFieldId, setActiveFieldId] = useState(null);
  const [portfolioMapFieldId, setPortfolioMapFieldId] = useState(null);
  const guidePanelRef = useRef(null);

  // When section changes, reset to the section's default field
  const handleSectionSelect = useCallback((sectionId) => {
    setActiveSectionId(sectionId);
    const section = PROFILE_SECTIONS.find((s) => s.id === sectionId);
    setActiveFieldId(section?.defaultFieldId || null);
  }, []);

  // 2-way sync: hotspot pin click → auto-scroll guide panel to field card
  const handleHotspotClick = useCallback((fieldId) => {
    setActiveFieldId(fieldId);
    // Scroll the field card into view
    setTimeout(() => {
      const cardEl = document.getElementById(`field-card-${fieldId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 80);
  }, []);

  // 2-way sync: guide card click → same field is now active (canvas will highlight it)
  const handleFieldSelect = useCallback((fieldId) => {
    setActiveFieldId((prev) => (prev === fieldId ? null : fieldId));
  }, []);

  // Open portfolio mapper modal
  const handleShowPortfolio = useCallback((fieldId) => {
    setPortfolioMapFieldId(fieldId);
  }, []);

  // Initialize the default field for initial section
  useEffect(() => {
    const section = PROFILE_SECTIONS.find((s) => s.id === activeSectionId);
    if (section?.defaultFieldId) setActiveFieldId(section.defaultFieldId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="studio-explorer"
      style={{
        width: "100%",
        padding: "0",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 24,
            background: "rgba(102,144,125,0.12)",
            border: "1px solid rgba(102,144,125,0.25)",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--primary, #66907D)",
              animation: "hotspot-pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--primary, #66907D)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Interactive Studio Guide
          </span>
        </div>
        <h2
          style={{
            margin: "0 0 12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(24px, 4vw, 38px)",
            fontWeight: 900,
            color: "var(--text-primary, #0f0f12)",
            lineHeight: 1.2,
          }}
        >
          Every Field.{" "}
          <span style={{ color: "var(--primary, #66907D)" }}>Explained. </span>
          Live.
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            color: "var(--text-secondary, #666)",
            maxWidth: 540,
            marginInline: "auto",
            lineHeight: 1.7,
          }}
        >
          Click any <strong>numbered pin</strong> on the preview or any <strong>field card</strong> below to see exactly what to write, why recruiters care, and where it appears on your live portfolio.
        </p>
      </div>

      {/* 3-column explorer layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr 340px",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Section Navigation ── */}
        <div
          style={{
            position: "sticky",
            top: 80,
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            padding: "4px 4px 4px 0",
          }}
        >
          <StudioSectionTabs
            activeSectionId={activeSectionId}
            onSelect={handleSectionSelect}
          />
        </div>

        {/* ── CENTER: Interactive Preview Canvas ── */}
        <div style={{ position: "sticky", top: 80 }}>
          <StudioPreviewCanvas
            sectionId={activeSectionId}
            activeFieldId={activeFieldId}
            onHotspotClick={handleHotspotClick}
            previewImages={PREVIEW_IMAGES}
          />

          {/* Section summary card below canvas */}
          <SectionSummaryCard sectionId={activeSectionId} />
        </div>

        {/* ── RIGHT: Field Guide Panel ── */}
        <div
          ref={guidePanelRef}
          style={{
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            padding: "4px 0 4px 4px",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(102,144,125,0.8)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            Field Guide — click to expand
          </div>
          <FieldGuidePanel
            sectionId={activeSectionId}
            activeFieldId={activeFieldId}
            onFieldSelect={handleFieldSelect}
            onShowPortfolio={handleShowPortfolio}
          />
        </div>
      </div>

      {/* Portfolio Mapper Modal */}
      {portfolioMapFieldId && (
        <PublicPortfolioMapper
          fieldId={portfolioMapFieldId}
          onClose={() => setPortfolioMapFieldId(null)}
        />
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1100px) {
          #studio-explorer .explorer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          #studio-explorer .explorer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

/* Section summary card shown below the canvas */
const SectionSummaryCard = ({ sectionId }) => {
  const section = PROFILE_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return null;

  return (
    <div
      style={{
        marginTop: 12,
        padding: "14px 16px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        {section.number} — {section.title}
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.6,
        }}
      >
        {section.summary}
      </p>
      <div
        style={{
          paddingTop: 8,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          fontStyle: "italic",
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: "var(--primary, #66907D)", fontStyle: "normal" }}>Recruiter lens:</strong>{" "}
        {section.recruiterIntent}
      </div>
    </div>
  );
};

export default ProfileStudioExplorer;
