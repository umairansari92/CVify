import React from "react";

const months = [
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

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const DateRangePicker = ({
  label,
  value,
  onChange,
  isPresentAllowed = false,
}) => {
  // Parsing "Jan 2024" or "Present"
  const parseDate = (val) => {
    if (!val || val === "Present")
      return {
        month: "Jan",
        year: currentYear.toString(),
        isPresent: val === "Present",
      };
    const [month, year] = val.split(" ");
    return {
      month: month || "Jan",
      year: year || currentYear.toString(),
      isPresent: false,
    };
  };

  const { month, year, isPresent } = parseDate(value);

  const handleMonthChange = (e) => {
    if (isPresent) return;
    onChange(`${e.target.value} ${year}`);
  };

  const handleYearChange = (e) => {
    if (isPresent) return;
    onChange(`${month} ${e.target.value}`);
  };

  const handlePresentToggle = (e) => {
    if (e.target.checked) {
      onChange("Present");
    } else {
      onChange(`${month} ${year}`);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 group">
          <select
            disabled={isPresent}
            value={month}
            onChange={handleMonthChange}
            className="w-full px-4 py-3 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-blue/30 text-primary dark:text-slate-100 text-sm focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all cursor-pointer font-semibold disabled:opacity-30 disabled:cursor-not-allowed appearance-none"
          >
            {months.map((m) => (
              <option
                key={m}
                value={m}
                className="bg-white dark:bg-midnight text-primary dark:text-slate-100"
              >
                {m}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-action transition-colors">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform scale-125"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="relative flex-1 group">
          <select
            disabled={isPresent}
            value={year}
            onChange={handleYearChange}
            className="w-full px-4 py-3 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-blue/30 text-primary dark:text-slate-100 text-sm focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all cursor-pointer font-semibold disabled:opacity-30 disabled:cursor-not-allowed appearance-none"
          >
            {years.map((y) => (
              <option
                key={y}
                value={y}
                className="bg-white dark:bg-midnight text-primary dark:text-slate-100"
              >
                {y}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-action transition-colors">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform scale-125"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {isPresentAllowed && (
          <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap group ml-2">
            <input
              type="checkbox"
              checked={isPresent}
              onChange={handlePresentToggle}
              className="w-5 h-5 rounded-lg border-2 border-slate-100 dark:border-slate-800 text-action focus:ring-action/20 bg-white dark:bg-midnight transition-all cursor-pointer"
            />
            <span className="group-hover:text-action transition-colors">
              Present
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
