import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

import type { AttendanceOverviewData } from "@/entities/attendance-overview";

type AttendanceOverviewCardProps = {
  data: AttendanceOverviewData;
  className?: string;
};

export function AttendanceOverviewCard({ data, className = "" }: AttendanceOverviewCardProps) {
  const { t } = useTranslation("common");
  const { totalCount, legend, chart } = data;
  const titleId = useId();
  const legendLabelMap: Record<string, string> = {
    "Присутствие": t("attendance.legend.present"),
    "Опоздание": t("attendance.legend.late"),
    "По уважительной": t("attendance.legend.excused"),
    "Отсутствие": t("attendance.legend.absent"),
  };

  return (
    <section
      className={`flex h-full w-full flex-col items-center rounded-[28px] border border-greyscale-200 bg-white p-5 text-center ${className}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="w-full text-[24px] font-medium leading-7 text-greyscale-900">
        {t("attendance.title")}
      </h2>
      <div className="w-full p-2">
        <hr className="border-greyscale-200/80" />
      </div>

      <div className="w-full max-w-[330px] px-5">
        <div className="relative h-[208px]" role="img" aria-label={t("attendance.chartAria")}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chart}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="100%"
                innerRadius={95}
                outerRadius={140}
                startAngle={180}
                endAngle={0}
                cornerRadius={7}
                paddingAngle={2}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="-mt-0.5 flex flex-col items-center gap-1.5 pb-1" aria-label={t("attendance.totalCaption")}>
          <span className="text-sm font-normal text-greyscale-600">{t("attendance.totalCaption")}</span>
          <strong className="text-[40px] font-medium leading-none text-greyscale-900">{totalCount}</strong>
        </div>
      </div>

      <h3 className="px-6 pt-1 pb-2 text-sm font-medium text-greyscale-900">{t("attendance.statusesTitle")}</h3>

      <ul
        className="m-0 flex w-full max-w-[330px] list-none flex-col gap-2 px-6 pb-5 text-left"
        aria-label={t("attendance.statusesAria")}
      >
        {legend.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5">
            <span className={`size-2.5 shrink-0 rounded-full ${item.dotColorClass}`} aria-hidden />
            <span className="flex-1 text-sm font-normal text-greyscale-600">{legendLabelMap[item.label] ?? item.label}</span>
            <strong className="min-w-11 text-right text-xs font-medium text-greyscale-900">
              {item.value}
              {item.valueSuffix ?? ""}
            </strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
