/** Safe string for UI — avoids React #31 when error is an object (e.g. { message, email }) */
export function formatAuthError(error) {
  if (error == null) return "";
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message ?? "");
  }
  try {
    return JSON.stringify(error);
  } catch {
    return "Something went wrong";
  }
}
