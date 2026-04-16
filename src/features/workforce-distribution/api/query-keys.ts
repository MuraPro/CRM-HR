export const workforceDistributionKeys = {
  all: ["workforce-distribution"] as const,
  detail: () => [...workforceDistributionKeys.all, "detail"] as const,
};
