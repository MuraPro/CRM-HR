import type { Employee } from "./types";
import type { EmployeeStatus } from "./types";
import { mockRegions } from "@/entities/region/model/mock-regions";

const EMPLOYEE_NAMES = [
  "Исмоилова Дилафруз",
  "Дилноза Исматова",
  "Фаррух Хамидов",
  "Дилшод Турсунов",
  "Зарина Исматова",
  "Фарход Мухамедов",
  "Дилором Исматова",
  "Азиза Каримова",
  "Шерзод Рахимов",
  "Мадина Норова",
  "Отабек Султанов",
  "Нилуфар Ахмедова",
  "Рустам Жураев",
  "Шахло Тохирова",
  "Сардор Юлдашев",
  "Гульноза Рахматова",
  "Бехзод Хакимов",
  "Муниса Эргашева",
  "Жасур Умаров",
  "Ситора Абдуллаева",
];

const EMPLOYEE_POSITIONS = [
  "Software Developer",
  "Кассир",
  "Специалист по инвестициям",
  "Кредитный аналитик",
  "Риск-менеджер",
  "Операционист",
  "HR-специалист",
  "Бухгалтер",
];

const EMPLOYEE_STATUSES: EmployeeStatus[] = ["Активный", "Активный", "Активный", "В отпуске", "Уволен"];

const EMPLOYEE_ADDRESSES = [
  "ул. Навои, 18, Ташкент",
  "Юнусабад, Ташкент",
  "Мирабад, Ташкент",
  "Чиланзар, Ташкент",
  "Сергелийский район, Ташкент",
  "Шайхантахур, Ташкент",
];

const EMPLOYEE_GENDERS = ["Женский", "Мужской"] as const;

const EXPERIENCE_COMPANIES = ["Agrobank", "Crafers", "Artel", "Hamkor Bank", "Ipak Yoli Bank"];
const PROJECT_NAMES = ["Агромобайл", "ДБО", "Фонд развития", "Кредитный модуль", "Payroll HR", "Risk Monitor"];
const REGION_BRANCHES = mockRegions.flatMap((region) => region.branches);

const createPhone = (id: number) => {
  const middle = String(90 + (id % 9)).padStart(2, "0");
  const first = String(100 + id).slice(-3);
  const second = String(200 + id).slice(-3);
  return `+998 ${middle} ${first} ${second}`;
};

const createBirthday = (id: number) => {
  const day = String((id % 27) + 1).padStart(2, "0");
  const month = String((id % 12) + 1).padStart(2, "0");
  const year = 1988 + (id % 15);
  return `${day}.${month}.${year}`;
};

const createEmployee = (id: number, branchId: string): Employee => {
  const name = EMPLOYEE_NAMES[(id - 1) % EMPLOYEE_NAMES.length];
  const position = EMPLOYEE_POSITIONS[(id - 1) % EMPLOYEE_POSITIONS.length];
  const status = EMPLOYEE_STATUSES[(id - 1) % EMPLOYEE_STATUSES.length];
  const address = EMPLOYEE_ADDRESSES[(id - 1) % EMPLOYEE_ADDRESSES.length];
  const gender = EMPLOYEE_GENDERS[(id - 1) % EMPLOYEE_GENDERS.length];
  const primaryCompany = EXPERIENCE_COMPANIES[(id - 1) % EXPERIENCE_COMPANIES.length];
  const secondaryCompany = EXPERIENCE_COMPANIES[id % EXPERIENCE_COMPANIES.length];
  const primaryProject = PROJECT_NAMES[(id - 1) % PROJECT_NAMES.length];
  const secondaryProject = PROJECT_NAMES[id % PROJECT_NAMES.length];

  return {
    id: String(id),
    branchId,
    fullName: name,
    position,
    email: `employee${String(id).padStart(2, "0")}@agrobank.uz`,
    phone: createPhone(id),
    status,
    address,
    birthday: createBirthday(id),
    gender,
    experience: [
      {
        id: `${id}-exp-1`,
        company: primaryCompany,
        role: position,
        period: `${2016 + (id % 6)} - наст. время`,
      },
      {
        id: `${id}-exp-2`,
        company: secondaryCompany,
        role: `Стажировка: ${position}`,
        period: `${2013 + (id % 5)} - ${2015 + (id % 6)}`,
      },
    ],
    projects: [
      {
        id: `${id}-prj-1`,
        name: primaryProject,
        progress: `${4 + (id % 6)}/10`,
        deadline: `${String((id % 27) + 1).padStart(2, "0")}.0${(id % 8) + 1}.2026`,
      },
      {
        id: `${id}-prj-2`,
        name: secondaryProject,
        progress: `${3 + (id % 7)}/10`,
        deadline: `${String((id % 25) + 1).padStart(2, "0")}.1${id % 2}.2026`,
      },
    ],
  };
};

export const mockEmployees: Employee[] = REGION_BRANCHES.flatMap((branch, branchIndex) =>
  Array.from({ length: branch.employees }, (_, employeeIndex) => {
    const id = branchIndex * 10_000 + employeeIndex + 1;
    return createEmployee(id, branch.id);
  }),
);

export const addMockEmployee = (employee: Employee) => {
  mockEmployees.push(employee);
};

export const getNextMockEmployeeId = () => {
  const currentMaxId = mockEmployees.reduce((maxId, employee) => {
    const numericId = Number(employee.id);
    if (Number.isNaN(numericId)) {
      return maxId;
    }

    return Math.max(maxId, numericId);
  }, 0);

  return String(currentMaxId + 1);
};

