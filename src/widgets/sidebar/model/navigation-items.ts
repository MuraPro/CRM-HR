import { AppRoute } from "@/shared/config/routes";
import type { IconNameTypes } from "@/shared/types/icons-types";

export interface NavigationItem {
  labelKey: string;
  path?: string;
  icon: IconNameTypes;
}

export interface NavigationSection {
  titleKey: string;
  items: NavigationItem[];
}

export const primaryNavigationSections: NavigationSection[] = [
  {
    titleKey: "sidebar.sections.main",
    items: [
      { labelKey: "sidebar.main", path: AppRoute.dashboard, icon: "dashboard" },
      { labelKey: "sidebar.employees", path: AppRoute.regions, icon: "users" },
      { labelKey: "sidebar.attendance", path: AppRoute.attendance, icon: "calendar" },
      { labelKey: "sidebar.documents", path: AppRoute.documents, icon: "file" },
      { labelKey: "sidebar.reports", icon: "report" },
    ],
  },
  {
    titleKey: "sidebar.sections.hrProcesses",
    items: [
      { labelKey: "sidebar.hiring", path: AppRoute.hiring, icon: "briefcase" },
      { labelKey: "sidebar.positionChange", icon: "users" },
      { labelKey: "sidebar.termination", icon: "file" },
      { labelKey: "sidebar.vacancies", icon: "briefcase" },
      { labelKey: "sidebar.salary", icon: "wallet" },
    ],
  },
];

export const bottomNavigationItems: NavigationItem[] = [
  { labelKey: "sidebar.documents", path: AppRoute.documents, icon: "file" },
  { labelKey: "sidebar.settings", icon: "settings" },
  { labelKey: "sidebar.help", icon: "help" },
];

