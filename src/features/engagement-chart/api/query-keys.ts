export const engagementChartKeys = {
  all: ["engagement-chart"] as const,
  detail: () => [...engagementChartKeys.all, "detail"] as const,
};
