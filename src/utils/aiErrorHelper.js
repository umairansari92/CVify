/**
 * Clean and format technical AI / Gemini errors into user-friendly messages.
 * 
 * Handles errors like:
 * [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/... [503 Service Unavailable] This model is currently experiencing high demand.
 * 
 * @param {string|any} msg The raw error message string or object
 * @returns {string} The cleaned user-friendly error message
 */
export const cleanAiError = (msg) => {
  if (!msg) return "An unexpected error occurred.";
  
  if (typeof msg !== "string") {
    // If it's an object, check common nested message properties
    if (msg.message && typeof msg.message === "string") {
      msg = msg.message;
    } else {
      try {
        msg = JSON.stringify(msg);
      } catch (e) {
        return "An unexpected AI service error occurred.";
      }
    }
  }

  // Check if it's a Gemini / Google Generative AI error
  const isGeminiError = 
    msg.includes("GoogleGenerativeAI") || 
    msg.includes("generativelanguage.googleapis.com") || 
    msg.includes("generateContent");

  if (isGeminiError) {
    // 1. 503 / Service Unavailable / High demand
    if (
      msg.includes("503") || 
      msg.includes("Service Unavailable") || 
      msg.includes("high demand") || 
      msg.includes("temporary") ||
      msg.includes("overloaded")
    ) {
      return "The AI engine is currently experiencing high demand. Please try again in a few moments.";
    }

    // 2. 429 / Rate Limit / Quota Exceeded
    if (
      msg.includes("429") || 
      msg.includes("Quota exceeded") || 
      msg.includes("rate limit") || 
      msg.includes("ResourceExhausted")
    ) {
      return "AI request limit reached. Please wait a bit before trying again.";
    }

    // 3. 400 / Blocked / Safety filters
    if (
      msg.includes("safety") || 
      msg.includes("blocked") || 
      msg.includes("CandidateWasBlocked") ||
      msg.includes("finishReason: SAFETY")
    ) {
      return "The input content was flagged or blocked by AI safety filters. Please try rephrasing or removing sensitive details.";
    }

    // 4. 401 / 403 API Key issues
    if (
      msg.includes("API key not valid") || 
      msg.includes("API_KEY_INVALID") || 
      msg.includes("API key") || 
      msg.includes("API key expired")
    ) {
      return "AI service is currently misconfigured. Please contact support.";
    }

    // 5. 500 / Internal Server Error
    if (msg.includes("500") || msg.includes("Internal Server Error")) {
      return "The AI engine encountered an internal server error. Please try again later.";
    }

    // 6. Generic Gemini Error Fallback
    // Attempt to extract the text after a bracketed status code (e.g. `[503 Service Unavailable] actual message`)
    const bracketedMatch = msg.match(/\[\d+\s+[^\]]+\]\s*(.*)$/);
    if (bracketedMatch && bracketedMatch[1]) {
      const extracted = bracketedMatch[1].trim();
      if (extracted.length > 5) {
        return extracted;
      }
    }

    // Attempt to extract text after the last colon if it's long enough
    const lastColonIndex = msg.lastIndexOf(":");
    if (lastColonIndex !== -1 && lastColonIndex < msg.length - 1) {
      const extracted = msg.substring(lastColonIndex + 1).trim();
      if (extracted.length > 5 && !extracted.includes("http")) {
        return extracted;
      }
    }

    return "AI service is temporarily unavailable. Please try again later.";
  }

  return msg;
};
