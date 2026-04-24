import type {
  ComplexNode,
  DepartmentNode,
  DivisionNode,
  EmployeeRecord,
  EmployeesHierarchyData,
  FilialNode,
  RegionNode,
  TeamNode,
} from "../model/types";

const REGION_NAMES = [
  { id: "head-office", name: "Головной офис", isHeadOffice: true },
  { id: "tashkent", name: "Ташкент", isHeadOffice: false },
  { id: "samarkand", name: "Самарканд", isHeadOffice: false },
  { id: "fergana", name: "Фергана", isHeadOffice: false },
  { id: "andijan", name: "Андижан", isHeadOffice: false },
  { id: "bukhara", name: "Бухара", isHeadOffice: false },
  { id: "namangan", name: "Наманган", isHeadOffice: false },
  { id: "khorezm", name: "Хорезм", isHeadOffice: false },
  { id: "navoi", name: "Навои", isHeadOffice: false },
  { id: "kashkadarya", name: "Кашкадарья", isHeadOffice: false },
  { id: "surkhandarya", name: "Сурхандарья", isHeadOffice: false },
  { id: "jizzakh", name: "Джизак", isHeadOffice: false },
  { id: "syrdarya", name: "Сырдарья", isHeadOffice: false },
  { id: "karakalpakstan", name: "Республика Каракалпакстан", isHeadOffice: false },
];

const FIRST_NAMES = ["Алишер", "Дилором", "Фаррух", "Нилуфар", "Сардор", "Мадина", "Шерзод", "Азиза"];
const LAST_NAMES = ["Абдуллаев", "Каримова", "Турсунов", "Жураева", "Рахимов", "Исматова", "Хакимов", "Юлдашева"];
const STATUSES: Array<EmployeeRecord["status"]> = ["Активный", "Активный", "Активный", "В отпуске", "Уволен"];

let employeeSequence = 1;

const buildEmployee = (
  level: EmployeeRecord["level"],
  position: string,
  ids: Pick<EmployeeRecord, "regionId" | "filialId" | "complexId" | "departmentId" | "divisionId" | "teamId">,
): EmployeeRecord => {
  const seq = employeeSequence++;
  const firstName = FIRST_NAMES[seq % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(seq + 3) % LAST_NAMES.length];
  const phone = `+998 9${seq % 9} ${String(100 + (seq % 900)).padStart(3, "0")} ${String(100 + ((seq * 3) % 900)).padStart(3, "0")}`;

  return {
    id: `emp-${seq}`,
    fullName: `${firstName} ${lastName}`,
    position,
    email: `employee${seq}@company.uz`,
    phone,
    status: STATUSES[seq % STATUSES.length],
    level,
    ...ids,
  };
};

const makeTeam = (scopeName: string, indexes: { regionId: string; filialId: string | null; complexId: string; departmentId: string; divisionId: string }, i: number): TeamNode => {
  const id = `${indexes.divisionId}-team-${i + 1}`;
  const name = `Отдел ${scopeName} ${i + 1}`;

  return {
    id,
    name,
    employees: Array.from({ length: 4 }, () =>
      buildEmployee("team-staff", `Специалист ${name}`, {
        regionId: indexes.regionId,
        filialId: indexes.filialId,
        complexId: indexes.complexId,
        departmentId: indexes.departmentId,
        divisionId: indexes.divisionId,
        teamId: id,
      }),
    ),
  };
};

const makeDivision = (
  scopeName: string,
  indexes: { regionId: string; filialId: string | null; complexId: string; departmentId: string },
  i: number,
): DivisionNode => {
  const id = `${indexes.departmentId}-division-${i + 1}`;
  const name = `Подразделение ${scopeName} ${i + 1}`;

  return {
    id,
    name,
    employees: Array.from({ length: 3 }, () =>
      buildEmployee("division-staff", `Сотрудник ${name}`, {
        regionId: indexes.regionId,
        filialId: indexes.filialId,
        complexId: indexes.complexId,
        departmentId: indexes.departmentId,
        divisionId: id,
        teamId: null,
      }),
    ),
    teams: Array.from({ length: 2 }, (_, index) => makeTeam(scopeName, { ...indexes, divisionId: id }, index)),
  };
};

