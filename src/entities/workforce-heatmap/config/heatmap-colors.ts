import type { HeatmapLevel } from "../model/types";

/** Уровни: 1 — насыщенный, 4 — самый светлый; соответствует плотности присутствия в сетке */
export const HEATMAP_LEVEL_BG_CLASS: Record<HeatmapLevel, string> = {
  1: "bg-[var(--Blue-500-Base,#3B4BDC)]",
  2: "bg-[var(--Blue-400,#5260E0)]",
  3: "bg-[var(--Blue-200,#A8B0F0)]",
  4: "bg-[var(--Blue-100,#D4D7F7)]",
};
