import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";

const InlineEditable = ({ value, path, className, multiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentValue !== value) {
      // Logic for nested paths like "personalInfo.fullName"
      // Note: resumeSlice currently only supports top-level setResumeField
      // We might need a more robust update handler or dispatch nested updates
      dispatch(setResumeField({ field: path, value: currentValue }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline) {
      handleBlur();
    }
    if (e.key === "Escape") {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-primary/5 outline-none border-b border-primary resize-none ${className}`}
        style={{ height: "auto", minHeight: "1em" }}
      />
    ) : (
      <input
        ref={inputRef}
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-primary/5 outline-none border-b border-primary ${className}`}
      />
    );
  }

  return (
    <span 
      onClick={() => setIsEditing(true)}
      className={`cursor-text hover:bg-primary/5 hover:ring-2 hover:ring-primary/20 rounded px-1 -mx-1 transition-all ${className}`}
    >
      {value || <span className="opacity-30 italic">Click to edit</span>}
    </span>
  );
};

export default InlineEditable;
