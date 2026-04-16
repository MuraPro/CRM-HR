export type EmployeeStatus = "Активный" | "Уволен" | "В отпуске";

export interface EmployeeProject {
  id: string;
  name: string;
  progress: string;
  deadline: string;
}

export interface EmployeeExperience {
  id: string;
  company: string;
  role: string;
  period: string;
}

export interface Employee {
  id: string;
  branchId: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  status: EmployeeStatus;
  address: string;
  birthday: string;
  gender: string;
  experience: EmployeeExperience[];
  projects: EmployeeProject[];
}

