import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks";
import { Star8 } from "./icons";

/* ---------- pembungkus scroll-reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure" | "span";
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "rv-in" : ""} ${className}`}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------- penanda seksi (kicker) ---------- */
export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.28em] uppercase ${
        light ? "text-gold-300" : "text-pine-600"
      }`}
    >
      <Star8 size={14} className={light ? "text-gold-400" : "text-gold-500"} />
      {children}
      <span className={`h-px w-10 ${light ? "bg-gold-400/60" : "bg-pine-300"}`} />
    </p>
  );
}

/* ---------- judul seksi ---------- */
export function SectionTitle({
  kicker,
  title,
  desc,
  light = false,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  desc?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <Kicker light={light}>{kicker}</Kicker>
      <h2
        className={`font-display mt-4 text-3xl leading-[1.08] font-semibold sm:text-4xl lg:text-[2.9rem] ${
          light ? "text-mist-50" : "text-pine-950"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 max-w-2xl text-[15px] leading-relaxed sm:text-base ${
            light ? "text-pine-200" : "text-ink-600"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- chip kecil ---------- */
export function Chip({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        gold
          ? "border-gold-400/50 bg-gold-400/10 text-gold-300"
          : "border-pine-200 bg-pine-50 text-pine-700"
      }`}
    >
      {children}
    </span>
  );
}

/* ---------- garis emas dekoratif ---------- */
export function GoldRule({ className = "w-16" }: { className?: string }) {
  return (
    <span className={`block h-[3px] rounded-full bg-gradient-to-r from-gold-500 to-gold-300 ${className}`} />
  );
}
