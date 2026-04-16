export type HiringStep = 1 | 2 | 3 | 4 | 5;

export interface HiringCandidate {
  pinfl: string;
  fullName: string;
  status: "Новый" | "Ранее уволен" | "Активный" | "Недоступен";
}

export interface HiringFormData {
  pinfl: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  gender: string;
  phone: string;
  email: string;
  familyStatus: string;
  branch: string;
  department: string;
  position: string;
  assignmentType: string;
  employmentType: string;
  startDate: string;
  orderNumber: string;
  orderDate: string;
  workDate: string;
  resumeFileName: string;
  photoFileName: string;
}

