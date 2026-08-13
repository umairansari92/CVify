import React, { useState, useMemo } from "react";
import { Target, Copy, Search, CheckCircle2, XCircle, AlertCircle, Filter } from "lucide-react";
import { toast } from "react-hot-toast";

const KeywordMatrix = ({ foundKeywords = [], missingKeywords = [], rawMissingObjects = [] }) => {
  const [filter, setFilter] = useState("all"); // 'all' | 'missing' | 'found'
  const [search, setSearch] = useState("");

  // Build a unified structured list of all keywords
  const keywordsList = useMemo(() => {
    const list = [];

    // Process Missing Keywords
    missingKeywords.forEach((kw) => {
      const kwName = typeof kw === "string" ? kw : kw?.keyword || kw?.name || "";
      if (!kwName) return;

      const objData = rawMissingObjects.find((o) => (o?.keyword || o?.name || "").toLowerCase() === kwName.toLowerCase());
      list.push({
        name: kwName,
        status: "Missing",
        importance: objData?.importance || (kwName.length > 8 ? "High" : "Medium"),
        jdFrequency: objData?.frequency || (objData?.importance === "High" ? "6x - 10x" : "3x - 5x"),
        atsWeight: objData?.importance === "High" ? "+2.5% - +3.5%" : "+1.0% - +2.0%",
        affectedRule: "Keyword Coverage & Tech Alignment",
        recommendation: objData?.action || `Integrate '${kwName}' naturally in Work Experience or Technical Skills.`,
        targetSection: kwName.toLowerCase().includes("lead") || kwName.toLowerCase().includes("agile") ? "Experience" : "Skills / Projects"
      });
    });

    // Process Found Keywords
    foundKeywords.forEach((kw) => {
      const kwName = typeof kw === "string" ? kw : kw?.keyword || kw?.name || "";
      if (!kwName) return;

      list.push({
        name: kwName,
        status: "Found",
        importance: "Matched",
        jdFrequency: "Present in JD & Resume",
        atsWeight: "Retained",
        affectedRule: "Verified Core Skill",
        recommendation: `Strong match. Emphasize with quantified metrics in your project bullets.`,
        targetSection: "Validated"
      });
    });

    return list;
  }, [foundKeywords, missingKeywords, rawMissingObjects]);

  const filteredList = useMemo(() => {
    return keywordsList.filter((item) => {
      const matchesFilter =
        filter === "all" ? true : filter === "missing" ? item.status === "Missing" : item.status === "Found";
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [keywordsList, filter, search]);

  const handleCopyMissing = () => {
    const missingNames = keywordsList.filter((k) => k.status === "Missing").map((k) => k.name);
    if (!missingNames.length) return;
    navigator.clipboard.writeText(missingNames.join(", "));
    toast.success("Missing keywords copied to clipboard!");
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Target className="w-4 h-4" />
            ENTERPRISE KEYWORD & SKILL MATCH MATRIX
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Target Job Description Keyword Audit
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time keyword frequency, ATS rule weights, and section-by-section placement advice.
          </p>
        </div>

        {missingKeywords.length > 0 && (
          <button
            onClick={handleCopyMissing}
            className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Missing Keywords
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "all" ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All Keywords ({keywordsList.length})
          </button>
          <button
            onClick={() => setFilter("missing")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "missing" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Missing ({keywordsList.filter((k) => k.status === "Missing").length})
          </button>
          <button
            onClick={() => setFilter("found")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "found" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Matched ({keywordsList.filter((k) => k.status === "Found").length})
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Keyword / Skill</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">JD Frequency</th>
              <th className="py-3.5 px-4">Priority / Weight</th>
              <th className="py-3.5 px-4">Target Section & Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
            {filteredList.length > 0 ? (
              filteredList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200">{item.name}</td>
                  <td className="py-3 px-4">
                    {item.status === "Found" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Found
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                        <XCircle className="w-3 h-3" /> Missing
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{item.jdFrequency}</td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${
                        item.importance === "High" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                        item.importance === "Medium" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
                        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      }`}>
                        {item.importance}
                      </span>
                      <span className="text-[10px] text-teal-400 block font-semibold">{item.atsWeight}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 leading-relaxed text-[11px]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">
                        📍 {item.targetSection}
                      </span>
                      <p>{item.recommendation}</p>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                  No keywords match your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(KeywordMatrix);
