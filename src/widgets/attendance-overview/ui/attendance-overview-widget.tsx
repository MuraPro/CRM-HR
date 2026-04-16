import { useTranslation } from "react-i18next";

import { useAttendanceOverviewQuery } from "@/features/attendance-overview";

import { AttendanceOverviewCard } from "./attendance-overview-card";

type AttendanceOverviewWidgetProps = {
  className?: string;
};

export function AttendanceOverviewWidget({ className = "" }: AttendanceOverviewWidgetProps) {
  const query = useAttendanceOverviewQuery();
  const { t } = useTranslation("common");

  if (query.isPending) {
    return (
      <div
        className={`w-full animate-pulse rounded-[28px] border border-greyscale-200 bg-greyscale-100 p-8 ${className}`}
        aria-busy
        aria-label={t("attendance.loadingAria")}
      >
        <div className="mb-6 h-5 w-2/3 rounded bg-greyscale-200" />
        <div className="mx-auto mb-4 h-48 max-w-xs rounded-full bg-greyscale-200" />
        <div className="mx-auto mb-8 h-10 w-24 rounded bg-greyscale-200" />
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-4 w-full rounded bg-greyscale-200" />
          ))}
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div
        className={`w-full rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 ${className}`}
        role="alert"
      >
        <p className="mb-2 font-medium">{t("attendance.error.loadFailed")}</p>
        <button
          type="button"
          className="rounded-lg bg-red-700 px-3 py-2 text-white hover:bg-red-800 disabled:opacity-50"
          onClick={() => query.refetch()}
          disabled={query.isFetching}
        >
          {query.isFetching ? t("retryLoading") : t("retry")}
        </button>
      </div>
    );
  }

  if (!query.data) {
    return (
      <p className={`rounded-2xl bg-greyscale-100 p-5 text-center text-sm text-greyscale-600 ${className}`}>
        {t("noData")}
      </p>
    );
  }

  return <AttendanceOverviewCard data={query.data} className={className} />;
}
