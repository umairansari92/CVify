import React, { useMemo } from "react";
import { Cpu, CheckCircle2, AlertCircle } from "lucide-react";

const SkillCoverageGraph = ({ foundKeywords = [], missingKeywords = [] }) => {
  // Categorize skills by domain dynamically
  const domainCoverage = useMemo(() => {
    const allFound = foundKeywords.map((k) => (typeof k === "string" ? k : k?.keyword || k?.name || "").toLowerCase());
    const allMissing = missingKeywords.map((k) => (typeof k === "string" ? k : k?.keyword || k?.name || "").toLowerCase());

    const domains = [
      {
        name: "Frontend & UI Engineering",
        keywords: ["react", "vue", "angular", "javascript", "typescript", "tailwind", "html", "css", "next", "redux", "frontend"],
      },
      {
        name: "Backend & API Architecture",
        keywords: ["node", "express", "python", "django", "java", "golang", "rest", "graphql", "api", "microservices", "backend"],
      },
      {
        name: "Databases & Data Modeling",
        keywords: ["mongodb", "postgresql", "mysql", "redis", "sql", "nosql", "prisma", "database"],
      },
      {
        name: "Cloud, DevOps & Containers",
        keywords: ["docker", "kubernetes", "aws", "gcp", "azure", "ci/cd", "devops", "cloud", "nginx", "linux"],
      },
      {
        name: "Testing & Code Quality",
        keywords: ["jest", "cypress", "mocha", "testing", "unit test", "tdd", "qa", "debugging"],
      },
      {
        name: "Agile, Architecture & Systems",
        keywords: ["agile", "scrum", "system design", "git", "github", "jira", "leadership", "mentoring"],
      },
    ];

    return domains.map((domain) => {
      let matchedCount = 0;
      let totalDomainKeywords = 0;

      domain.keywords.forEach((kw) => {
        const inFound = allFound.some((f) => f.includes(kw));
        const inMissing = allMissing.some((m) => m.includes(kw));

        if (inFound) {
          matchedCount++;
          totalDomainKeywords++;
        } else if (inMissing) {
          totalDomainKeywords++;
        }
      });

      // If no explicit keywords detected in JD for this domain, fallback to a sensible default match rate based on found list
      const pct = totalDomainKeywords > 0
        ? Math.round((matchedCount / totalDomainKeywords) * 100)
        : matchedCount > 0
        ? 85
        : 60;

      return {
        name: domain.name,
        percentage: Math.min(100, pct),
        matchedCount,
        totalCount: Math.max(matchedCount, totalDomainKeywords || 3),
      };
    });
  }, [foundKeywords, missingKeywords]);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-[var(--text-primary)]">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
        <Cpu className="w-4 h-4" />
        DOMAIN-SPECIFIC SKILL COVERAGE
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
          Competency Coverage by Technical Domain
        </h2>
        <p className="text-[var(--text-secondary)] text-xs mt-1">
          High-level recruiter overview showing your alignment across core software engineering pillars.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {domainCoverage.map((domain, idx) => (
          <div key={idx} className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-primary)]">{domain.name}</span>
              <span className={`font-black ${
                domain.percentage >= 80 ? "text-emerald-600 dark:text-emerald-400" : domain.percentage >= 50 ? "text-amber-500" : "text-red-500"
              }`}>
                {domain.percentage}%
              </span>
            </div>

            <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  domain.percentage >= 80 ? "bg-emerald-500" : domain.percentage >= 50 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.max(8, domain.percentage)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
              <span>{domain.percentage >= 80 ? "Strong domain fit" : domain.percentage >= 50 ? "Moderate alignment" : "Gap detected"}</span>
              <span>{domain.percentage >= 80 ? "✓ Verified" : "Needs attention"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SkillCoverageGraph);
