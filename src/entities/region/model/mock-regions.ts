import type { Region } from "./types";

export const mockRegions: Region[] = [
  {
    id: "tashkent",
    name: "Ташкентский регион",
    branches: [
      { id: "t-1", title: "Ташкентский городской филиал", employees: 156, department: "Отдел клиентского сервиса" },
      { id: "t-2", title: "Агробанк, Юнусабадский филиал", employees: 92, department: "Отдел продаж" },
      { id: "t-3", title: "Агробанк, Мирабадский филиал", employees: 75, department: "Отдел клиентского сервиса" },
      { id: "t-4", title: "Агробанк, Шайхантахурский филиал", employees: 100, department: "Отдел клиентского сервиса" },
      { id: "t-5", title: "Агробанк, Чиланзарский филиал", employees: 68, department: "Отдел IT" },
      { id: "t-6", title: "Агробанк, Сергели", employees: 110, department: "Отдел маркетинга" },
      { id: "t-7", title: "Агробанк, Яккасарайский филиал", employees: 68, department: "Отдел кредитования" },
      { id: "t-8", title: "Агробанк, Учтепинский филиал", employees: 110, department: "Отдел развития бизнеса" },
    ],
  },
  {
    id: "navoi",
    name: "Навоийская область",
    branches: [
      { id: "n-1", title: "Агробанк, Навои центр", employees: 82, department: "Отдел клиентского сервиса" },
      { id: "n-2", title: "Агробанк, Зарафшан", employees: 57, department: "Кредитный отдел" },
      { id: "n-3", title: "Агробанк, Кызылтепа", employees: 49, department: "Операционный отдел" },
      { id: "n-4", title: "Агробанк, Кармана", employees: 55, department: "Отдел продаж" },
    ],
  },
  {
    id: "samarkand",
    name: "Самаркандская область",
    branches: [
      { id: "s-1", title: "Агробанк, Самарканд центр", employees: 110, department: "Отдел маркетинга" },
      { id: "s-2", title: "Агробанк, Регистан", employees: 75, department: "Кредитный отдел" },
      { id: "s-3", title: "Агробанк, Ургут", employees: 64, department: "Отдел розничного бизнеса" },
      { id: "s-4", title: "Агробанк, Пайарык", employees: 58, department: "Операционный отдел" },
      { id: "s-5", title: "Агробанк, Каттакурган", employees: 71, department: "Отдел корпоративного кредитования" },
    ],
  },
  {
    id: "syrdarya",
    name: "Сырдарьинская область",
    branches: [
      { id: "sy-1", title: "Агробанк, Гулистан", employees: 73, department: "Отдел развития бизнеса" },
      { id: "sy-2", title: "Агробанк, Сайхунабад", employees: 46, department: "Кредитный отдел" },
      { id: "sy-3", title: "Агробанк, Баяут", employees: 40, department: "Отдел клиентского сервиса" },
      { id: "sy-4", title: "Агробанк, Янгиер", employees: 51, department: "Операционный отдел" },
    ],
  },
  {
    id: "fergana",
    name: "Ферганская область",
    branches: [
      { id: "f-1", title: "Агробанк, Фергана центр", employees: 118, department: "Отдел продаж" },
      { id: "f-2", title: "Агробанк, Коканд", employees: 90, department: "Кредитный отдел" },
      { id: "f-3", title: "Агробанк, Маргилан", employees: 76, department: "Отдел клиентского сервиса" },
      { id: "f-4", title: "Агробанк, Кува", employees: 61, department: "Операционный отдел" },
      { id: "f-5", title: "Агробанк, Риштан", employees: 53, department: "Отдел малого бизнеса" },
    ],
  },
  {
    id: "kashkadarya",
    name: "Кашкадарьинская область",
    branches: [
      { id: "k-1", title: "Агробанк, Карши центр", employees: 98, department: "Отдел клиентского сервиса" },
      { id: "k-2", title: "Агробанк, Шахрисабз", employees: 74, department: "Отдел корпоративного кредитования" },
      { id: "k-3", title: "Агробанк, Гузар", employees: 59, department: "Операционный отдел" },
      { id: "k-4", title: "Агробанк, Яккабаг", employees: 52, department: "Отдел продаж" },
    ],
  },
  {
    id: "andijan",
    name: "Андижанская область",
    branches: [
      { id: "a-1", title: "Агробанк, Андижан центр", employees: 101, department: "Отдел розничного бизнеса" },
      { id: "a-2", title: "Агробанк, Асака", employees: 67, department: "Кредитный отдел" },
      { id: "a-3", title: "Агробанк, Ходжаабад", employees: 55, department: "Отдел клиентского сервиса" },
      { id: "a-4", title: "Агробанк, Пахтаабад", employees: 47, department: "Операционный отдел" },
    ],
  },
];

