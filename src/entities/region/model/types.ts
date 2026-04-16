export interface RegionBranch {
  id: string;
  title: string;
  employees: number;
  department: string;
}

export interface Region {
  id: string;
  name: string;
  branches: RegionBranch[];
}

