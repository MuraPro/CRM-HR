import { createBrowserRouter, redirect } from "react-router-dom";

import { HrmLayout } from "@/app/layouts/hrm-layout";
import { AppRoute } from "@/shared/config/routes";

import { AttendancePage } from "@/pages/attendance";
import { DashboardPage } from "@/pages/dashboard";
import { DocumentsPage } from "@/pages/documents";
import { EmployeeDetailsPage } from "@/pages/employee-details";
import { EmployeesPage } from "@/pages/employees";
import { HiringPage } from "@/pages/hiring";
import { LoginPage } from "@/pages/login";
import { RegionsPage } from "@/pages/regions";

export const browserRouter = createBrowserRouter([
  { path: "/", loader: () => redirect(AppRoute.login) },
  { path: AppRoute.login, Component: LoginPage },
  {
    Component: HrmLayout,
    children: [
      { path: AppRoute.dashboard, Component: DashboardPage },
      { path: AppRoute.attendance, Component: AttendancePage },
      { path: AppRoute.employees, Component: EmployeesPage },
      { path: AppRoute.employeeById, Component: EmployeeDetailsPage },
      { path: AppRoute.regions, Component: RegionsPage },
      { path: AppRoute.documents, Component: DocumentsPage },
      { path: AppRoute.hiring, Component: HiringPage },
    ],
  },
]);
