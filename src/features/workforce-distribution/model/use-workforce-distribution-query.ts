import { useQuery } from "@tanstack/react-query";

import { fetchWorkforceDistribution } from "../api/fetch-workforce-distribution";
import { workforceDistributionKeys } from "../api/query-keys";

export function useWorkforceDistributionQuery() {
  return useQuery({
    queryKey: workforceDistributionKeys.detail(),
    queryFn: fetchWorkforceDistribution,
  });
}
