import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "local-agro-ui";

import candidateAvatar from "@/shared/assets/candidate-avatar.svg";
import { dashboardAttendanceRows } from "@/entities/dashboard";
import { mockEmployees } from "@/entities/employee";
import { Icon } from "@/shared/ui/icon";
import { Panel } from "@/shared/ui/panel";

const ROWS_PER_PAGE = 4;

export const AttendanceRegisterTable = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = `${location.pathname}${location.search}`;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({});

  const employeeIdByName = useMemo(() => {
    const map = new Map<string, string>();
    mockEmployees.forEach((employee) => {
      if (!map.has(employee.fullName)) {
        map.set(employee.fullName, employee.id);
      }
    });

    return map;
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return dashboardAttendanceRows;
    }

    return dashboardAttendanceRows.filter((row) => row.fullName.toLowerCase().includes(normalizedSearch));
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleExport = () => {
    const selectedRows = filteredRows.filter((row) => selectedRowIds[row.id]);
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;
    const headers = [
      t("attendanceRegister.table.fullName"),
      t("attendanceRegister.table.position"),
      t("attendanceRegister.table.date"),
      t("attendanceRegister.table.checkIn"),
      t("attendanceRegister.table.checkOut"),
      t("attendanceRegister.table.duration"),
      t("attendanceRegister.table.status"),
    ];
    const csvRows = rowsToExport.map((row) =>
      [row.fullName, row.position, row.date, row.checkIn, row.checkOut, row.duration, row.status]
        .map((cell) => `"${cell}"`)
        .join(","),
    );
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance-register.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Panel className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="w-full max-w-[190px]">
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            leftIcon={<Icon name="search" />}
            placeholder={t("search")}
          />
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl border border-greyscale-300 px-4 py-2 text-sm font-semibold text-greyscale-900 transition hover:bg-greyscale-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 4v10m0 0-4-4m4 4 4-4M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {t("attendanceRegister.actions.export")}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-greyscale-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-greyscale-100 text-greyscale-700">
            <tr>
              <th className="w-10 px-3 py-2" />
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.fullName")}</th>
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.position")}</th>
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.date")}</th>
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.checkIn")}</th>
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.checkOut")}</th>
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.duration")}</th>
              <th className="px-3 py-2 font-medium">{t("attendanceRegister.table.status")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-greyscale-600">
                  {t("attendanceRegister.empty.filtered")}
                </td>
              </tr>
            ) : (
              paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer border-t border-greyscale-200 text-greyscale-900 hover:bg-main-green-50"
                  onClick={() => {
                    const employeeId = employeeIdByName.get(row.fullName);
                    if (employeeId) {
                      navigate(`/employees/${employeeId}`, { state: { from: currentPath } });
                    }
                  }}
                >
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-greyscale-300"
                      aria-label={`${t("attendanceRegister.actions.selectRow")} ${row.fullName}`}
                      onClick={(event) => event.stopPropagation()}
                      checked={Boolean(selectedRowIds[row.id])}
                      onChange={(event) => {
                        const { checked } = event.target;
                        setSelectedRowIds((prev) => {
                          const next = { ...prev };
                          if (checked) {
                            next[row.id] = true;
                          } else {
                            delete next[row.id];
                          }
                          return next;
                        });
                      }}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <img src={candidateAvatar} alt="" aria-hidden className="size-7 rounded-full object-cover" />
                      <span>{row.fullName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{row.position}</td>
                  <td className="max-w-32 truncate px-3 py-2">{row.date}</td>
                  <td className="px-3 py-2">{row.checkIn}</td>
                  <td className="px-3 py-2">{row.checkOut}</td>
                  <td className="px-3 py-2">{row.duration}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1 text-[#2C7A3F]">
                      <span className="size-1.5 rounded-full bg-[#2C7A3F]" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-greyscale-900">
        <span>
          {currentPage} {t("documents.pagination.of")} {totalPages}
        </span>
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-md border border-greyscale-300 px-2 py-1 hover:bg-greyscale-100 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={t("back")}
            disabled={currentPage <= 1}
          >
            {t("back")}
          </button>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-md border border-greyscale-300 px-2 py-1 hover:bg-greyscale-100 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={t("continue")}
            disabled={currentPage >= totalPages}
          >
            {t("continue")}
          </button>
        </div>
      </div>
    </Panel>
  );
};
