import type { WorkforceDistributionData } from "@/entities/workforce-distribution";
import { DEFAULT_HEATMAP_MATRIX } from "@/entities/workforce-heatmap";
import { mockEmployees } from "@/entities/employee";

import { mockApi } from "@/shared/lib/mock-api";

function buildMonthlySeries(mainValue: number) {
  const drift = [-8, -4, 2, 6, 4, 0];
  const labels = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];
  return labels.map((month, i) => ({
    month,
    value: Math.min(100, Math.max(0, Math.round(mainValue + (drift[i] ?? 0)))),
  }));
}

/** Мок API: распределение силы + теплокарта; показатель завязан на доле активных в mockEmployees */
export async function fetchWorkforceDistribution(): Promise<WorkforceDistributionData> {
  const headcount = mockEmployees.length || 1;
  const active = mockEmployees.filter((e) => e.status === "Активный").length;
  const ratioPct = Math.round((active / headcount) * 100);
  const mainValue = Math.min(97, Math.max(55, Math.round(58 + ratioPct * 0.35)));

  return mockApi(
    {
      title: "Распределение рабочей силы",
      mainPercent: `${mainValue}%`,
      badgePercent: "+20%",
      matrix: DEFAULT_HEATMAP_MATRIX.map((row) => [...row]),
      monthlySeries: buildMonthlySeries(mainValue),
    },
    380,
  );
}
