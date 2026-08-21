import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../../../features/auth/authSlice";
import profileService from "../services/profile.service";

export const useProfileStudio = (initialTab = "identity") => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [savingTheme, setSavingTheme] = useState(false);

  // Compute profile completeness strength score
  const strength = useMemo(() => {
    if (!user) return 0;
    let score = 0;
    if (user.profileImage) score += 10;
    if (user.bio || user.summary) score += 15;
    if (Array.isArray(user.experience) && user.experience.length > 0) score += 20;
    if (Array.isArray(user.projects) && user.projects.length > 0) score += 20;
    if (
      (user.skills?.technical && user.skills.technical.length > 0) ||
      (Array.isArray(user.skills) && user.skills.length > 0)
    )
      score += 15;
    if (Array.isArray(user.education) && user.education.length > 0) score += 10;
    if (user.socialLinks && Object.keys(user.socialLinks).length > 0) score += 10;
    return Math.min(score, 100);
  }, [user]);

  // Handle theme preference updates
  const handleThemeUpdate = useCallback(
    async (newSettings, file = null) => {
      setSavingTheme(true);
      try {
        const themeWithName = {
          ...newSettings,
          name: newSettings.name || user?.themeSettings?.name || "CVIFY CLASSIC",
        };
        const res = await profileService.updateThemeSettings(themeWithName, file);
        if (res?.user) {
          dispatch(updateUser(res.user));
          toast.success("✨ Theme preferences synchronized!");
        }
      } catch (err) {
        console.error("Theme sync error:", err);
        toast.error("Failed to sync theme preferences");
      } finally {
        setSavingTheme(false);
      }
    },
    [dispatch, user]
  );

  return {
    user,
    activeTab,
    setActiveTab,
    strength,
    savingTheme,
    handleThemeUpdate,
  };
};

export default useProfileStudio;
