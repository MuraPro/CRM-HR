import type { HeatmapLevel } from "@/entities/workforce-heatmap";

export type WorkforceMonthlyPoint = {
  month: string;
  value: number;
};

/** Ответ API виджета «Распределение рабочей силы» */
export type WorkforceDistributionData = {
  title: string;
  /** Текущий агрегированный показатель (например доля явки) */
  mainPercent: string;
  /** Динамика периода для бейджа */
  badgePercent: string;
  matrix: HeatmapLevel[][];
  monthlySeries: WorkforceMonthlyPoint[];
};
