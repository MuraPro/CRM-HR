import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Input, Select, Table, type ColumnDef, type SelectOptionType, Tag } from "local-agro-ui";

import { useEmployees, type Employee } from "@/entities/employee";
import { Icon } from "@/shared/ui/icon";
import { PageHeader } from "@/widgets/page-header";
import { Panel } from "@/shared/ui/panel";

import { useEmployeeFilters } from "../model/use-employee-filters";

type StatusFilter = "ALL" | "Активный" | "Уволен" | "В отпуске";

const statusLabelKeyByValue: Record<Exclude<StatusFilter, "ALL">, string> = {
  "Активный": "status.active",
  "Уволен": "status.dismissed",
  "В отпуске": "status.vacation",
};

const statusColorByValue: Record<Exclude<StatusFilter, "ALL">, "Green" | "Blue" | "Red"> = {
  "Активный": "Green",
  "В отпуске": "Blue",
  "Уволен": "Red",
};

export const EmployeesPage = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useEmployees();
  const [page, setPage] = useState(1);
  const perPage = 10;
  const employees = data ?? [];
  const activeBranchId = useMemo(() => new URLSearchParams(location.search).get("branchId") ?? "", [location.search]);
  const employeesInBranch = useMemo(
    () => (activeBranchId ? employees.filter((employee) => employee.branchId === activeBranchId) : employees),
    [activeBranchId, employees],
  );
  const { filteredEmployees, search, setSearch, setStatus, status } = useEmployeeFilters(employeesInBranch);
  const statusOptions: SelectOptionType<StatusFilter>[] = [
    { label: t("employees.filters.status.all"), value: "ALL" },
    { label: t("status.active"), value: "Активный" },
    { label: t("status.dismissed"), value: "Уволен" },
    { label: t("status.vacation"), value: "В отпуске" },
  ];
  const selectedStatusOption = statusOptions.find((option) => option.value === status);

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: t("employees.table.fullName"),
      },
      {
        accessorKey: "position",
        header: t("employees.table.position"),
      },
      {
        accessorKey: "email",
        header: t("employees.table.email"),
      },
      {
        accessorKey: "phone",
        header: t("employees.table.phone"),
      },
      {
        accessorKey: "status",
        header: t("employees.table.status"),
        cell: ({ row }) => (
          <Tag colorType={statusColorByValue[row.original.status]}>{t(statusLabelKeyByValue[row.original.status])}</Tag>
        ),
      },
    ],
    [t],
  );

  const totalCount = filteredEmployees.length;
  const pageCount = perPage > 0 ? Math.ceil(totalCount / perPage) : 0;
  const safePage = pageCount === 0 ? 1 : Math.min(Math.max(page, 1), pageCount);
  const handleSetPerPage: Dispatch<SetStateAction<number>> = () => undefined;
  const paginatedEmployees = useMemo(() => {
    if (totalCount === 0) {
      return [];
    }

    const startIndex = (safePage - 1) * perPage;
    return filteredEmployees.slice(startIndex, startIndex + perPage);
  }, [filteredEmployees, perPage, safePage, totalCount]);
  const currentPath = `${location.pathname}${location.search}`;

  if (isLoading) return <p className="p-4">{t("employees.loading")}</p>;
  if (isError) return <p className="p-4 text-error-500">{t("employees.error.loadFailed")}</p>;

  return (
    <div className="space-y-4">
      <PageHeader subtitle={t("employees.subtitle")} title={t("employees.title")} />
      <Panel>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <Input
            leftIcon={<Icon name="search" />}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder={t("employees.filters.searchPlaceholder")}
            value={search}
          />
          <Select
            colorType="Blue"
            isSearchable={false}
            noOptionsMessage={t("employees.filters.status.noOptions")}
            onChange={(option) => {
              setStatus(option?.value ?? "ALL");
              setPage(1);
            }}
            options={statusOptions}
            placeholder={t("employees.filters.status.placeholder")}
            value={selectedStatusOption}
          />
        </div>

        {filteredEmployees.length === 0 ? (
          <p className="text-sm text-greyscale-600">{t("employees.empty.filtered")}</p>
        ) : (
          <div className="employees-table-wrapper overflow-hidden rounded-xl border border-greyscale-300">
            <Table
              data={paginatedEmployees}
              columns={columns}
              isPagination
              page={safePage}
              totalCount={totalCount}
              perPage={perPage}
              setPage={setPage}
              setPerPage={handleSetPerPage}
              isHeadFilled
              isHeadRounded
              textSize="sm"
              colorType="Gray"
              onRowClick={(employee) => navigate(`/employees/${employee.id}`, { state: { from: currentPath } })}
            />
          </div>
        )}
      </Panel>
    </div>
  );
};

