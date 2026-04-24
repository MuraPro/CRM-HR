import { Table, Tag, type ColumnDef } from "local-agro-ui";
import { useMemo, useState } from "react";

import type { EmployeeRecord } from "../model/types";

interface EmployeesTableProps {
  rows: EmployeeRecord[];
  totalCount: number;
  page: number;
  perPage: number;
  setPage: (nextPage: number) => void;
}

const statusColor: Record<EmployeeRecord["status"], "Green" | "Blue" | "Red"> = {
  "Активный": "Green",
  "В отпуске": "Blue",
  "Уволен": "Red",
};

type StatusTab = "all" | "active" | "inactive";

export const EmployeesTable = ({ rows, totalCount, page, perPage, setPage }: EmployeesTableProps) => {
  const [statusTab, setStatusTab] = useState<StatusTab>("all");

  const columns = useMemo<ColumnDef<EmployeeRecord>[]>(
    () => [
      { accessorKey: "fullName", header: "ФИО" },
      { accessorKey: "position", header: "Должность" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Телефон" },
      {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }) => <Tag colorType={statusColor[row.original.status]}>{row.original.status}</Tag>,
      },
    ],
    [],
  );

  const filteredRows = useMemo(() => {
    if (statusTab === "active") {
      return rows.filter((employee) => employee.status === "Активный");
    }

    if (statusTab === "inactive") {
      return rows.filter((employee) => employee.status !== "Активный");
    }

    return rows;
  }, [rows, statusTab]);

  const tabs: Array<{ id: StatusTab; label: string }> = [
    { id: "all", label: "Все" },
    { id: "active", label: "Активные" },
    { id: "inactive", label: "Не активные" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-greyscale-200 bg-white p-5">
      <div className="mb-4 flex gap-2">
        {tabs.map((tab) => {
          const isActive = statusTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setStatusTab(tab.id);
                setPage(1);
              }}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "border-[#3B4BDC] bg-[#3B4BDC] text-white"
                  : "border-greyscale-300 bg-white text-greyscale-700 hover:border-[#3B4BDC] hover:text-[#3B4BDC]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <Table
        columns={columns}
        data={filteredRows}
        isPagination
        colorType="Blue"
        page={page}
        perPage={perPage}
        totalCount={statusTab === "all" ? totalCount : filteredRows.length}
        setPage={(value) => setPage(typeof value === "function" ? value(page) : value)}
        setPerPage={() => undefined}
        isHeadFilled
        isHeadRounded
        textSize="sm"
      />
    </div>
  );
};
