import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size?: number) => ({
  width: size ?? 24,
  height: size ?? 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* Bintang segi delapan — lambang madrasah */
export const Star8 = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2.6l2.3 5.3 5.3 2.3-5.3 2.3L12 17.8l-2.3-5.3L4.4 10.2l5.3-2.3z" />
    <path d="M12 6.4v7.4M8.3 10.2h7.4" opacity=".55" />
    <circle cx="12" cy="20.4" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Crescent = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M15.5 3.5a8.5 8.5 0 1 0 5 11.5A9.5 9.5 0 0 1 15.5 3.5z" />
    <path d="M8.5 8.2l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" opacity=".6" />
  </svg>
);

export const Quran = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5.5C10 4 7 3.5 4 4v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4c-3-.5-6 0-8 1.5z" />
    <path d="M12 5.5v14" />
    <path d="M6.8 8.2c1.4.1 2.5.4 3.4.9M6.8 11.4c1.4.1 2.5.4 3.4.9M13.8 9.1c.9-.5 2-.8 3.4-.9M13.8 12.3c.9-.5 2-.8 3.4-.9" opacity=".6" />
  </svg>
);

export const Cambridge = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <ellipse cx="12" cy="12" rx="9" ry="4" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" opacity=".7" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-60 12 12)" opacity=".7" />
  </svg>
);

export const CloudSync = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 17.5a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.7-1.1A4.8 4.8 0 0 1 17.5 17z" />
    <path d="M12 11.5v6M9.6 15.2l2.4 2.4 2.4-2.4" opacity=".8" />
  </svg>
);

export const ShieldCrescent = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2.8l7 2.6v6c0 5-3 8.4-7 9.8-4-1.4-7-4.8-7-9.8v-6z" />
    <path d="M13.8 8a4.4 4.4 0 1 0 2.4 6.3 5 5 0 0 1-2.4-6.3z" opacity=".8" />
  </svg>
);

export const Flask = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M9.5 3.5h5M10.5 3.5v5.2L5.2 18a2 2 0 0 0 1.8 3h10a2 2 0 0 0 1.8-3l-5.3-9.3V3.5" />
    <path d="M7.6 14.5h8.8" opacity=".7" />
    <circle cx="10.5" cy="17.5" r=".8" fill="currentColor" stroke="none" opacity=".7" />
    <circle cx="13.6" cy="18.6" r=".6" fill="currentColor" stroke="none" opacity=".7" />
  </svg>
);

export const Library = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4.5h3v15H4zM7 6.5h3v13H7z" />
    <path d="M11.2 6.7l2.9-.7 3.4 13.4-2.9.7z" />
    <path d="M4 19.5h16" opacity=".6" />
  </svg>
);

export const Mosque = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 20.5h16M5.5 20.5v-8h13v8" />
    <path d="M12 4.5c-2.6 2-3.9 3.9-3.9 6h7.8c0-2.1-1.3-4-3.9-6z" />
    <path d="M10.5 20.5v-4a1.5 1.5 0 0 1 3 0v4" />
    <path d="M12 2.5v2M3 20.5v-9l1.2-1.5M21 20.5v-9l-1.2-1.5" opacity=".7" />
  </svg>
);

export const ScreenLearn = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
    <path d="M7 8.5h6M7 11.5h4" opacity=".7" />
    <path d="M14.8 12.6l2.7-1.7-2.7-1.7z" fill="currentColor" stroke="none" opacity=".8" />
  </svg>
);

export const Field = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.2" opacity=".8" />
    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" opacity=".6" />
    <path d="M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2 2" opacity=".4" />
  </svg>
);

export const Palette = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 1.9-.9 1.5-1.9-.5-1.3.2-2.6 1.7-2.6h1.9c1.9 0 3.4-1.4 3.4-3.5 0-5-3.8-9-8.5-9z" />
    <circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none" opacity=".75" />
    <circle cx="12.5" cy="7" r="1.1" fill="currentColor" stroke="none" opacity=".75" />
    <circle cx="16.5" cy="9.8" r="1.1" fill="currentColor" stroke="none" opacity=".75" />
    <circle cx="7.5" cy="13.8" r="1.1" fill="currentColor" stroke="none" opacity=".75" />
  </svg>
);

export const Medal = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M8.5 3.5h7l-2.2 5h-2.6z" opacity=".7" />
    <circle cx="12" cy="13.5" r="5" />
    <path d="M12 11l.8 1.6 1.7.3-1.2 1.2.3 1.8-1.6-.9-1.6.9.3-1.8-1.2-1.2 1.7-.3z" fill="currentColor" stroke="none" opacity=".8" />
    <path d="M9.5 18l-1.5 3 4-1.7 4 1.7-1.5-3" opacity=".7" />
  </svg>
);

