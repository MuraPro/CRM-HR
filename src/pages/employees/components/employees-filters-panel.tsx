import { Select, type SelectOptionType } from "local-agro-ui";

import type { FiltersState } from "../model/types";

interface EmployeesFiltersPanelProps {
  filters: FiltersState;
  regionOptions: SelectOptionType<string>[];
  filialOptions: SelectOptionType<string>[];
  complexOptions: SelectOptionType<string>[];
  departmentOptions: SelectOptionType<string>[];
  divisionOptions: SelectOptionType<string>[];
  teamOptions: SelectOptionType<string>[];
  isFilialDisabled: boolean;
  isComplexDisabled: boolean;
  isDepartmentDisabled: boolean;
  isDivisionDisabled: boolean;
  isTeamDisabled: boolean;
  isLoading: boolean;
  onRegionChange: (value: string | null) => void;
  onFilialChange: (value: string | null) => void;
  onComplexChange: (value: string | null) => void;
  onDepartmentChange: (value: string | null) => void;
  onDivisionChange: (value: string | null) => void;
  onTeamChange: (value: string | null) => void;
}

const resolveOption = (options: SelectOptionType<string>[], value: string | null) =>
  options.find((option) => option.value === value) ?? null;

const getSelectContainerClassName = (isDisabled: boolean) =>
  isDisabled
    ? "rounded-xl border border-greyscale-300 bg-greyscale-100 p-1 opacity-70 cursor-not-allowed"
    : "rounded-xl border border-transparent";

export const EmployeesFiltersPanel = ({
  filters,
  regionOptions,
  filialOptions,
  complexOptions,
  departmentOptions,
  divisionOptions,
  teamOptions,
  isFilialDisabled,
  isComplexDisabled,
  isDepartmentDisabled,
  isDivisionDisabled,
  isTeamDisabled,
  isLoading,
  onRegionChange,
  onFilialChange,
  onComplexChange,
  onDepartmentChange,
  onDivisionChange,
  onTeamChange,
}: EmployeesFiltersPanelProps) => {
  return (
    <aside className="rounded-2xl border border-greyscale-200 bg-[#FCFCFE] p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-greyscale-200 pb-3">
        <span className="inline-flex size-5 items-center justify-center rounded-md border border-greyscale-300 bg-white text-[10px] font-semibold text-greyscale-600">
          F
        </span>
        <p className="text-sm font-semibold text-greyscale-800">Фильтры</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-medium text-greyscale-600">1. Регион</p>
          <div className={getSelectContainerClassName(isLoading)}>
            <Select
              placeholder="Выберите регион"
              options={regionOptions}
              value={resolveOption(regionOptions, filters.regionId)}
              onChange={(option) => onRegionChange(option?.value ?? null)}
              disabled={isLoading}
              isSearchable={false}
            />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium text-greyscale-600">2. Филиал</p>
          <div className={getSelectContainerClassName(isFilialDisabled)}>
            <Select
              placeholder="Выберите филиал"
              options={filialOptions}
              value={resolveOption(filialOptions, filters.filialId)}
              onChange={(option) => onFilialChange(option?.value ?? null)}
              disabled={isFilialDisabled}
              isSearchable={false}
            />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium text-greyscale-600">3. Комплекс</p>
          <div className={getSelectContainerClassName(isComplexDisabled)}>
            <Select
              placeholder="Выберите комплекс"
              options={complexOptions}
              value={resolveOption(complexOptions, filters.complexId)}
              onChange={(option) => onComplexChange(option?.value ?? null)}
              disabled={isComplexDisabled}
              isSearchable={false}
            />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium text-greyscale-600">4. Департамент</p>
          <div className={getSelectContainerClassName(isDepartmentDisabled)}>
            <Select
              placeholder="Выберите департамент"
              options={departmentOptions}
              value={resolveOption(departmentOptions, filters.departmentId)}
              onChange={(option) => onDepartmentChange(option?.value ?? null)}
              disabled={isDepartmentDisabled}
              isSearchable={false}
            />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium text-greyscale-600">5. Подразделение</p>
          <div className={getSelectContainerClassName(isDivisionDisabled)}>
            <Select
              placeholder="Выберите подразделение"
              options={divisionOptions}
              value={resolveOption(divisionOptions, filters.divisionId)}
              onChange={(option) => onDivisionChange(option?.value ?? null)}
              disabled={isDivisionDisabled}
              isSearchable={false}
            />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium text-greyscale-600">6. Отдел</p>
          <div className={getSelectContainerClassName(isTeamDisabled)}>
            <Select
              placeholder="Выберите отдел"
              options={teamOptions}
              value={resolveOption(teamOptions, filters.teamId)}
              onChange={(option) => onTeamChange(option?.value ?? null)}
              disabled={isTeamDisabled}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
