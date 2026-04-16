export const attendanceOverviewKeys = {
  all: ["attendance-overview"] as const,
  detail: () => [...attendanceOverviewKeys.all, "detail"] as const,
};
