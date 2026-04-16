import { useTranslation } from "react-i18next";

import { dashboardMetrics } from "@/entities/dashboard";
import { AttendanceOverviewWidget } from "@/widgets/attendance-overview";
import { EngagementLevelWidget } from "@/widgets/engagement-level";
import { AttendanceRegisterTable } from "@/widgets/attendance-register-table";
import { WorkforceDistributionWidget } from "@/widgets/workforce-distribution";

import { Panel } from "@/shared/ui/panel";

export const DashboardPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Panel
            key={metric.id}
            className="rounded-[28px] border-greyscale-200 bg-[#ECEDEF] px-6 py-5 shadow-none"
          >
            <p className="text-[20px] font-semibold leading-tight text-[#283044]">
              {t(`dashboard.metrics.${metric.id}`)}
            </p>
            <div className="mt-5 flex items-end justify-between gap-2">
              <p className="text-[30px] leading-none font-medium text-[#283044]">{metric.value}</p>
              <span className="inline-flex items-center gap-1 rounded-xl border border-[#A8CAE8] bg-[#D9EAF7] px-3 py-2 font-semibold text-[#2F74A9]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 16l5-5 3 3 6-6m0 0h-4m4 0v4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[22px] leading-none">{metric.delta.replace("+", "")}</span>
              </span>
            </div>
          </Panel>
        ))}
      </section>

      <section className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-[518px]">
          <WorkforceDistributionWidget className="h-full" />
        </div>
        <div className="h-[518px]">
          <AttendanceOverviewWidget className="h-full" />
        </div>
        <div className="h-[518px]">
          <EngagementLevelWidget className="h-full" />
        </div>
      </section>

      <section>
        <AttendanceRegisterTable />
      </section>
    </div>
  );
};
