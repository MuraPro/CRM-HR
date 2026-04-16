import type { SVGProps } from "react";

import { iconListComponents } from "@/shared/const/icon-const";
import type { IconNameTypes } from "@/shared/types/icons-types";

type IconProps = {
  name: IconNameTypes;
} & SVGProps<SVGSVGElement>;

export function Icon({ name, ...otherProps }: IconProps) {
  const iconName = iconListComponents[name];
  if (!iconName) return null;

  return (
    <svg
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width="20"
      {...otherProps}
    >
      {iconName === "dashboard" && <path d="M3 13h8V3H3v10Zm10 8h8V11h-8v10Zm0-18v4h8V3h-8ZM3 21h8v-4H3v4Z" />}
      {iconName === "users" && (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      )}
      {iconName === "map" && (
        <>
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" x2="9" y1="3" y2="18" />
          <line x1="15" x2="15" y1="6" y2="21" />
        </>
      )}
      {iconName === "file" && (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </>
      )}
      {iconName === "briefcase" && (
        <>
          <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </>
      )}
      {iconName === "calendar" && (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      )}
      {iconName === "report" && (
        <>
          <path d="M3 3v18h18" />
          <rect x="7" y="12" width="2.5" height="6" rx="1" />
          <rect x="11" y="9" width="2.5" height="9" rx="1" />
          <rect x="15" y="6" width="2.5" height="12" rx="1" />
        </>
      )}
      {iconName === "wallet" && (
        <>
          <rect x="2" y="6" width="20" height="14" rx="2" ry="2" />
          <path d="M16 12h4v4h-4a2 2 0 1 1 0-4Z" />
          <path d="M6 6V4h11a3 3 0 0 1 3 3" />
        </>
      )}
      {iconName === "settings" && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.33H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.28.3.46.66.52 1.06A1.65 1.65 0 0 0 21 10.5a2 2 0 1 1 0 4 1.65 1.65 0 0 0-1.58.5Z" />
        </>
      )}
      {iconName === "help" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.2-3 4" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      )}
      {iconName === "chevronsLeft" && (
        <>
          <polyline points="13 17 8 12 13 7" />
          <polyline points="19 17 14 12 19 7" />
        </>
      )}
      {iconName === "chevronsRight" && (
        <>
          <polyline points="11 7 16 12 11 17" />
          <polyline points="5 7 10 12 5 17" />
        </>
      )}
      {iconName === "search" && (
        <>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </>
      )}
      {iconName === "logout" && (
        <>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </>
      )}
      {iconName === "back" && (
        <>
          <line x1="19" x2="5" y1="12" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </>
      )}
      {iconName === "check" && <polyline points="20 6 9 17 4 12" />}
      {iconName === "download" && (
        <>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </>
      )}
    </svg>
  );
}
