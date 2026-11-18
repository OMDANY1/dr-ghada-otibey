import React from "react";

export type StitchIconName =
  | "arrow-forward"
  | "arrow-back"
  | "arrow-up-right"
  | "check-circle"
  | "chat"
  | "lock"
  | "verified"
  | "dermatology"
  | "hair"
  | "hourglass"
  | "sparkle"
  | "calendar"
  | "support"
  | "cycle"
  | "info"
  | "copy"
  | "send"
  | "chevron-down"
  | "book"
  | "camera"
  | "shield"
  | "menu"
  | "close";

interface StitchIconProps {
  name: StitchIconName;
  className?: string;
  size?: number;
}

export function StitchIcon({
  name,
  className = "",
  size = 18,
}: StitchIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (name) {
    case "arrow-back":
      return (
        <svg {...common}>
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
      );
    case "arrow-forward":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.3 2.3 2.3 4.8-5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.8Z" />
          <path d="M9 11h6M9 14h4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "verified":
      return (
        <svg {...common}>
          <path d="M12 3 4.5 6v5.5c0 4.8 3.2 8.7 7.5 9.8 4.3-1.1 7.5-5 7.5-9.8V6L12 3Z" />
          <path d="m9 12.2 2 2 4-4.2" />
        </svg>
      );
    case "dermatology":
      return (
        <svg {...common}>
          <path d="M12 3.5C12 3.5 6.5 10.2 6.5 14.5a5.5 5.5 0 0 0 11 0C17.5 10.2 12 3.5 12 3.5Z" />
          <path d="M9.8 15.2a2.8 2.8 0 0 0 2.7 2" />
        </svg>
      );
    case "hair":
      return (
        <svg {...common}>
          <path d="M12 20c0-5 2.5-9.5 4.5-14" />
          <path d="M9 19.5c.5-3.8 1.9-7.4 3.5-11" />
          <path d="M6.5 17.8c2.5.8 7.5.8 11 0" />
        </svg>
      );
    case "hourglass":
      return (
        <svg {...common}>
          <path d="M6.5 3.5h11M6.5 20.5h11" />
          <path d="M8 3.5v3.2c0 2 1.5 3.6 4 5.3 2.5-1.7 4-3.3 4-5.3V3.5" />
          <path d="M16 20.5v-3.2c0-2-1.5-3.6-4-5.3-2.5 1.7-4 3.3-4 5.3v3.2" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="m12 3 1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3Z" />
          <path d="M19 16.5v3M17.5 18h3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" />
          <path d="M12 13v4M10 15h4" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 9.5a2.5 2.5 0 0 1 4.8.8c0 1.6-2.4 2.1-2.4 3.4" />
          <circle cx="12" cy="17.2" r="0.7" fill="currentColor" />
        </svg>
      );
    case "cycle":
      return (
        <svg {...common}>
          <path d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4.5 15" />
          <path d="M4.5 19v-4h4" />
          <path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L19.5 9" />
          <path d="M19.5 5v4h-4" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <circle cx="12" cy="8" r="0.7" fill="currentColor" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common}>
          <rect x="9" y="9" width="11" height="11" rx="1.8" />
          <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <path d="m21 3-9.5 18-2.8-7.7L1 10.5 21 3Z" />
          <path d="m21 3-12.3 10.3" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5v-17Z" />
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4.5 6v5.5c0 4.8 3.2 8.7 7.5 9.8 4.3-1.1 7.5-5 7.5-9.8V6L12 3Z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h11" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
  }
}
