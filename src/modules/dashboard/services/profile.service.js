export const profileService = {
  getProfileData(user) {
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "Umair Ahmed Ansari";
    const headline = user?.headline || "MERN Stack Developer & Chatbot Developer.";
    const location = user?.location || "Karachi, PK";
    const completionScore = user?.completionScore || 91;
    const avatar = user?.profileImage || user?.profilePicture || user?.avatar || user?.image;
    
    // Skills helper
    let skills = [];
    if (Array.isArray(user?.skills)) {
      skills = user.skills.map(s => s?.name || s).filter(Boolean);
    } else if (user?.skills && typeof user.skills === "object") {
      skills = [...(user.skills.technical || []), ...(user.skills.soft || []), ...(user.skills.strategic || [])];
    }
    if (skills.length === 0) {
      skills = ["GenerativeAI", "Frontend Web Development", "MERN Stack Web Development", "Chatbot Development"];
    }

    return {
      fullName,
      headline,
      location,
      completionScore,
      avatar,
      skills,
      bio: user?.bio || user?.summary || "Architecting next-generation digital products as an AI-Powered Developer.",
      email: user?.email || "umair.ansari.92@gmail.com",
      link: user?.socialLinks?.linkedin || user?.website || (user?.username ? `cvifypro/p/${user.username}` : "linkedin.com/in/umairansari92"),
      openToWork: user?.openToWork ?? true,
    };
  }
};
