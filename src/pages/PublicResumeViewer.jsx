import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../api/axios";
import { getDOMTemplate } from "../components/templates/TemplateRegistry";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";

const PublicResumeViewer = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        const response = await api.get(`/public/resumes/${id}`);
        setResume(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Resume not found or the link is invalid.");
        } else if (err.response && err.response.status === 403) {
          setError("This resume is no longer public.");
        } else {
          setError("An error occurred while loading the resume.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
        <p className="text-slate-400 text-sm tracking-widest uppercase font-bold">Loading Resume...</p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <Helmet>
          <title>Resume Not Found | CVify</title>
        </Helmet>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">{error}</h1>
        <p className="text-slate-400 max-w-md">
          The link you followed may be broken, or the owner may have changed their privacy settings.
        </p>
        <Link to="/">
          <Button variant="glow">Create Your Own Resume on CVify</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <Helmet>
        <title>{resume.personalInfo?.fullName ? `${resume.personalInfo.fullName}'s Resume` : 'Shared Resume'} | CVify</title>
        <meta name="description" content={`View ${resume.personalInfo?.fullName || 'this candidate'}'s professional resume on CVify.`} />
      </Helmet>

      {/* Top Action Bar (Branding) */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-8 bg-slate-950/50 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-0.5">Powered By</span>
          <span className="text-lg font-black text-white tracking-tighter leading-none">CVify</span>
        </div>
        <Link to="/">
          <Button variant="outline" className="!text-xs h-9">
            Build Yours for Free
          </Button>
        </Link>
      </div>

      {/* The Resume Container */}
      <div className="w-full overflow-auto flex justify-center pb-20 no-scrollbar">
        <div 
          className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] shrink-0"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {getDOMTemplate(resume.templateId || "classic", resume, false)}
        </div>
      </div>
    </div>
  );
};

export default PublicResumeViewer;
