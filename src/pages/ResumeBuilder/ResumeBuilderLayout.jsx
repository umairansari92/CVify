import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../features/resume/resumeThunk";
import { initNewResume } from "../../features/resume/resumeSlice";
import { updateResume, createResume } from "../../features/resume/resumeThunk";
import { handleDownloadPDF } from "../../utils/pdfExport";
import toast from "react-hot-toast";
import useIsMobile from "../../hooks/useIsMobile";
import DesktopResumeBuilder from "./desktop/DesktopResumeBuilder";
import MobileResumeBuilder from "./mobile/MobileResumeBuilder";

const ResumeBuilderLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile(768);

  const [activeSection, setActiveSection] = useState("personal");
  const [activeTab, setActiveTab] = useState("Content");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [limitInfo, setLimitInfo] = useState(null);

  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getResumeById(id));
    } else {
      dispatch(initNewResume());
    }
  }, [dispatch, id]);

  const handleSave = async (useDiamonds = false) => {
    if (!currentResume) return;

    const toastId = toast.loading(
      useDiamonds ? "Processing diamonds..." : "Saving your resume..."
    );
    try {
      if (id || currentResume._id) {
        await dispatch(
          updateResume({ id: id || currentResume._id, data: currentResume })
        );
        toast.success("Resume saved successfully!", { id: toastId });
      } else {
        const result = await dispatch(
          createResume({ ...currentResume, useDiamonds })
        );

        if (result.type.includes("fulfilled")) {
          toast.success(
            useDiamonds
              ? "Unlocked & Created successfully!"
              : "Resume created successfully!",
            { id: toastId }
          );
          setLimitInfo(null);
        } else if (result.payload?.limitReached) {
          toast.dismiss(toastId);
          setLimitInfo(result.payload.details);
        } else {
          throw new Error(result.payload?.message || "Failed to create");
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to save", { id: toastId });
    }
  };

  const handleExport = () => {
    if (!currentResume) return toast.error("No resume data to export");
    handleDownloadPDF(currentResume, currentResume.templateId || "classic");
  };

  return isMobile ? (
    <MobileResumeBuilder
      currentResume={currentResume}
      user={user}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isImportModalOpen={isImportModalOpen}
      setIsImportModalOpen={setIsImportModalOpen}
      limitInfo={limitInfo}
      setLimitInfo={setLimitInfo}
      handleSave={handleSave}
      handleExport={handleExport}
      dispatch={dispatch}
    />
  ) : (
    <DesktopResumeBuilder
      currentResume={currentResume}
      user={user}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isImportModalOpen={isImportModalOpen}
      setIsImportModalOpen={setIsImportModalOpen}
      limitInfo={limitInfo}
      setLimitInfo={setLimitInfo}
      handleSave={handleSave}
      handleExport={handleExport}
      dispatch={dispatch}
    />
  );
};

export default ResumeBuilderLayout;
