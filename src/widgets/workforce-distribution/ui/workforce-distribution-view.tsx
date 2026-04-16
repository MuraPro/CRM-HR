import { useTranslation } from "react-i18next";

import type { WorkforceDistributionData } from "@/entities/workforce-distribution";
import { HeatmapBricksGrid } from "@/entities/workforce-heatmap";

type WorkforceDistributionViewProps = {
  data: WorkforceDistributionData;
  className?: string;
};

function CaretUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-main-green-600" aria-hidden>
      <path d="M12 5l7 10H5l7-10z" fill="currentColor" />
    </svg>
  );
}

export function WorkforceDistributionView({ data, className = "" }: WorkforceDistributionViewProps) {
  const { t } = useTranslation("common");
  const { mainPercent, badgePercent, matrix } = data;

  return (
    <article
      className={`flex h-full w-full flex-col items-center rounded-2xl border border-greyscale-200 bg-white p-5 text-center shadow-sm ${className}`}
    >
      <h2 className="mb-0 w-full text-[24px] font-medium leading-7 text-greyscale-900">{t("workforce.title")}</h2>
      <div className="w-full p-2">
        <hr role="separator" aria-hidden className="border-greyscale-200/80" />
      </div>

      <div className="mb-3 flex w-full flex-row flex-wrap items-end justify-center gap-2">
        <p className="min-w-[52px] text-2xl font-medium leading-6 text-greyscale-900">{mainPercent}</p>
        <span
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-main-green-200 bg-main-green-50 px-1.5 py-0.5 text-xs font-normal leading-[140%] text-main-green-600"
          aria-label={t("workforce.changeAria", { value: badgePercent })}
        >
          <CaretUpIcon />
          <span>{badgePercent}</span>
        </span>
      </div>

      <div className="flex w-full flex-1 items-start justify-center pt-5">
        <HeatmapBricksGrid matrix={matrix} className="w-full max-w-[330px]" />
      </div>
    </article>
  );
}
