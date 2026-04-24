import { PageHeader } from "@/widgets/page-header";
import { useMemo } from "react";

import { EmployeesFiltersPanel } from "../components/employees-filters-panel";
import { EmployeesPageSkeleton } from "../components/employees-page-skeleton";
import { EmployeesTable } from "../components/employees-table";
import {
  useComplexesQuery,
  useDepartmentsQuery,
  useDivisionsQuery,
  useEmployeesByFiltersQuery,
  useFilialsQuery,
  useRegionsQuery,
  useTeamsQuery,
} from "../hooks/use-employees-hierarchy-queries";
import { useEmployeesFilters } from "../hooks/use-employees-filters";

export const EmployeesPage = () => {
  const {
    filters,
    setComplex,
    setDepartment,
    setDivision,
    setFilial,
    setPage,
    setRegion,
    setTeam,
  } = useEmployeesFilters();
  const isHeadOffice = filters.regionId === "head-office";
  const isNonHeadRegionSelected = Boolean(filters.regionId) && !isHeadOffice;

  const regionsQuery = useRegionsQuery();
  const filialsQuery = useFilialsQuery(filters.regionId, Boolean(filters.regionId) && !isHeadOffice);
  const complexesQuery = useComplexesQuery({
    regionId: filters.regionId,
    filialId: filters.filialId,
    enabled: Boolean(filters.regionId) && (isHeadOffice || Boolean(filters.filialId)),
  });
  const departmentsQuery = useDepartmentsQuery({
    regionId: filters.regionId,
    filialId: filters.filialId,
    complexId: filters.complexId,
    enabled: Boolean(filters.complexId),
  });
  const divisionsQuery = useDivisionsQuery({
    regionId: filters.regionId,
    filialId: filters.filialId,
    complexId: filters.complexId,
    departmentId: filters.departmentId,
    enabled: Boolean(filters.departmentId) && isHeadOffice,
  });
  const teamsQuery = useTeamsQuery({
    regionId: filters.regionId,
    filialId: filters.filialId,
    complexId: filters.complexId,
    departmentId: filters.departmentId,
    divisionId: filters.divisionId,
    enabled: Boolean(filters.departmentId),
  });

  const queryFilters = useMemo(
    () => ({
      ...filters,
    }),
    [filters],
  );
  const employeesQuery = useEmployeesByFiltersQuery(queryFilters);

  const isPageLoading = regionsQuery.isLoading;
  const rows = employeesQuery.data?.rows ?? [];
  const totalCount = employeesQuery.data?.total ?? 0;
  const shouldShowEmptyState = !employeesQuery.isLoading && rows.length === 0;

  if (isPageLoading) {
    return (
      <div className="space-y-4">
        <PageHeader title="Сотрудники" subtitle="Иерархическая структура и штатное расписание" />
        <EmployeesPageSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader title="Сотрудники" subtitle="Иерархическая структура и штатное расписание" />
      <div className="grid grid-cols-[320px_1fr] gap-4">
        <EmployeesFiltersPanel
          filters={filters}
          regionOptions={regionsQuery.data ?? []}
          filialOptions={filialsQuery.data ?? []}
          complexOptions={complexesQuery.data ?? []}
          departmentOptions={departmentsQuery.data ?? []}
          divisionOptions={divisionsQuery.data ?? []}
          teamOptions={teamsQuery.data ?? []}
          isLoading={regionsQuery.isLoading}
          isFilialDisabled={!filters.regionId || isHeadOffice}
          isComplexDisabled={!filters.regionId || (!isHeadOffice && !filters.filialId)}
          isDepartmentDisabled={!filters.complexId}
          isDivisionDisabled={isNonHeadRegionSelected || !filters.departmentId}
          isTeamDisabled={isHeadOffice ? !filters.divisionId : !filters.departmentId}
          onRegionChange={setRegion}
          onFilialChange={setFilial}
          onComplexChange={setComplex}
          onDepartmentChange={setDepartment}
          onDivisionChange={setDivision}
          onTeamChange={setTeam}
        />

        <div>
          {employeesQuery.isLoading ? (
            <div className="animate-pulse rounded-2xl border border-greyscale-200 bg-white p-4">
              {Array.from({ length: 9 }, (_, index) => (
                <div key={index} className="mb-3 h-10 rounded bg-greyscale-200" />
              ))}
            </div>
          ) : null}

          {shouldShowEmptyState ? (
            <div className="rounded-2xl border border-greyscale-200 bg-white p-6 text-sm text-greyscale-600">
              Выберите фильтры для отображения сотрудников.
            </div>
          ) : (
            <EmployeesTable
              rows={rows}
              totalCount={totalCount}
              page={filters.page}
              perPage={filters.perPage}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
