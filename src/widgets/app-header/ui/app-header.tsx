import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select, type SelectOptionType } from "local-agro-ui";

import { AppRoute } from "@/shared/config/routes";
import { LocalStorageNames } from "@/shared/const/storage-const";
import type { LanguageType } from "@/shared/types/i18n-types";
import candidateAvatar from "@/shared/assets/candidate-avatar.svg";
import buttonsIcon from "@/shared/assets/icons/Buttons.svg";
import langIcon from "@/shared/assets/icons/lang.svg";

const resolvePageTitleKey = (pathname: string) => {
  if (pathname.startsWith(`${AppRoute.employees}/`)) {
    return "header.page.employeeDetails";
  }

  switch (pathname) {
    case AppRoute.dashboard:
      return "header.page.dashboard";
    case AppRoute.employees:
      return "header.page.employees";
    case AppRoute.attendance:
      return "header.page.attendance";
    case AppRoute.regions:
      return "header.page.regions";
    case AppRoute.documents:
      return "header.page.documents";
    case AppRoute.hiring:
      return "header.page.hiring";
    default:
      return "header.page.dashboard";
  }
};

const getNormalizedLanguage = (language: string) => (language.toLowerCase().startsWith("uz") ? "uz" : "ru");

export const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("common");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const currentTitleKey = resolvePageTitleKey(location.pathname);
  const currentLanguage = getNormalizedLanguage(i18n.language);
  const languageOptions = useMemo<SelectOptionType<LanguageType>[]>(
    () => [
      { value: "ru", label: t("header.language.ru") },
      { value: "uz", label: t("header.language.uz") },
    ],
    [t],
  );
  const selectedLanguageOption = languageOptions.find((option) => option.value === currentLanguage) ?? languageOptions[0];
  const handleLanguageChange = (option: SelectOptionType<LanguageType> | null) => {
    if (option) {
      void i18n.changeLanguage(option.value);
    }
  };
  const closeUserMenu = () => setIsUserMenuOpen(false);
  const handleLogout = () => {
    localStorage.removeItem(LocalStorageNames.Token);
    localStorage.removeItem(LocalStorageNames.RefreshToken);
    localStorage.removeItem(LocalStorageNames.FingerPrint);
    closeUserMenu();
    navigate(AppRoute.login);
  };

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        closeUserMenu();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="flex items-center justify-between rounded-2xl border border-greyscale-200 bg-white px-5 py-4">
      <h1 className="text-[28px] font-semibold leading-tight text-greyscale-900">{t(currentTitleKey)}</h1>

      <div className="flex items-center">
        <div className="w-[130px]">
          <Select
            aria-label={t("header.language.switch")}
            classNamePrefix="header-language-select"
            colorType="Blue"
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            formatOptionLabel={(option, meta) => (
              <span
                className={
                  meta.context === "value"
                    ? "inline-flex items-center gap-1"
                    : "inline-flex items-center gap-2"
                }
              >
                <span className="inline-flex items-center gap-2">
                  <img src={langIcon} alt="" className="size-[14px] shrink-0" aria-hidden />
                  <span>{option.label}</span>
                </span>
                {meta.context === "value" && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className={`transition-transform duration-200 ${isLanguageMenuOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            )}
            isSearchable={false}
            onMenuClose={() => setIsLanguageMenuOpen(false)}
            onMenuOpen={() => setIsLanguageMenuOpen(true)}
            onChange={handleLanguageChange}
            options={languageOptions}
            sizeType="sm"
            wrapperClassName="header-language-select-wrapper"
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  border: "none",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 0 0 8px",
              }),
              indicatorsContainer: (base) => ({
                ...base,
                display: "none",
              }),
              singleValue: (base) => ({
                ...base,
                paddingRight: "2px",
                marginRight: "0px",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            value={selectedLanguageOption}
          />
        </div>
        <button
          type="button"
          className="ml-1 inline-flex size-9 shrink-0 items-center justify-center rounded-lg transition hover:opacity-90"
          aria-label={t("sidebar.settings")}
        >
          <img src={buttonsIcon} alt="" className="size-9" aria-hidden />
        </button>
        <div className="relative ml-5" ref={userMenuRef}>
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg px-1 py-1 transition hover:bg-greyscale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B4BDC]"
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            aria-label={t("profileAccount")}
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-greyscale-900">{t("header.user.name")}</p>
              <p className="text-xs text-greyscale-600">{t("header.user.role")}</p>
            </div>
            <img src={candidateAvatar} alt={t("header.user.name")} className="size-9 rounded-full object-cover" />
          </button>

          {isUserMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-2 w-44 rounded-xl border border-greyscale-200 bg-white p-1 shadow-lg"
            >
              <button
                type="button"
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-greyscale-800 transition hover:bg-greyscale-100"
                onClick={closeUserMenu}
              >
                {t("profileAccount")}
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-error-500 transition hover:bg-error-50"
                onClick={handleLogout}
              >
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
