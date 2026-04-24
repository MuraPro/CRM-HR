export interface EmployeeRecord {
  id: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  status: "Активный" | "В отпуске" | "Уволен";
  regionId: string;
  filialId: string | null;
  complexId: string | null;
  departmentId: string | null;
  divisionId: string | null;
  teamId: string | null;
  level:
    | "region-head"
    | "region-staff"
    | "filial-head"
    | "filial-staff"
    | "complex-deputy"
    | "complex-staff"
    | "department-staff"
    | "division-staff"
    | "team-staff";
}

export interface TeamNode {
  id: string;
  name: string;
  employees: EmployeeRecord[];
}

export interface DivisionNode {
  id: string;
  name: string;
  employees: EmployeeRecord[];
  teams: TeamNode[];
}

export interface DepartmentNode {
  id: string;
  name: string;
  employees: EmployeeRecord[];
  divisions: DivisionNode[];
}

export interface ComplexNode {
  id: string;
  name: string;
  deputy: EmployeeRecord;
  staff: EmployeeRecord[];
  departments: DepartmentNode[];
}

export interface FilialNode {
  id: string;
  name: string;
  head: EmployeeRecord;
  staff: EmployeeRecord[];
  complexes: ComplexNode[];
}

export interface RegionNode {
  id: string;
  name: string;
  isHeadOffice: boolean;
  head: EmployeeRecord | null;
  staff: EmployeeRecord[];
  filials: FilialNode[];
  complexes: ComplexNode[];
}

export interface EmployeesHierarchyData {
  regions: RegionNode[];
}

export interface FiltersState {
  regionId: string | null;
  filialId: string | null;
  complexId: string | null;
  departmentId: string | null;
  divisionId: string | null;
  teamId: string | null;
  search: string;
  page: number;
  perPage: number;
}

export interface EmployeesQueryResult {
  total: number;
  rows: EmployeeRecord[];
}
