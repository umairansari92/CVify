/**
 * UploadDropZone.jsx — PDF Resume Upload Drop Target
 * Reuses existing handleFileUpload + handleDrop handlers from useResumeLibrary hook.
 */

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import Card from "../../../components/ui/Card";

const UploadDropZone = ({ visible, isUploading, onFileUpload, onDrop }) => (
  <AnimatePresence>
    {visible && (
      <m.div
        key="upload-zone"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden mb-6"
      >
        <Card
          variant="glass"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="p-8 border-2 border-dashed border-primary/30 rounded-3xl text-center flex flex-col items-center justify-center gap-3 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer relative"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => onFileUpload(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center shadow-glow-primary pointer-events-none">
            <FaCloudUploadAlt size={26} />
          </div>
          <div className="pointer-events-none">
            <h4 className="text-base font-bold text-text-primary">
              {isUploading ? "Parsing PDF with AI Engine..." : "Upload or Drag & Drop Resume PDF"}
            </h4>
            <p className="text-xs text-text-muted mt-1">
              PDF only · Max 5MB · AI engine extracts experience & skills automatically
            </p>
          </div>
        </Card>
      </m.div>
    )}
  </AnimatePresence>
);

export default UploadDropZone;