const makeDepartment = (
  scopeName: string,
  indexes: { regionId: string; filialId: string | null; complexId: string },
  i: number,
): DepartmentNode => {
  const id = `${indexes.complexId}-department-${i + 1}`;
  const name = `Департамент ${scopeName} ${i + 1}`;

  return {
    id,
    name,
    employees: Array.from({ length: 4 }, () =>
      buildEmployee("department-staff", `Сотрудник ${name}`, {
        regionId: indexes.regionId,
        filialId: indexes.filialId,
        complexId: indexes.complexId,
        departmentId: id,
        divisionId: null,
        teamId: null,
      }),
    ),
    divisions: Array.from({ length: 2 }, (_, index) => makeDivision(scopeName, { ...indexes, departmentId: id }, index)),
  };
};

const makeComplex = (scopeName: string, indexes: { regionId: string; filialId: string | null }, i: number): ComplexNode => {
  const id = `${indexes.filialId ?? indexes.regionId}-complex-${i + 1}`;
  const name = `Комплекс ${scopeName} ${i + 1}`;

  return {
    id,
    name,
    deputy: buildEmployee("complex-deputy", `Зам. начальника ${name}`, {
      regionId: indexes.regionId,
      filialId: indexes.filialId,
      complexId: id,
      departmentId: null,
      divisionId: null,
      teamId: null,
    }),
    staff: Array.from({ length: 10 }, () =>
      buildEmployee("complex-staff", `Сотрудник комплекса ${name}`, {
        regionId: indexes.regionId,
        filialId: indexes.filialId,
        complexId: id,
        departmentId: null,
        divisionId: null,
        teamId: null,
      }),
    ),
    departments: Array.from({ length: 2 }, (_, index) => makeDepartment(scopeName, { ...indexes, complexId: id }, index)),
  };
};

const makeFilial = (region: RegionNode, i: number): FilialNode => {
  const id = `${region.id}-filial-${i + 1}`;
  const name = `Филиал ${region.name} ${i + 1}`;
  return {
    id,
    name,
    head: buildEmployee("filial-head", `Начальник ${name}`, {
      regionId: region.id,
      filialId: id,
      complexId: null,
      departmentId: null,
      divisionId: null,
      teamId: null,
    }),
    staff: Array.from({ length: 6 }, () =>
      buildEmployee("filial-staff", `Сотрудник ${name}`, {
        regionId: region.id,
        filialId: id,
        complexId: null,
        departmentId: null,
        divisionId: null,
        teamId: null,
      }),
    ),
    complexes: Array.from({ length: 2 }, (_, index) => makeComplex(region.name, { regionId: region.id, filialId: id }, index)),
  };
};

const createRegion = (regionMeta: (typeof REGION_NAMES)[number]): RegionNode => {
  const baseRegion: RegionNode = {
    id: regionMeta.id,
    name: regionMeta.name,
    isHeadOffice: regionMeta.isHeadOffice,
    head: regionMeta.isHeadOffice
      ? buildEmployee("region-head", "Начальник головного офиса", {
          regionId: regionMeta.id,
          filialId: null,
          complexId: null,
          departmentId: null,
          divisionId: null,
          teamId: null,
        })
      : null,
    staff: regionMeta.isHeadOffice
      ? Array.from({ length: 5 }, () =>
          buildEmployee("region-staff", "Сотрудник головного офиса", {
            regionId: regionMeta.id,
            filialId: null,
            complexId: null,
            departmentId: null,
            divisionId: null,
            teamId: null,
          }),
        )
      : [],
    filials: [],
    complexes: [],
  };

  if (regionMeta.isHeadOffice) {
    baseRegion.complexes = Array.from({ length: 3 }, (_, index) =>
      makeComplex("Головного офиса", { regionId: baseRegion.id, filialId: null }, index),
    );
  } else {
    baseRegion.filials = Array.from({ length: 2 }, (_, index) => makeFilial(baseRegion, index));
  }

  return baseRegion;
};

export const employeesHierarchyMock: EmployeesHierarchyData = {
  regions: REGION_NAMES.map(createRegion),
};
