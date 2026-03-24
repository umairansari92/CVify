import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

const InlineEdit = ({
  value,
  onSave,
  type = "input",
  className = "",
  isOwner = false,
  multiline = false,
  label = "",
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (isOwner) setIsEditing(true);
  };

  const handleSave = () => {
    if (tempValue !== value) {
      onSave(tempValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isOwner) {
    return <div className={className}>{children || value}</div>;
  }

  if (isEditing) {
    return (
      <div className="relative group/edit-input w-full">
        {multiline ? (
          <textarea
            ref={inputRef}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full bg-foreground/10 border-2 border-action rounded-xl px-4 py-2 outline-none text-text-primary ${className}`}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full bg-foreground/10 border-b-2 border-action outline-none text-text-primary ${className}`}
          />
        )}
        <div className="absolute -top-8 right-0 flex gap-2 scale-75 origin-right">
          <button
            onClick={handleSave}
            className="p-2 bg-emerald-500 text-white rounded-full"
          >
            <FaCheck />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 bg-red-500 text-white rounded-full"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`group/edit relative cursor-pointer hover:ring-2 hover:ring-action/20 hover:rounded-lg transition-all ${className}`}
    >
      {children || value || (
        <span className="text-text-muted italic">Click to add {label}...</span>
      )}
      <FaPencilAlt className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/edit:opacity-50 text-action text-xs transition-opacity" />
    </div>
  );
};

export default InlineEdit;
