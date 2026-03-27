import React from 'react';
import ScoreCard from './ScoreCard';
import ScoreBreakdown from './ScoreBreakdown';
import KeywordGapAnalyzer from './KeywordGapAnalyzer'; // [V3]
import BulletImprovements from './BulletImprovements';
import SuggestionsList from './SuggestionsList';

const ATSResult = ({ data }) => {
  if (!data) return null;

  // Normalize data for both Real-time Response and History Model (ATSScan)
  const scoreSource = data.scores || data.score || {};
  const overall = data.overallScore || scoreSource.overall || 0;
  
  const normalizedScores = {
    formatting: scoreSource.formatting || 0,
    keywords: scoreSource.keywords || scoreSource.keywordMatch || 0,
    quantification: data.quantificationRate || scoreSource.quantification || 0,
    impact: scoreSource.impact || 0,
  };

  const feedback = data.feedback || {};

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-1000 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- SECTION 1: THE HUD (Scores) --- */}
        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ScoreCard score={overall} />
          </div>
          <div className="lg:col-span-2">
            <ScoreBreakdown scores={normalizedScores} />
          </div>
        </div>

        {/* --- SECTION 2: THE GAP ANALYZER (Premium Feature) --- */}
        <div className="lg:col-span-12">
          <KeywordGapAnalyzer missingKeywords={data.missingKeywords || feedback.missingKeywords} />
        </div>

        {/* --- SECTION 3: DEEP AUDIT (Bullets & Advice) --- */}
        <div className="lg:col-span-7">
          <BulletImprovements bullets={data.weakBullets} />
        </div>

        <div className="lg:col-span-5">
          <SuggestionsList suggestions={data.suggestions} />
        </div>
      </div>
    </div>
  );
};

export default ATSResult;
