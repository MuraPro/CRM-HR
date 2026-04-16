import type { AttendanceOverviewData } from "@/entities/attendance-overview";
import { mockEmployees } from "@/entities/employee";

import { mockApi } from "@/shared/lib/mock-api";

/** Мок API: доли статусов посещаемости; счётчик «Все» масштабируется от числа сотрудников в моке */
export async function fetchAttendanceOverview(): Promise<AttendanceOverviewData> {
  const factor = 41;
  const totalCount = Math.max(12, mockEmployees.length * factor);

  return mockApi(
    {
      title: "Обзор посещаемости",
      totalCaption: "Все",
      totalCount,
      legend: [
        { label: "Присутствие", value: 59, valueSuffix: "%", dotColorClass: "bg-[#08c55f]" },
        { label: "Опоздание", value: 21, valueSuffix: "%", dotColorClass: "bg-[#0e637c]" },
        { label: "По уважительной", value: 2, valueSuffix: "%", dotColorClass: "bg-[#f0c006]" },
        { label: "Отсутствие", value: 15, valueSuffix: "%", dotColorClass: "bg-[#ec0a0f]" },
      ],
      chart: [
        { label: "present", value: 59, fill: "#4f5fd6" },
        { label: "late", value: 21, fill: "#f0bb62" },
        { label: "permission", value: 2, fill: "#f0c006" },
        { label: "absent", value: 15, fill: "#e24a56" },
      ],
    },
    340,
  );
}
