/**
 * AnalyticsVM — Normalizes analytics counters.
 */
export function buildAnalyticsVM(analytics) {
  return {
    views:     analytics?.views           || 0,
    downloads: analytics?.resumeDownloads || 0,
    outreach:  analytics?.contactClicks   || 0,
    raw:       analytics              || null,
  };
}
