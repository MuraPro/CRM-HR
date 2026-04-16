import { useQuery } from "@tanstack/react-query";

import { fetchAttendanceOverview } from "../api/fetch-attendance-overview";
import { attendanceOverviewKeys } from "../api/query-keys";

export function useAttendanceOverviewQuery() {
  return useQuery({
    queryKey: attendanceOverviewKeys.detail(),
    queryFn: fetchAttendanceOverview,
  });
}
