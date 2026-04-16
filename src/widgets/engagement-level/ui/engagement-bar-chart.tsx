import { useTranslation } from "react-i18next";

const TOTAL_BARS = 60;
const GREEN_MAX_PX = 50;

type EngagementBarChartProps = {
  data: number[];
  currentPercent: number;
  totalBars?: number;
  isLoading?: boolean;
};

function valuesForGreenBars(points: number[], greenCount: number): number[] {
  if (greenCount === 0) return [];
  if (points.length === 0) {
    return Array.from({ length: greenCount }, () => 0);
  }
  if (greenCount === 1) {
    return [points[0] ?? 0];
  }

  const result: number[] = [];
  for (let i = 0; i < greenCount; i++) {
    const t = i / (greenCount - 1);
    const x = t * (points.length - 1);
    const left = Math.floor(x);
    const right = Math.min(left + 1, points.length - 1);
    const between = x - left;
    const leftVal = points[left] ?? 0;
    const rightVal = points[right] ?? 0;
    const value = leftVal * (1 - between) + rightVal * between;
    result.push(value);
  }
  return result;
}

function GrayBar() {
  return (
    <div className="flex h-full min-w-0 flex-1 items-end justify-center">
      <div className="h-6 w-px shrink-0 bg-[#D9D9D9]" />
    </div>
  );
}

type GreenBarProps = {
  heightPx: number;
  withDot: boolean;
};

function GreenBar({ heightPx, withDot }: GreenBarProps) {
  return (
    <div className="flex h-full min-w-0 flex-1 items-end justify-center">
      <div className="flex max-h-[60px] flex-col items-center justify-end">
        {withDot ? <div className="mb-0.5 size-1.5 shrink-0 rounded-full bg-[#00CD69]" aria-hidden /> : null}
        <div
          className="w-0.5 shrink-0 rounded-[1px] bg-[#00CD69]"
          style={{ height: `${heightPx}px` }}
        />
      </div>
    </div>
  );
}

export function EngagementBarChart({
  data,
  currentPercent,
  totalBars = TOTAL_BARS,
  isLoading = false,
}: EngagementBarChartProps) {
  const { t } = useTranslation("common");

  if (isLoading) {
    return (
      <div
        className="h-[60px] w-full animate-pulse rounded-sm bg-greyscale-100"
        role="status"
        aria-label={t("engagement.chart.loadingAria")}
      />
    );
  }

  const greenCount = Math.max(0, Math.min(totalBars, Math.round((currentPercent / 100) * totalBars)));

  const greenValues = valuesForGreenBars(data, greenCount);

  return (
    <div
      className="flex h-[60px] w-full items-end justify-between gap-px"
      role="img"
      aria-label={t("engagement.chart.aria", { percent: currentPercent })}
    >
      {Array.from({ length: totalBars }, (_, index) => {
        const isGreen = index < greenCount;

        if (!isGreen) {
          return <GrayBar key={index} />;
        }

        const raw = greenValues[index] ?? 0;
        const heightPx = Math.min(GREEN_MAX_PX, Math.max(0, (raw / 100) * GREEN_MAX_PX));
        const isLastGreen = index === greenCount - 1;

        return <GreenBar key={index} heightPx={heightPx} withDot={isLastGreen} />;
      })}
    </div>
  );
}
