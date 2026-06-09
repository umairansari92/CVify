import React from "react";
import Card from "../components/ui/Card";
import { FaMapSigns, FaTools } from "react-icons/fa";

const CareerRoadmap = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <Card variant="glass" className="text-center p-16 flex flex-col items-center justify-center glow-primary">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-glow-primary">
          <FaMapSigns size={40} />
        </div>
        <h1 className="text-4xl font-black text-text-primary mb-4 tracking-tight">Career Roadmap</h1>
        <p className="text-xl text-text-secondary font-medium mb-8">Strategic Path Planning</p>
        
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-warning/10 text-warning border border-warning/20 font-bold uppercase tracking-widest text-xs">
          <FaTools /> Under Construction
        </div>
        
        <p className="mt-8 text-text-muted max-w-lg mx-auto leading-relaxed">
          This module is currently under development. In the future, you will be able to visualize and plan your entire career trajectory, tracking milestones and required skill acquisitions.
        </p>
      </Card>
    </div>
  );
};

export default CareerRoadmap;
