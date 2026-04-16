import { useTranslation } from "react-i18next";

import { useEngagementChartQuery } from "@/features/engagement-chart";

import { EngagementCard } from "./engagement-card";

type EngagementLevelWidgetProps = {
  className?: string;
};

export function EngagementLevelWidget({ className = "" }: EngagementLevelWidgetProps) {
  const chartQuery = useEngagementChartQuery();
  const { t } = useTranslation("common");

  return (
    <EngagementCard
      className={className}
      title={t("engagement.title")}
      description={t("engagement.description")}
      chartData={chartQuery.data?.series ?? []}
      chartLoading={chartQuery.isPending}
      chartError={chartQuery.isError}
      totalPercent={chartQuery.data?.engagementPercent ?? 0}
      errorMessage={t("engagement.error.loadFailed")}
      statusPrimary={t("engagement.status.primary")}
    />
  );
}
