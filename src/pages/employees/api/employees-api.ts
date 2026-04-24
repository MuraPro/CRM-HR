import { mockApi } from "@/shared/lib/mock-api";

import { employeesHierarchyMock } from "./mock-employees-hierarchy";
import type {
  ComplexNode,
  DepartmentNode,
  DivisionNode,
  EmployeeRecord,
  EmployeesQueryResult,
  FilialNode,
  FiltersState,
  RegionNode,
  TeamNode,
} from "../model/types";

export interface SelectOption {
  label: string;
  value: string;
}

const employeesKeys = {
  headOfficeRegion: "head-office",
};

const flattenDivisionEmployees = (division: DivisionNode): EmployeeRecord[] => [
  ...division.employees,
  ...division.teams.flatMap((team) => team.employees),
];

const flattenDepartmentEmployees = (department: DepartmentNode): EmployeeRecord[] => [
  ...department.employees,
  ...department.divisions.flatMap(flattenDivisionEmployees),
];

const flattenComplexEmployees = (complex: ComplexNode): EmployeeRecord[] => [
  complex.deputy,
  ...complex.staff,
  ...complex.departments.flatMap(flattenDepartmentEmployees),
];

const findRegion = (regionId: string | null): RegionNode | null =>
  employeesHierarchyMock.regions.find((region) => region.id === regionId) ?? null;

const findFilial = (region: RegionNode | null, filialId: string | null): FilialNode | null =>
  region?.filials.find((filial) => filial.id === filialId) ?? null;

const findComplex = (region: RegionNode | null, filial: FilialNode | null, complexId: string | null): ComplexNode | null => {
  if (!complexId) return null;
  if (region?.isHeadOffice) {
    return region.complexes.find((complex) => complex.id === complexId) ?? null;
  }

  return filial?.complexes.find((complex) => complex.id === complexId) ?? null;
};

const findDepartment = (complex: ComplexNode | null, departmentId: string | null): DepartmentNode | null =>
  complex?.departments.find((department) => department.id === departmentId) ?? null;

const findDivision = (department: DepartmentNode | null, divisionId: string | null): DivisionNode | null =>
  department?.divisions.find((division) => division.id === divisionId) ?? null;

const findTeam = (division: DivisionNode | null, teamId: string | null): TeamNode | null =>
  division?.teams.find((team) => team.id === teamId) ?? null;

const findTeamInDepartment = (department: DepartmentNode | null, teamId: string | null): TeamNode | null => {
  if (!department || !teamId) return null;
  return (
    department.divisions.flatMap((division) => division.teams).find((team) => team.id === teamId) ?? null
  );
};

const toOptions = (items: Array<{ id: string; name: string }>): SelectOption[] =>
  items.map((item) => ({ value: item.id, label: item.name }));

const filterBySearch = (items: EmployeeRecord[], search: string) => {
  const term = search.trim().toLowerCase();
  if (!term) return items;

  return items.filter((employee) => {
    return (
      employee.fullName.toLowerCase().includes(term) ||
      employee.position.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term)
    );
  });
};

const paginate = (items: EmployeeRecord[], page: number, perPage: number): EmployeesQueryResult => {
  const safePerPage = perPage > 0 ? perPage : 10;
  const safePage = page > 0 ? page : 1;
  const startIndex = (safePage - 1) * safePerPage;

  return {
    total: items.length,
    rows: items.slice(startIndex, startIndex + safePerPage),
  };
};

export const fetchRegions = async () =>
  mockApi(
    toOptions(
      employeesHierarchyMock.regions.map((region) => ({
        id: region.id,
        name: region.name,
      })),
    ),
    500,
  );

export const fetchFilials = async (regionId: string) => {
  const region = findRegion(regionId);
  const filials = region?.isHeadOffice ? [] : (region?.filials ?? []);
  return mockApi(toOptions(filials), 500);
};

export const fetchComplexes = async (params: { regionId: string; filialId: string | null }) => {
  const region = findRegion(params.regionId);
  if (!region) return mockApi<SelectOption[]>([], 500);

  const complexes = region.isHeadOffice ? region.complexes : (findFilial(region, params.filialId)?.complexes ?? []);
  return mockApi(toOptions(complexes), 500);
};

export const fetchDepartments = async (params: {
  regionId: string;
  filialId: string | null;
  complexId: string;
}) => {
  const region = findRegion(params.regionId);
  const filial = findFilial(region, params.filialId);
  const complex = findComplex(region, filial, params.complexId);
  return mockApi(toOptions(complex?.departments ?? []), 500);
};

export const fetchDivisions = async (params: {
  regionId: string;
  filialId: string | null;
  complexId: string;
  departmentId: string;
}) => {
  const region = findRegion(params.regionId);
  const filial = findFilial(region, params.filialId);
  const complex = findComplex(region, filial, params.complexId);
  const department = findDepartment(complex, params.departmentId);
  return mockApi(toOptions(department?.divisions ?? []), 500);
};

export const fetchTeams = async (params: {
  regionId: string;
  filialId: string | null;
  complexId: string;
  departmentId: string;
  divisionId: string | null;
}) => {
  const region = findRegion(params.regionId);
  const filial = findFilial(region, params.filialId);
  const complex = findComplex(region, filial, params.complexId);
  const department = findDepartment(complex, params.departmentId);
  if (!department) return mockApi<SelectOption[]>([], 500);

  if (params.divisionId) {
    const division = findDivision(department, params.divisionId);
    return mockApi(toOptions(division?.teams ?? []), 500);
  }

  return mockApi(toOptions(department.divisions.flatMap((division) => division.teams)), 500);
};

export const fetchEmployeesByFilters = async (filters: FiltersState): Promise<EmployeesQueryResult> => {
  const region = findRegion(filters.regionId);
  if (!region) return mockApi({ total: 0, rows: [] }, 550);

  const filial = findFilial(region, filters.filialId);
  const complex = findComplex(region, filial, filters.complexId);
  const department = findDepartment(complex, filters.departmentId);
  const division = findDivision(department, filters.divisionId);
  const team = division
    ? findTeam(division, filters.teamId)
    : findTeamInDepartment(department, filters.teamId);

  let baseEmployees: EmployeeRecord[] = [];

  if (team) {
    baseEmployees = team.employees;
  } else if (division) {
    baseEmployees = flattenDivisionEmployees(division);
  } else if (department) {
    baseEmployees = flattenDepartmentEmployees(department);
  } else if (complex) {
    if (region.id === employeesKeys.headOfficeRegion) {
      baseEmployees = [complex.deputy, ...complex.staff];
    } else {
      baseEmployees = flattenComplexEmployees(complex);
    }
  } else if (filial) {
    baseEmployees = [filial.head, ...filial.staff];
  } else if (region.id === employeesKeys.headOfficeRegion) {
    baseEmployees = [region.head, ...region.staff].filter((employee): employee is EmployeeRecord => employee !== null);
  }

  const filtered = filterBySearch(baseEmployees, filters.search);
  return mockApi(paginate(filtered, filters.page, filters.perPage), 550);
};
