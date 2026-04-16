import { mockEmployees } from "@/entities/employee";

import { mockApi } from "@/shared/lib/mock-api";

export type EngagementChartPayload = {
  series: number[];
  engagementPercent: number;
};

function hashSeed(ids: string[]) {
  return ids.reduce((acc, id) => acc + id.charCodeAt(0), 0);
}

/** Мок API: вовлечённость; процент и «волна» завязаны на mockEmployees */
export async function fetchEngagementChart(): Promise<EngagementChartPayload> {
  const headcount = mockEmployees.length || 1;
  const active = mockEmployees.filter((e) => e.status === "Активный").length;
  const base = Math.min(95, Math.max(62, Math.round(68 + (active / headcount) * 22)));
  const seed = hashSeed(mockEmployees.map((e) => e.id));
  const series = [45, 72, 38, 91, 55, 88, 62].map((v, i) =>
    Math.min(100, Math.max(12, v + ((seed + i * 7) % 13) - 6)),
  );

  return mockApi({ series, engagementPercent: base }, 360);
}
