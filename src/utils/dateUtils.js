export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Converts a date string like "Jan 2024" or "Present" into a numeric value for comparison.
 * @param {string} dateString
 * @returns {number}
 */
export const dateToValue = (dateString) => {
  if (!dateString || dateString === "Present") {
    return 999999;
  }

  // Support MM-YYYY or MM/YYYY
  const mmYyyyMatch = dateString.match(/^(\d{1,2})[-/](\d{4})$/);
  if (mmYyyyMatch) {
    const month = parseInt(mmYyyyMatch[1]);
    const year = parseInt(mmYyyyMatch[2]);
    return year * 12 + (month - 1);
  }

  // Support YYYY-MM or YYYY/MM
  const yyyyMmMatch = dateString.match(/^(\d{4})[-/](\d{1,2})$/);
  if (yyyyMmMatch) {
    const year = parseInt(yyyyMmMatch[1]);
    const month = parseInt(yyyyMmMatch[2]);
    return year * 12 + (month - 1);
  }

  const parts = dateString.split(" ");
  if (parts.length === 1) {
    const yearNum = parseInt(parts[0]);
    if (isNaN(yearNum)) return 0;
    if (parts[0].length === 4) return yearNum * 12 + 11; // Year only -> end of year
    return 0;
  }

  const [month, year] = parts;
  const monthIndex = months.findIndex((m) =>
    month.toLowerCase().startsWith(m.toLowerCase()),
  );
  const yearNum = parseInt(year);

  if (isNaN(yearNum) || monthIndex === -1) {
    return 0;
  }

  return yearNum * 12 + monthIndex;
};


/**
 * Validates if the end date is after or equal to the start date.
 * @param {string} startDate
 * @param {string} endDate
 * @returns {boolean}
 */
export const isValidDateRange = (startDate, endDate) => {
  return dateToValue(endDate) >= dateToValue(startDate);
};
