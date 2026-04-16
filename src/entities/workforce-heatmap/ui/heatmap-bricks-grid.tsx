import { useTranslation } from "react-i18next";

import { HEATMAP_LEVEL_BG_CLASS } from "../config/heatmap-colors";
import type { HeatmapLevel } from "../model/types";

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri"] as const;
const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00"] as const;
const ROWS = 5;
const COLS = 5;

const TIME_COL =
  "flex min-w-[32px] shrink-0 items-center justify-end text-xs font-normal leading-[140%] text-greyscale-600";

const BRICK_BASE = "min-h-6 min-w-0 flex-1 basis-0 self-stretch rounded";

function normalizeLevel(value: unknown): HeatmapLevel {
  if (value === 1 || value === 2 || value === 3 || value === 4) {
    return value;
  }
  return 1;
}

type HeatmapBricksGridProps = {
  matrix: readonly (readonly HeatmapLevel[])[];
  className?: string;
};

export function HeatmapBricksGrid({ matrix, className = "" }: HeatmapBricksGridProps) {
  const { t } = useTranslation("common");

  return (
    <div className={className} role="img" aria-label={t("workforce.heatmapAria")}>
      <div className="flex w-full flex-col gap-[5px]">
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={`row-${row}`} className="flex w-full items-stretch gap-x-[25px]">
            <div className={TIME_COL}>{TIMES[row]}</div>
            <div className="flex min-w-0 flex-1 gap-[5px]">
              {Array.from({ length: COLS }, (_, col) => {
                const raw = matrix[row]?.[col];
                if (raw === undefined) return null;
                const level = normalizeLevel(raw);
                return (
                  <div
                    key={`cell-${row}-${col}`}
                    className={`${BRICK_BASE} ${HEATMAP_LEVEL_BG_CLASS[level]}`}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex w-full items-start gap-x-[25px] pt-0">
          <div className={`${TIME_COL} min-h-0`} aria-hidden />
          <div className="flex min-w-0 flex-1 gap-[5px]">
            {DAY_KEYS.map((dayKey) => (
              <div
                key={dayKey}
                className="min-w-0 flex-1 basis-0 text-center text-xs font-normal leading-[140%] text-greyscale-600"
              >
                {t(`workforce.days.${dayKey}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
