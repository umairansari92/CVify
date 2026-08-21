import api from "../../../api/axios";

/**
 * profile.service.js
 * Domain-isolated service for User Profile, Digital Identity & Theme operations.
 */
export const profileService = {
  /**
   * Update general profile fields (multipart or JSON)
   */
  async updateProfile(profileData, isMultipart = false) {
    const config = isMultipart
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const res = await api.patch("/auth/profile", profileData, config);
    return res.data;
  },

  /**
   * Update theme settings & banner
   */
  async updateThemeSettings(themeSettings, bannerFile = null) {
    const formData = new FormData();
    formData.append("themeSettings", JSON.stringify(themeSettings));
    if (bannerFile) {
      formData.append("bannerImage", bannerFile);
    }
    const res = await api.patch("/auth/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  /**
   * Change / rotate account security password
   */
  async changePassword(currentPassword, newPassword) {
    const res = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  },

  /**
   * Terminate account identity
   */
  async terminateAccount(password) {
    const res = await api.delete("/auth/delete-account", {
      data: { password },
    });
    return res.data;
  },

  /**
   * Fetch public profile for testing or preview
   */
  async getPublicProfile(username) {
    const res = await api.get(`/auth/p/${username}`);
    return res.data;
  },
};

export default profileService;
