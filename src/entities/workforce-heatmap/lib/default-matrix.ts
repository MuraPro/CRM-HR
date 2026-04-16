import type { HeatmapLevel } from "../model/types";

/** Колонки: ПН … ПТ. Значения 1–4 — относительная «загрузка» слота */
export const DEFAULT_HEATMAP_MATRIX: HeatmapLevel[][] = [
  [1, 1, 1, 1, 1],
  [2, 2, 1, 2, 2],
  [3, 2, 1, 2, 3],
  [3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4],
];
