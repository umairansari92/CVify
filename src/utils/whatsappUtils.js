/**
 * Generates a dynamic WhatsApp URL based on visitor data in localStorage.
 * If a visitor is logged in, the message is personalized with their details.
 * 
 * @param {string} ownerName - The name of the profile/resume owner.
 * @param {string} ownerPhone - The phone number of the profile/resume owner.
 * @returns {string} The encoded WhatsApp URL.
 */
export const getDynamicWhatsAppLink = (ownerName, ownerPhone) => {
  // 1. Get Visitor Data from Local Storage
  const visitorName = localStorage.getItem("Full name");
  const visitorEmail = localStorage.getItem("Email");
  const visitorPhone = localStorage.getItem("Mobile Number");
  const visitorLocation = localStorage.getItem("Location");

  // 2. Format Owner Phone (Remove +, spaces, or dashes)
  const formattedPhone = ownerPhone ? ownerPhone.replace(/\D/g, '') : "";
  
  // 3. Get Owner's First Name for a friendly greeting
  const firstName = ownerName ? ownerName.split(' ')[0] : "there";

  let message = "";

  // 4. Conditional Message Logic
  if (visitorName) {
    // SCENARIO A: Visitor is Logged In (Data Exists)
    const locationText = visitorLocation ? ` from ${visitorLocation}` : "";
    
    message = `Hi ${firstName},\n\nI am ${visitorName}${locationText}. I just saw your premium portfolio and I have an exciting project opportunity I'd love to discuss with you.\n\nIf you are interested, please contact me at:\n📞 ${visitorPhone || 'N/A'}\n📧 ${visitorEmail || 'N/A'}`;
  } else {
    // SCENARIO B: Visitor is NOT Logged In (Normal Message)
    message = `Hi ${firstName},\n\nI just saw your premium portfolio! Let's connect and build something extraordinary together! 🚀`;
  }

  // 5. Encode for URL and return
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
