import { useState } from "react";
import {
  formatHijriah,
  formatJam,
  scrollToSection,
  useCountUp,
  useNow,
  useReveal,
  useScrolled,
} from "../hooks";
import {
  ArrowRight,
  Cambridge,
  Chalkboard,
  Close,
  CloudSync,
  Mail,
  Medal,
  Menu,
  Phone,
  Quran,
  SchoolMark,
  ShieldCrescent,
  Star8,
} from "./icons";
import { Chip, GoldRule, Kicker, Reveal, SectionTitle } from "./ui";
import { Facilities, Footer, Gallery, Kontak, Manasik, Mitra, Ppdb, Stories } from "./LandingSections";

export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/0aec3c5a-e4f2-4ca2-aa7b-50fb8d9002ae/_result.png",
  tahfidz: "https://image.qwenlm.ai/generated-images/aca91255-0fde-45b2-bae4-c7aeef9c0fb0/_result.png",
  library: "https://image.qwenlm.ai/generated-images/df564d8f-90f7-47f6-9c25-247e912e2505/_result.png",
};

const NAV_LINKS = [
  { id: "profil", label: "Profil" },
  { id: "program", label: "Program" },
  { id: "fasilitas", label: "Fasilitas" },
  { id: "galeri", label: "Galeri" },
  { id: "kisah", label: "Kisah Islami" },
  { id: "kontak", label: "Kontak" },
];

