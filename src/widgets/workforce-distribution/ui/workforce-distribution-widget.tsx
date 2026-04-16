import { useTranslation } from "react-i18next";

import {
  useWorkforceDistributionQuery,
  WorkforceDistributionSkeleton,
} from "@/features/workforce-distribution";

import { WorkforceDistributionView } from "./workforce-distribution-view";

type WorkforceDistributionWidgetProps = {
  className?: string;
};

export function WorkforceDistributionWidget({ className }: WorkforceDistributionWidgetProps) {
  const { t } = useTranslation("common");
  const { data, status, isError, error, refetch, isFetching } = useWorkforceDistributionQuery();

  if (status === "pending") {
    return <WorkforceDistributionSkeleton className={className} />;
  }

  if (isError) {
    return (
      <div
        className={`w-full rounded-2xl border border-red-200 bg-red-50 p-5 text-left text-sm text-red-800 ${className ?? ""}`}
        role="alert"
      >
        <p className="mb-2 font-medium">{t("workforce.error.loadFailed")}</p>
        <p className="mb-4 text-red-700">{error instanceof Error ? error.message : t("error")}</p>
        <button
          type="button"
          className="rounded-lg bg-red-700 px-3 py-2 text-white hover:bg-red-800 disabled:opacity-50"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? t("retryLoading") : t("retry")}
        </button>
      </div>
    );
  }

  if (data === undefined) {
    return (
      <p
        className={`w-full rounded-2xl bg-greyscale-100 p-5 text-center text-sm text-greyscale-600 ${className ?? ""}`}
      >
        {t("noData")}
      </p>
    );
  }

  return <WorkforceDistributionView data={data} className={className} />;
}
