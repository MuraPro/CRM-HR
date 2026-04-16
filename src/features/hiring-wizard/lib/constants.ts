import type { HiringCandidate, HiringFormData } from "../model/types";

export const initialHiringForm: HiringFormData = {
  pinfl: "",
  firstName: "",
  lastName: "",
  middleName: "",
  birthday: "",
  gender: "",
  phone: "",
  email: "",
  familyStatus: "",
  branch: "",
  department: "",
  position: "",
  assignmentType: "",
  employmentType: "",
  startDate: "",
  orderNumber: "",
  orderDate: "",
  workDate: "",
  resumeFileName: "",
  photoFileName: "",
};

export const mockCandidates: HiringCandidate[] = [
  { pinfl: "12345678909876", fullName: "Елена Николаевна Соколова", status: "Новый" },
  { pinfl: "12345678905678", fullName: "Агзамова Раиса Васильевна", status: "Ранее уволен" },
  { pinfl: "12345678912345", fullName: "Егорова Светлана Николаевна", status: "Активный" },
];