/* ============================= TOPBAR ============================= */
function TopBar() {
  const now = useNow(1000);
  return (
    <div className="relative z-40 hidden border-b border-gold-400/15 bg-pine-950 text-[11.5px] font-medium text-pine-200 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2">
        <div className="flex items-center gap-5">
          <a
            href="mailto:mimada.tlogopucang02@gmail.com"
            className="link-slide inline-flex items-center gap-1.5 hover:text-gold-300"
          >
            <Mail size={13} className="text-gold-400" /> mimada.tlogopucang02@gmail.com
          </a>
          <span className="inline-flex items-center gap-1.5">
            <Phone size={13} className="text-gold-400" /> (0293) 555-0204
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <Star8 size={13} className="text-gold-400" />
            {formatHijriah(now)} H
          </span>
          <span className="h-3 w-px bg-pine-700" />
          <span className="font-semibold tabular-nums text-gold-300">
            {formatJam(now)} <span className="font-medium text-pine-300">WIB</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================= NAVBAR ============================= */
function Navbar({ onPortal }: { onPortal: () => void }) {
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-400/15 bg-pine-950/92 shadow-lift backdrop-blur-md"
          : "border-b border-transparent bg-pine-950/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3 text-left"
          aria-label="Ke atas"
        >
          <SchoolMark className="h-11 w-11 transition-transform duration-500 group-hover:rotate-45" />
          <span>
            <span className="font-display block text-[17px] leading-tight font-semibold text-mist-50">
              MI Ma&rsquo;arif 2
            </span>
            <span className="block text-[10.5px] font-bold tracking-[0.22em] text-gold-300 uppercase">
              Tlogopucang
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="link-slide text-[13.5px] font-semibold text-pine-100 hover:text-gold-300"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onPortal}
            className="group hidden items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-[13px] font-bold text-pine-950 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 sm:inline-flex"
          >
            Portal Guru
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pine-700 text-pine-100 lg:hidden"
            aria-label="Menu"
          >
            {open ? <Close size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <div
        className={`grid overflow-hidden transition-all duration-500 lg:hidden ${
          open ? "grid-rows-[1fr] border-t border-pine-800" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden bg-pine-950/97">
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="flex items-center justify-between border-b border-pine-800/70 py-3.5 text-left text-[15px] font-semibold text-pine-100 last:border-none hover:text-gold-300"
              >
                <span>{l.label}</span>
                <span className="font-display text-xs text-gold-500 italic">0{i + 1}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onPortal();
              }}
              className="mt-4 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-bold text-pine-950"
            >
              Buka Portal Guru <ArrowRight size={15} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ============================= HERO ============================= */
function Hero({ onPortal }: { onPortal: () => void }) {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-mist-50">
      {/* lapisan ambient */}
      <div className="bg-star-pattern absolute inset-0 opacity-[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(75%_65%_at_70%_20%,rgba(42,125,88,0.5),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_10%_90%,rgba(201,149,44,0.16),transparent_60%)]" />
      <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.05]" />
      <Star8 size={340} className="anim-spin-slow absolute -top-24 -right-24 text-gold-400/10" />
      <Star8 size={200} className="anim-spin-slow absolute -bottom-16 -left-16 text-pine-500/15 [animation-direction:reverse]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pt-14 pb-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pt-20">
        {/* kiri */}
        <div>
          <Reveal>
            <p className="font-arabic text-2xl leading-relaxed text-gold-300 sm:text-[27px]">
              رَبَّانِيٌّ · رُؤْيَوِيٌّ · عَالَمِيٌّ
            </p>
          </Reveal>

          <h1 className="font-display mt-5 text-[2.55rem] leading-[1.04] font-semibold tracking-tight sm:text-6xl lg:text-[4.15rem]">
            <span className="mask-line" style={{ "--lm-delay": "80ms" } as React.CSSProperties}>
              <span>Mendidik Generasi</span>
            </span>
            <span className="mask-line" style={{ "--lm-delay": "220ms" } as React.CSSProperties}>
              <span>
                <em className="text-gold-300 italic">Rabbani</em> Berstandar
              </span>
            </span>
            <span className="mask-line" style={{ "--lm-delay": "360ms" } as React.CSSProperties}>
              <span>Internasional.</span>
            </span>
          </h1>

          <Reveal delay={250}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-pine-200 sm:text-base">
              MI Ma&rsquo;arif 2 Tlogopucang memadukan kerangka asesmen{" "}
              <strong className="font-semibold text-mist-50">Cambridge Primary</strong> dengan pilar
              pembentukan karakter Sekolah Islam Terpadu &mdash; mencetak innovator Muslim masa depan
              yang mutqin dalam hafalan dan kokoh dalam adab.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection("profil")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-bold text-pine-950 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
              >
                Jelajahi Madrasah
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
              <button
                onClick={onPortal}
                className="group inline-flex items-center gap-2.5 rounded-full border border-pine-500 px-7 py-3.5 text-sm font-bold text-pine-100 transition-all duration-300 hover:border-gold-400 hover:bg-pine-900 hover:text-gold-300"
              >
                <Chalkboard size={17} className="text-gold-400" />
                Sistem Penilaian
              </button>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              <Chip gold>Cambridge Primary</Chip>
              <Chip gold>JSIT Indonesia</Chip>
              <Chip gold>Akreditasi A &bull; Unggul</Chip>
            </div>
          </Reveal>
        </div>

        {/* kanan — komposisi visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Reveal delay={200}>
            <div className="relative">
              {/* bingkai emas offset */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[11rem_11rem_1.1rem_1.1rem] border border-gold-400/40" />
              <div className="arch relative overflow-hidden border-[3px] border-pine-800 shadow-lift">
                <img
                  src={IMG.hero}
                  alt="Suasana belajar di kelas MI Ma'arif 2 Tlogopucang"
                  className="anim-kenburns h-[420px] w-full object-cover sm:h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-pine-950/10" />
                <div className="absolute right-5 bottom-5 left-5">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-gold-300 uppercase">
                    Kegiatan Belajar Mengajar
                  </p>
                  <p className="font-display mt-1 text-lg font-medium text-mist-50">
                    Kelas interaktif berstandar Cambridge
                  </p>
                </div>
              </div>

              {/* kartu mengambang: Cambridge */}
              <div className="anim-float absolute -left-3 top-[16%] w-[210px] rounded-xl border border-pine-700 bg-pine-900/95 p-4 shadow-lift backdrop-blur sm:-left-10">
                <div className="flex items-center gap-2">
                  <Cambridge size={17} className="text-gold-400" />
                  <p className="text-[10.5px] font-bold tracking-wider text-pine-300 uppercase">
                    Cambridge Checkpoint
                  </p>
                </div>
                <p className="font-display mt-2 text-2xl font-semibold text-mist-50">Band 5</p>
                <div className="mt-2 space-y-1.5">
                  {[
                    ["Mathematics", 92],
                    ["Science", 91],
                    ["English", 85],
                  ].map(([n, v]) => (
                    <div key={n as string} className="flex items-center gap-2">
                      <span className="w-20 text-[10.5px] font-semibold text-pine-300">{n}</span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-pine-800">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                          style={{ width: `${v}%` }}
                        />
                      </span>
                      <span className="text-[10.5px] font-bold text-gold-300 tabular-nums">{v}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* kartu mengambang: tahfidz */}
              <div className="anim-float-late absolute -right-2 bottom-[14%] flex w-[196px] items-center gap-3 rounded-xl border border-pine-700 bg-pine-900/95 p-3.5 shadow-lift backdrop-blur sm:-right-8">
                <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#174e38" strokeWidth="4" />
                  <circle
                    cx="22" cy="22" r="18" fill="none" stroke="#ddb048" strokeWidth="4"
                    strokeLinecap="round" strokeDasharray="113" strokeDashoffset="68"
                  />
                </svg>
                <div>
                  <p className="font-display text-lg leading-none font-semibold text-mist-50">2 Juz</p>
                  <p className="mt-1 text-[10.5px] leading-snug font-semibold text-pine-300">
                    Hafalan Mutqin
                    <br />
                    <span className="text-gold-300">Target 5 Juz</span>
                  </p>
                </div>
              </div>

              {/* lencana akreditasi */}
              <div className="absolute -top-5 right-6 flex h-[74px] w-[74px] rotate-12 items-center justify-center rounded-full border-2 border-gold-400 bg-pine-950 shadow-lift transition-transform duration-500 hover:rotate-0">
                <div className="text-center">
                  <Medal size={18} className="mx-auto text-gold-400" />
                  <p className="font-display mt-0.5 text-sm leading-none font-bold text-gold-300">A</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================= STATISTIK ============================= */
function StatItem({
  value,
  suffix,
  label,
  note,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  start: boolean;
}) {
  const n = useCountUp(value, start);
  return (
    <div className="group relative px-2 py-8 text-center sm:py-10">
      <p className="font-display text-4xl font-semibold text-pine-950 tabular-nums sm:text-5xl">
        {n}
        <span className="text-gold-600">{suffix}</span>
      </p>
      <p className="mt-2 text-[13px] font-bold tracking-wide text-pine-800 uppercase">{label}</p>
      <p className="mt-1 text-xs font-medium text-ink-400">{note}</p>
      <span className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gold-500 transition-all duration-500 group-hover:w-1/2" />
    </div>
  );
}

function StatsBand() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);
  return (
    <section className="relative border-y-2 border-gold-500/60 bg-gold-100">
      <div className="bg-lattice absolute inset-0 opacity-[0.06]" />
      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl grid-cols-2 divide-x divide-gold-500/25 px-4 lg:grid-cols-4"
      >
        <StatItem value={500} suffix="+" label="Siswa Aktif" note="Kelas 1 – 6, putra & putri" start={inView} />
        <StatItem value={35} suffix="" label="Guru Tersertifikasi" note="S1 & bersanad tahfidz" start={inView} />
        <StatItem value={98} suffix="%" label="Tingkat Kelulusan" note="Lanjut ke SMP/MTs unggulan" start={inView} />
        <div className="relative px-2 py-8 text-center sm:py-10">
          <p className="font-display text-4xl font-semibold text-pine-950 sm:text-5xl">A</p>
          <p className="mt-2 text-[13px] font-bold tracking-wide text-pine-800 uppercase">Akreditasi Unggul</p>
          <p className="mt-1 text-xs font-medium text-ink-400">BAN-S/M &bull; Cambridge Primary</p>
          <span className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-pine-700 transition-all duration-500 group-hover:w-1/2" />
        </div>
      </div>
    </section>
  );
}

/* ============================= PROFIL ============================= */
function About() {
  const pillars = [
    {
      icon: ShieldCrescent,
      title: "Akreditasi A (Unggul)",
      desc: "Terakreditasi BAN-S/M dengan penjaminan mutu berlapis dan standar asesmen internasional Cambridge Primary.",
    },
    {
      icon: Quran,
      title: "Program Tahfidz Mutqin",
      desc: "Target hafalan 2–3 juz per tahun dengan metode sabaq–sabqi–manzil yang terstruktur, bersanad, dan bermakna.",
    },
    {
      icon: Cambridge,
      title: "Cambridge Primary",
      desc: "Kurikulum internasional dengan asesmen Knowledge, Application, dan Reasoning pada Mathematics, Science, dan English.",
    },
  ];

  return (
    <section id="profil" className="relative overflow-hidden bg-mist-50 py-24 lg:py-32">
      <div className="bg-lattice absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* kiri — sticky */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle
            kicker="Profil Madrasah"
            title={
              <>
                Ketegasan akademik kelas dunia,{" "}
                <em className="text-pine-600 italic">berakar pada nilai Islam.</em>
              </>
            }
          />
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600">
              Berkhidmat di Desa Tlogopucang, Kecamatan Kandangan, Kabupaten Temanggung, MI
              Ma&rsquo;arif 2 tumbuh sebagai madrasah yang memadukan parameter asesmen struktural
              Kerangka Kerja Cambridge Primary dengan pilar pembentukan karakter SIT.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600">
              Setiap santri dibimbing untuk menguasai kompetensi global tanpa kehilangan akar
              keislaman &mdash; dari halaqah tahfidz pagi hingga laboratorium sains sore.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="relative mt-9 overflow-hidden rounded-2xl bg-pine-900 p-7 text-mist-50 shadow-lift">
              <div className="bg-star-pattern absolute inset-0 opacity-[0.08]" />
              <div className="relative">
                <p className="text-[11px] font-bold tracking-[0.25em] text-gold-300 uppercase">Visi</p>
                <p className="font-display mt-2.5 text-lg leading-snug font-medium">
                  &ldquo;Terwujudnya generasi Rabbani yang visioner dan berstandar internasional.&rdquo;
                </p>
                <GoldRule className="mt-5 w-14" />
                <p className="mt-5 text-[11px] font-bold tracking-[0.25em] text-gold-300 uppercase">Misi</p>
                <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-pine-100">
                  {[
                    "Menyelenggarakan pembelajaran Cambridge Primary yang terukur dan berpusat pada santri.",
                    "Mencetak hafidz mutqin dengan sanad keilmuan yang jelas dan akhlak mulia.",
                    "Mengintegrasikan teknologi digital dalam pembelajaran dan tata kelola madrasah.",
                  ].map((m) => (
                    <li key={m} className="flex gap-2.5">
                      <Star8 size={13} className="mt-1 shrink-0 text-gold-400" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* kanan */}
        <div>
          <Reveal>
            <div className="relative">
              <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[6rem_6rem_0.9rem_0.9rem] border border-pine-300" />
              <div className="arch-sm relative overflow-hidden shadow-lift">
                <img
                  src={IMG.tahfidz}
                  alt="Halaqah tahfidz Al-Qur'an"
                  className="anim-kenburns h-[340px] w-full object-cover sm:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <p className="font-arabic text-xl text-gold-300">حَلْقَةُ التَّحْفِيظِ</p>
                  <p className="mt-1 text-sm font-semibold text-mist-50">
                    Halaqah Tahfidz &mdash; metode Sabaq, Sabqi &amp; Manzil
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <div className="group flex gap-5 border-b border-mist-200 py-7 transition-colors duration-300 last:border-none hover:bg-mist-100/70 sm:gap-7 sm:px-5">
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-pine-200 bg-white text-pine-600 shadow-card transition-all duration-300 group-hover:-rotate-6 group-hover:border-gold-400 group-hover:bg-pine-900 group-hover:text-gold-300">
                    <p.icon size={24} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-gold-600 italic">0{i + 1}</span>
                      <h3 className="font-display text-xl font-semibold text-pine-950 sm:text-[22px]">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= PROGRAM ============================= */
function Programs() {
  const items = [
    {
      icon: Cambridge,
      title: "Cambridge Primary Programme",
      desc: "Kurikulum internasional dengan asesmen global pada Mathematics, Science, dan English — diakhiri Cambridge Primary Checkpoint.",
      chips: ["Checkpoint Global", "Band 1–6", "Asesmen Trimester"],
    },
    {
      icon: Quran,
      title: "Program Tahfidz Mutqin",
      desc: "Hafalan terstruktur dengan penekanan pemahaman makna, muraja'ah harian, dan setoran bersanad kepada musyrif tahfidz.",
      chips: ["2–3 Juz / Tahun", "Bersanad", "Mutaba'ah Yaumiyah"],
    },
    {
      icon: CloudSync,
      title: "Digital Learning Integration",
      desc: "Google Classroom, Synology Cloud, dan portal akademik digital — nilai, rapor, dan materi tersinkron real-time.",
      chips: ["Google Classroom", "Synology NAS", "Portal Nilai Real-time"],
    },
    {
      icon: ShieldCrescent,
      title: "Pembentukan Karakter Islami",
      desc: "Integrasi nilai Islam dalam setiap aspek pembelajaran: adab, shalat berjamaah, dan pembinaan akhlak berbasis keteladanan.",
      chips: ["Sekolah Islam Terpadu", "Pembiasaan Ibadah", "Birrul Walidain"],
    },
  ];

  return (
    <section id="program" className="relative bg-mist-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            kicker="Program Unggulan"
            title={
              <>
                Kurikulum untuk pertumbuhan <em className="text-pine-600 italic">holistik</em> santri.
              </>
            }
            desc="Empat pilar program yang saling mengunci: kompetensi global, kedalaman Al-Qur'an, kecakapan digital, dan keluhuran akhlak."
          />
          <Reveal delay={200} className="hidden lg:block">
            <p className="font-display text-[80px] leading-none font-bold text-pine-200/70 italic">04</p>
          </Reveal>
        </div>

        <div className="mt-14">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90}>
              <div className="group relative grid cursor-default gap-5 border-t border-pine-200/80 px-2 py-8 transition-all duration-500 last:border-b hover:bg-pine-900 sm:grid-cols-[70px_56px_1fr_auto] sm:items-center sm:gap-7 sm:px-6 lg:px-8">
                <span className="font-display text-3xl font-semibold text-pine-300 italic transition-colors duration-500 group-hover:text-gold-400 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hidden h-14 w-14 items-center justify-center rounded-xl border border-pine-200 bg-white text-pine-600 transition-all duration-500 group-hover:rotate-6 group-hover:border-gold-400/50 group-hover:bg-pine-800 group-hover:text-gold-300 sm:flex">
                  <it.icon size={26} />
                </span>
                <div>
                  <h3 className="font-display text-[22px] font-semibold text-pine-950 transition-colors duration-500 group-hover:text-mist-50 sm:text-2xl">
                    {it.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 transition-colors duration-500 group-hover:text-pine-200">
                    {it.desc}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {it.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-pine-200 bg-white/60 px-3 py-1 text-[11px] font-bold text-pine-700 transition-colors duration-500 group-hover:border-pine-600 group-hover:bg-pine-800 group-hover:text-gold-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight
                  size={26}
                  className="hidden text-pine-300 transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold-400 lg:block"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= LANDING UTAMA ============================= */
export default function Landing({ onPortal }: { onPortal: () => void }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar onPortal={onPortal} />
      <Hero onPortal={onPortal} />
      <StatsBand />
      <About />
      <Programs />
      <Facilities />
      <Gallery />
      <Stories />
      <Manasik />
      <Mitra />
      <Ppdb />
      <Kontak />
      <Footer onPortal={onPortal} />
    </div>
  );
}
