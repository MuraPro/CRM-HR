import { useQuery } from "@tanstack/react-query";

import { fetchEngagementChart } from "../api/fetch-engagement-chart";
import { engagementChartKeys } from "../api/query-keys";

export function useEngagementChartQuery() {
  return useQuery({
    queryKey: engagementChartKeys.detail(),
    queryFn: fetchEngagementChart,
  });
}
