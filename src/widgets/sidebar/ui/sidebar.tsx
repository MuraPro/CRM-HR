import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logoIcon from "@/shared/assets/icons/logo.svg";
import { Icon } from "@/shared/ui/icon";
import { VStack } from "@/shared/ui/stack";

import { bottomNavigationItems, primaryNavigationSections, type NavigationItem } from "../model/navigation-items";

const SIDEBAR_COLLAPSE_KEY = "hrm-sidebar-collapsed";

const getInitialSidebarState = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const savedState = localStorage.getItem(SIDEBAR_COLLAPSE_KEY);
  return savedState === "1";
};

const navItemBaseClass =
  "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition";

function SidebarNavigationItem({
  item,
  isCollapsed,
  label,
  disableActiveStyles = false,
}: {
  item: NavigationItem;
  isCollapsed: boolean;
  label: string;
  disableActiveStyles?: boolean;
}) {
  const itemClassName = `${navItemBaseClass} text-greyscale-700 hover:bg-greyscale-200`;

  if (!item.path) {
    return (
      <button
        type="button"
        className={`${itemClassName} cursor-default`}
        title={isCollapsed ? label : undefined}
        aria-label={label}
      >
        <Icon className="size-4 shrink-0" name={item.icon} />
        {!isCollapsed ? <span className="truncate">{label}</span> : null}
      </button>
    );
  }

  return (
    <NavLink
      to={item.path}
      title={isCollapsed ? label : undefined}
      aria-label={label}
      className={({ isActive }) =>
        `${navItemBaseClass} ${
          !disableActiveStyles && isActive
            ? "bg-[#ECEAFA] text-[#4B47CC]"
            : "text-greyscale-700 hover:bg-greyscale-200"
        }`
      }
    >
      <Icon className="size-4 shrink-0" name={item.icon} />
      {!isCollapsed ? <span className="truncate">{label}</span> : null}
    </NavLink>
  );
}

export const Sidebar = () => {
  const { t } = useTranslation("common");
  const [isCollapsed, setIsCollapsed] = useState(getInitialSidebarState);

  const handleToggleCollapse = () => {
    setIsCollapsed((prevState) => {
      const nextState = !prevState;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_COLLAPSE_KEY, nextState ? "1" : "0");
      }
      return nextState;
    });
  };

  return (
    <aside
      className={`sticky top-4 h-[calc(100vh-2rem)] rounded-2xl border border-greyscale-200 bg-white px-3 py-4 transition-all ${
        isCollapsed ? "w-20" : "w-56"
      }`}
    >
      <VStack gap={6} className="h-full">
        <div className="flex items-center justify-between gap-2 self-stretch px-1">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={logoIcon}
              alt="Agrobank"
              className={`shrink-0 ${isCollapsed ? "size-7" : "h-7 w-auto"}`}
            />
          </div>
          <button
            type="button"
            onClick={handleToggleCollapse}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-greyscale-300 text-greyscale-600 hover:bg-greyscale-100"
            aria-label={isCollapsed ? t("sidebar.expand") : t("sidebar.collapse")}
          >
            <Icon name={isCollapsed ? "chevronsRight" : "chevronsLeft"} className="size-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto pr-1">
          {primaryNavigationSections.map((section) => (
            <section key={section.titleKey} className="space-y-1">
              {!isCollapsed ? (
                <h2 className="px-3 pb-1 text-xs font-medium text-greyscale-500">{t(section.titleKey)}</h2>
              ) : null}
              {section.items.map((item) => (
                <SidebarNavigationItem
                  key={`${section.titleKey}-${item.labelKey}`}
                  item={item}
                  isCollapsed={isCollapsed}
                  label={t(item.labelKey)}
                />
              ))}
            </section>
          ))}
        </nav>

        <div className="space-y-1 border-t border-greyscale-200 pt-3">
          {bottomNavigationItems.map((item) => (
            <SidebarNavigationItem
              key={`bottom-${item.labelKey}`}
              item={item}
              isCollapsed={isCollapsed}
              label={t(item.labelKey)}
              disableActiveStyles
            />
          ))}
        </div>
      </VStack>
    </aside>
  );
};