export const Graduate = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 9L12 4.5 21.5 9 12 13.5z" />
    <path d="M6.5 11.2v4.3c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.3" />
    <path d="M21.5 9v5" opacity=".7" />
    <circle cx="21.5" cy="15.2" r="1" fill="currentColor" stroke="none" opacity=".7" />
  </svg>
);

export const Chalkboard = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="4" width="18" height="12" rx="1.2" />
    <path d="M6.5 8h7M6.5 11h4.5" opacity=".7" />
    <path d="M8 20l2-4M16 20l-2-4M7 16h10" />
    <circle cx="16.8" cy="8.5" r="1.6" opacity=".8" />
  </svg>
);

export const GridBoard = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="3.5" width="7.2" height="7.2" rx="1" />
    <rect x="13.3" y="3.5" width="7.2" height="7.2" rx="1" opacity=".75" />
    <rect x="3.5" y="13.3" width="7.2" height="7.2" rx="1" opacity=".75" />
    <rect x="13.3" y="13.3" width="7.2" height="7.2" rx="1" opacity=".5" />
  </svg>
);

export const ChartUp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3.5 20.5h17" />
    <path d="M5.5 20.5v-6h3v6M10.5 20.5V9h3v11.5M15.5 20.5V4.5h3v16" opacity=".85" />
  </svg>
);

export const Printer = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 8V3.5h10V8" />
    <rect x="3.5" y="8" width="17" height="8.5" rx="1.2" />
    <path d="M7 13.5h10v7H7z" fill="var(--color-mist-50, #f6f7f1)" />
    <path d="M7 13.5h10v7H7zM9.5 16.5h5M9.5 18.5h3.5" />
    <circle cx="17.5" cy="10.8" r=".9" fill="currentColor" stroke="none" opacity=".8" />
  </svg>
);

export const PenEdit = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 20h4.5L19.8 8.7a2 2 0 0 0 0-2.8l-1.7-1.7a2 2 0 0 0-2.8 0L4 15.5z" />
    <path d="M13.5 6l4.5 4.5" opacity=".7" />
    <path d="M4 20l1.2-4.5" opacity=".7" />
  </svg>
);

export const Trash = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 6.5h15M9.5 6V4.5h5V6M6.5 6.5l.8 13a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-13" />
    <path d="M10 10.5v6M14 10.5v6" opacity=".7" />
  </svg>
);

export const Plus = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const Search = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6.5 17.5L17.5 6.5M8.5 6.5h9v9" />
  </svg>
);

export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </svg>
);

export const Phone = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5.5 3.5h3.6l1.6 4.4-2.2 1.6a12.8 12.8 0 0 0 6 6l1.6-2.2 4.4 1.6v3.6a1.8 1.8 0 0 1-2 1.8C10.4 19.7 4.3 13.6 3.7 5.5a1.8 1.8 0 0 1 1.8-2z" />
  </svg>
);

export const Pin = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21.5s7-6.6 7-11.5a7 7 0 1 0-14 0c0 4.9 7 11.5 7 11.5z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </svg>
);

export const ClockIc = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
);

export const Logout = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M14.5 8V5.5a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h7a1.5 1.5 0 0 0 1.5-1.5V16" />
    <path d="M9.5 12H21M17.5 8l3.5 4-3.5 4" />
  </svg>
);

export const Database = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
    <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" opacity=".7" />
  </svg>
);

export const SaveDisk = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 4h11l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
    <path d="M8 4v5h7V4M8 20v-6h8v6" />
  </svg>
);

export const ChevronDown = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5.5 9l6.5 6.5L18.5 9" />
  </svg>
);

export const Menu = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 6.5h16M4 12h16M4 17.5h10" />
  </svg>
);

export const Compass = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    <circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none" />
  </svg>
);

/* Logo madrasah: bintang 8 + kubah */
export function SchoolMark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        <rect x="2" y="2" width="44" height="44" rx="11" fill={dark ? "#0c2b20" : "#061a13"} />
        <path
          d="M24 7l4.2 9.6L38 21l-9.8 4.4L24 35l-4.2-9.6L10 21l9.8-4.4z"
          fill="none"
          stroke="#ddb048"
          strokeWidth="1.6"
        />
        <path d="M24 14.5c-3.4 2.4-5 4.7-5 7.4h10c0-2.7-1.6-5-5-7.4z" fill="#e9c972" />
        <path d="M17.5 26h13v5.5h-13z" fill="#c9952c" />
        <path d="M24 31.5v4" stroke="#ddb048" strokeWidth="1.4" />
        <circle cx="24" cy="37.5" r="1.2" fill="#e9c972" />
      </svg>
    </span>
  );
}
