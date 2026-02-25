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
    // Return a value in the far future for comparison
    return 999999;
  }

  const [month, year] = dateString.split(" ");
  const monthIndex = months.indexOf(month);
  const yearNum = parseInt(year);

  if (isNaN(yearNum) || monthIndex === -1) {
    return 0;
  }

  // Value = Year * 12 + MonthIndex
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
