import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Input, Select, type SelectOptionType } from "local-agro-ui";

import { Icon } from "@/shared/ui/icon";
import { Panel } from "@/shared/ui/panel";

type AttendanceStatus = "В офисе" | "Удаленно" | "Опоздание" | "Отсутствует";
type AttendanceDepartmentKey =
  | "attendancePage.department.credit"
  | "attendancePage.department.sales"
  | "attendancePage.department.operations"
  | "attendancePage.department.hr"
  | "attendancePage.department.legal"
  | "attendancePage.department.accounting"
  | "attendancePage.department.it"
  | "attendancePage.department.marketing";

interface AttendanceRecord {
  id: string;
  fullName: string;
  departmentKey: AttendanceDepartmentKey;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

const attendanceRecords: AttendanceRecord[] = [
  { id: "1", fullName: "Дилшод Турсунов", departmentKey: "attendancePage.department.credit", checkIn: "08:45", checkOut: "17:30", status: "В офисе" },
  { id: "2", fullName: "Зарина Исматова", departmentKey: "attendancePage.department.sales", checkIn: "09:00", checkOut: "17:30", status: "Удаленно" },
  { id: "3", fullName: "Фарход Мухамедов", departmentKey: "attendancePage.department.operations", checkIn: "09:20", checkOut: "17:30", status: "Опоздание" },
  { id: "4", fullName: "Дилором Исматова", departmentKey: "attendancePage.department.hr", checkIn: "08:55", checkOut: "17:30", status: "В офисе" },
  { id: "5", fullName: "Азиза Каримова", departmentKey: "attendancePage.department.legal", checkIn: "09:00", checkOut: "17:30", status: "Удаленно" },
  { id: "6", fullName: "Шерзод Рахимов", departmentKey: "attendancePage.department.credit", checkIn: "-", checkOut: "-", status: "Отсутствует" },
  { id: "7", fullName: "Мадина Норова", departmentKey: "attendancePage.department.accounting", checkIn: "08:50", checkOut: "17:30", status: "В офисе" },
  { id: "8", fullName: "Отабек Султанов", departmentKey: "attendancePage.department.it", checkIn: "09:10", checkOut: "17:30", status: "Опоздание" },
  { id: "9", fullName: "Нилуфар Ахмедова", departmentKey: "attendancePage.department.marketing", checkIn: "09:00", checkOut: "17:30", status: "Удаленно" },
  { id: "10", fullName: "Рустам Жураев", departmentKey: "attendancePage.department.operations", checkIn: "08:40", checkOut: "17:30", status: "В офисе" },
];

const chartData = [
  { day: "ПН", present: 44 },
  { day: "ВТ", present: 39 },
  { day: "СР", present: 46 },
  { day: "ЧТ", present: 41 },
  { day: "ПТ", present: 43 },
];

const statusColorClass: Record<AttendanceStatus, string> = {
  "В офисе": "bg-[#E8F6ED] text-[#2E7D4D]",
  "Удаленно": "bg-[#EAF1FF] text-[#2F74A9]",
  "Опоздание": "bg-[#FFF3E6] text-[#C77A16]",
  "Отсутствует": "bg-[#FDEBEC] text-[#C63D50]",
};

export const AttendancePage = () => {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | "ALL">("ALL");

  const statusOptions: SelectOptionType<AttendanceStatus | "ALL">[] = [
    { value: "ALL", label: t("attendancePage.filters.all") },
    { value: "В офисе", label: t("attendancePage.status.office") },
    { value: "Удаленно", label: t("attendancePage.status.remote") },
    { value: "Опоздание", label: t("attendancePage.status.late") },
    { value: "Отсутствует", label: t("attendancePage.status.absent") },
  ];

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return attendanceRecords.filter((record) => {
      const matchesSearch = normalizedSearch ? record.fullName.toLowerCase().includes(normalizedSearch) : true;
      const matchesStatus = statusFilter === "ALL" ? true : record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-4">
      <Panel className="space-y-4">
        <h2 className="text-xl font-semibold text-greyscale-900">{t("attendancePage.chartTitle")}</h2>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E4EA" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#3B4BDC" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-full max-w-[320px]">
            <Input
              leftIcon={<Icon name="search" />}
              placeholder={t("attendancePage.filters.searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="w-full max-w-[260px]">
            <Select
              colorType="Blue"
              options={statusOptions}
              value={statusOptions.find((option) => option.value === statusFilter)}
              onChange={(option) => setStatusFilter((option?.value as AttendanceStatus | "ALL") ?? "ALL")}
              placeholder={t("attendancePage.filters.statusPlaceholder")}
            />
          </div>
        </div>

        {filteredRows.length === 0 ? (
          <p className="text-sm text-greyscale-600">{t("attendancePage.empty")}</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-greyscale-300">
            <table className="w-full text-left text-sm">
              <thead className="bg-greyscale-100">
                <tr>
                  <th className="px-3 py-2">{t("attendancePage.table.fullName")}</th>
                  <th className="px-3 py-2">{t("attendancePage.table.department")}</th>
                  <th className="px-3 py-2">{t("attendancePage.table.checkIn")}</th>
                  <th className="px-3 py-2">{t("attendancePage.table.checkOut")}</th>
                  <th className="px-3 py-2">{t("attendancePage.table.status")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-t border-greyscale-300">
                    <td className="px-3 py-2 text-greyscale-900">{row.fullName}</td>
                    <td className="px-3 py-2 text-greyscale-700">{t(row.departmentKey)}</td>
                    <td className="px-3 py-2 text-greyscale-700">{row.checkIn}</td>
                    <td className="px-3 py-2 text-greyscale-700">{row.checkOut}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${statusColorClass[row.status]}`}>
                        {row.status === "В офисе"
                          ? t("attendancePage.status.office")
                          : row.status === "Удаленно"
                            ? t("attendancePage.status.remote")
                            : row.status === "Опоздание"
                              ? t("attendancePage.status.late")
                              : t("attendancePage.status.absent")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
};
