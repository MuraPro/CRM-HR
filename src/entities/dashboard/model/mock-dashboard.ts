export const dashboardMetrics = [
  { id: "employees", label: "Количество сотрудников", value: "487", delta: "+20%" },
  { id: "income", label: "Общий доход", value: "$500,000", delta: "+20%" },
  { id: "clients", label: "Количество клиентов", value: "5,000", delta: "+20%" },
  { id: "projects", label: "Количество проектов", value: "100", delta: "+20%" },
];

export const dashboardTasks = [
  "Встреча с Игорем",
  "Запланировать отпуск",
  "Посмотреть посещаемость",
  "Регистрация на работу/выход",
];

const DASHBOARD_PEOPLE = [
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
];

const ACTIVITY_STATUSES = ["Удаленка", "В офисе", "Гибрид"];
const CHECK_IN_TIMES = ["08:45", "09:00", "09:10", "09:20"];
const CHECK_OUT_TIMES = ["16:30", "17:00", "17:20", "18:00"];

export const dashboardActivities = DASHBOARD_PEOPLE.map((name, index) => ({
  name,
  checkIn: CHECK_IN_TIMES[index % CHECK_IN_TIMES.length],
  checkOut: CHECK_OUT_TIMES[index % CHECK_OUT_TIMES.length],
  duration: "18:30:00",
  status: ACTIVITY_STATUSES[index % ACTIVITY_STATUSES.length],
}));

export interface DashboardAttendanceRow {
  id: string;
  fullName: string;
  position: string;
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  status: string;
}

const attendanceRowTemplates: Omit<DashboardAttendanceRow, "id">[] = DASHBOARD_PEOPLE.map((fullName, index) => ({
  fullName,
  position: String(23124324020 + index),
  date: `${13 + (index % 12)} февраля 2025`,
  checkIn: `${CHECK_IN_TIMES[index % CHECK_IN_TIMES.length]} утра`,
  checkOut: CHECK_OUT_TIMES[index % CHECK_OUT_TIMES.length],
  duration: "18:30:00",
  status: ACTIVITY_STATUSES[index % ACTIVITY_STATUSES.length],
}));

export const dashboardAttendanceRows: DashboardAttendanceRow[] = Array.from({ length: 360 }, (_, index) => {
  const rowTemplate = attendanceRowTemplates[index % attendanceRowTemplates.length];
  return {
    ...rowTemplate,
    id: String(index + 1),
  };
});

