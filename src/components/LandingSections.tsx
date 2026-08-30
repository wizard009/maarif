import { useState, type FormEvent } from "react";
import { scrollToSection } from "../hooks";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClockIc,
  Compass,
  Field,
  Flask,
  Library,
  Mail,
  Mosque,
  Palette,
  Phone,
  Pin,
  Quran,
  SchoolMark,
  ScreenLearn,
  Star8,
} from "./icons";
import { IMG } from "./Landing";
import { Chip, Reveal, SectionTitle } from "./ui";

/* ============================= FASILITAS ============================= */
export function Facilities() {
  const items = [
    { icon: Library, title: "Perpustakaan Digital", desc: "Koleksi kitab, buku Cambridge, dan e-library dengan sistem peminjaman digital.", big: true },
    { icon: Flask, title: "Laboratorium Sains", desc: "Praktikum IPA dengan pendekatan inkuiri berstandar Cambridge Primary." },
    { icon: Mosque, title: "Masjid & Ruang Tahfidz", desc: "Pusat pembiasaan ibadah dan halaqah tahfidz bersanad." },
    { icon: ScreenLearn, title: "Smart Classroom", desc: "Setiap kelas dilengkapi proyektor, audio murottal, dan akses Google Classroom." },
    { icon: Field, title: "Lapangan Olahraga", desc: "Area luas untuk PJOK, futsal, panahan, dan kegiatan pramuka." },
    { icon: Palette, title: "Studio Seni & Budaya", desc: "Ruang ekspresi kaligrafi, nasyid, dan seni kriya Islami." },
  ];

  return (
    <section id="fasilitas" className="relative overflow-hidden bg-pine-950 py-24 text-mist-50 lg:py-32">
      <div className="bg-star-pattern absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,rgba(42,125,88,0.4),transparent_60%)]" />
      <Star8 size={260} className="anim-spin-slow absolute -bottom-20 -right-20 text-gold-400/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <SectionTitle
          light
          kicker="Fasilitas Madrasah"
          title={
            <>
              Ruang tumbuh yang <em className="text-gold-300 italic">menumbuhkan</em>.
            </>
          }
          desc="Lingkungan belajar yang dirancang menyatu antara kecanggihan teknologi dan ketenangan suasana pesantren."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal
              key={it.title}
              delay={i * 80}
              className={it.big ? "sm:col-span-2 lg:row-span-2" : ""}
            >
              <div
                className={`group relative h-full overflow-hidden rounded-2xl border border-pine-800 bg-pine-900/70 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-lift ${
                  it.big ? "flex min-h-[320px] flex-col justify-end lg:min-h-full" : ""
                }`}
              >
                {it.big && (
                  <img
                    src={IMG.library}
                    alt="Perpustakaan digital madrasah"
                    className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/20 to-transparent" />
                <div className="relative">
                  <span
                    className={`inline-flex items-center justify-center rounded-xl border border-gold-400/40 bg-pine-950/70 text-gold-300 backdrop-blur transition-all duration-500 group-hover:-rotate-6 group-hover:bg-gold-400 group-hover:text-pine-950 ${
                      it.big ? "h-14 w-14" : "h-12 w-12"
                    }`}
                  >
                    <it.icon size={it.big ? 28 : 24} />
                  </span>
                  <h3 className={`font-display mt-4 font-semibold ${it.big ? "text-2xl" : "text-lg"}`}>
                    {it.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed text-pine-200 ${it.big ? "max-w-md" : ""}`}>
                    {it.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= GALERI ============================= */
const GALERI = [
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700", cap: "Kegiatan Belajar Mengajar", tag: "Akademik" },
  { src: "https://images.pexels.com/photos/4840294/pexels-photo-4840294.jpeg?w=700", cap: "Program Tahfidz Mutqin", tag: "Al-Qur'an" },
  { src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700", cap: "Praktikum Sains", tag: "Laboratorium" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700", cap: "Seni & Budaya Islami", tag: "Ekspresi" },
  { src: "https://images.unsplash.com/photo-1700914299961-d8f91559d85d?w=700", cap: "Kegiatan Olahraga", tag: "Jasmani" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700", cap: "Kunjungan Edukatif", tag: "Outdoor" },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700", cap: "Perpustakaan Digital", tag: "Literasi" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700", cap: "Kegiatan Sosial", tag: "Kepedulian" },
];

export function Gallery() {
  return (
    <section id="galeri" className="bg-mist-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            kicker="Galeri Kegiatan"
            title={
              <>
                Potret keseharian <em className="text-pine-600 italic">para santri</em>.
              </>
            }
            desc="Dokumentasi aktivitas pembelajaran, ibadah, dan kebersamaan di lingkungan madrasah."
          />
          <Reveal delay={150}>
            <p className="font-display text-sm font-semibold text-ink-400 italic">
              8 bingkai &bull; Tahun Ajaran 2025/2026
            </p>
          </Reveal>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {GALERI.map((g, i) => (
            <Reveal key={g.cap} delay={(i % 4) * 90} className="mb-4 break-inside-avoid">
              <figure className="group relative cursor-pointer overflow-hidden rounded-xl shadow-card">
                <img
                  src={g.src}
                  alt={g.cap}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-pine-950/85 via-pine-950/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gold-300 uppercase">
                    {g.tag}
                  </span>
                  <span className="font-display mt-1 text-[15px] font-semibold text-mist-50">
                    {g.cap}
                  </span>
                </figcaption>
                <span className="absolute top-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-gold-400 text-pine-950 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </span>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= KISAH ISLAMI ============================= */
const KISAH = [
  {
    img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=900",
    tag: "Akhlak",
    title: "Kejujuran Pemuda Pembuat Tinta",
    excerpt: "Seorang pemuda miskin lebih mengutamakan kejujuran saat menjual tinta kepada Imam Malik — dan kejujuran itu membuka pintu ilmu seumur hidup.",
  },
  {
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900",
    tag: "Sains Islam",
    title: "Al-Khwarizmi: Fondasi Aljabar",
    excerpt: "Konsep angka nol dan aljabar lahir dari semangat meneliti pembagian waris dalam Al-Qur'an — bukti iman dan ilmu berjalan beriringan.",
  },
  {
    img: "https://images.unsplash.com/photo-1687193191982-2e3a19d7612f?w=900",
    tag: "Muamalah",
    title: "Strategi Sumur Ruma Utsman",
    excerpt: "Utsman bin Affan membeli sumur air untuk disedekahkan gratis kepada penduduk Madinah — filantropi yang mengalir hingga hari ini.",
  },
];

export function Stories() {
  return (
    <section id="kisah" className="relative overflow-hidden bg-mist-100 py-24 lg:py-32">
      <div className="bg-lattice absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            kicker="Khazanah Keteladanan"
            title={
              <>
                Kisah Islami <em className="text-pine-600 italic">inspiratif</em>.
              </>
            }
            desc="Sirah, sejarah sains Islam, dan muamalah yang menjadi bahan tadabbur mingguan para santri."
          />
          <Reveal delay={150}>
            <p className="hidden items-center gap-2 text-xs font-bold tracking-widest text-ink-400 uppercase sm:flex">
              Geser untuk menjelajah <ArrowRight size={16} className="text-gold-600" />
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto pb-6 [scrollbar-width:thin]">
        <div className="mx-auto flex max-w-7xl snap-x snap-mandatory gap-6 px-5 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {KISAH.map((k, i) => (
            <Reveal
              key={k.title}
              delay={i * 100}
              as="article"
              className="w-[300px] shrink-0 snap-start sm:w-[380px]"
            >
              <div className="group h-full overflow-hidden rounded-2xl border border-pine-200/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <img
                    src={k.img}
                    alt={k.title}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-pine-950/85 px-3 py-1 text-[10.5px] font-bold tracking-wider text-gold-300 uppercase backdrop-blur">
                    {k.tag}
                  </span>
                  <span className="font-display absolute -bottom-5 right-5 text-7xl leading-none font-bold text-white/85 italic transition-colors duration-500 group-hover:text-gold-300">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-6 pt-7">
                  <h3 className="font-display text-xl leading-snug font-semibold text-pine-950">
                    {k.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{k.excerpt}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-pine-600 uppercase">
                    <Quran size={15} className="text-gold-600" /> Refleksi Pekanan Santri
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= MANASIK ============================= */
const MANASIK = [
  { img: "https://images.pexels.com/photos/34922127/pexels-photo-34922127.jpeg?w=700", type: "Rukun", title: "Ihram & Miqat", desc: "Niat ibadah dimulai dari batas geografis miqat." },
  { img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=700", type: "Khusus Haji", title: "Wukuf di Arafah", desc: "Puncak ibadah pada 9 Dzulhijjah." },
  { img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=700", type: "Rukun", title: "Thawaf Ifadhah", desc: "Mengelilingi Ka'bah sebanyak 7 putaran." },
  { img: "https://images.pexels.com/photos/28902955/pexels-photo-28902955.jpeg?w=700", type: "Rukun", title: "Sa'i Shafa–Marwah", desc: "7 kali lintas meneladani perjuangan Hajar." },
  { img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700", type: "Tahallul", title: "Tahallul Akhir", desc: "Mencukur rambut sebagai tanda penyucian." },
];

export function Manasik() {
  return (
    <section className="bg-mist-50 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionTitle
          align="center"
          kicker="Kurikulum Fikih Ibadah"
          title={
            <>
              Panduan Manasik <em className="text-pine-600 italic">Haji &amp; Umroh</em>.
            </>
          }
          desc="Visualisasi tahapan ibadah di tanah suci yang dipraktikkan santri melalui manasik tahunan madrasah."
        />

        <div className="relative mt-16">
          <div className="absolute top-10 right-0 left-0 hidden h-px border-t-2 border-dashed border-pine-300/70 lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
            {MANASIK.map((m, i) => (
              <Reveal key={m.title} delay={i * 110}>
                <div className="group relative text-center">
                  <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-[3px] border-gold-400 shadow-card transition-transform duration-500 group-hover:scale-110">
                    <img src={m.img} alt={m.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <span className="font-display absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-pine-900 text-[13px] font-bold text-gold-300 shadow-card">
                    {i + 1}
                  </span>
                  <span className="mt-4 inline-block rounded-full border border-pine-200 bg-white px-3 py-0.5 text-[10px] font-bold tracking-wider text-pine-600 uppercase">
                    {m.type}
                  </span>
                  <h3 className="font-display mt-2.5 text-[17px] font-semibold text-pine-950">{m.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-[210px] text-[12.5px] leading-relaxed text-ink-600">
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= MITRA (MARQUEE) ============================= */
const MITRA = [
  "Cambridge Assessment International Education",
  "JSIT Indonesia",
  "Kementerian Agama RI",
  "BAN-S/M",
  "LP Ma'arif NU",
  "Synology Education",
];

export function Mitra() {
  const row = [...MITRA, ...MITRA];
  return (
    <section className="overflow-hidden border-y border-pine-800 bg-pine-950 py-7">
      <div className="marquee-track items-center gap-14">
        {row.map((m, i) => (
          <span key={`${m}-${i}`} className="flex shrink-0 items-center gap-14">
            <span className="font-display text-lg font-medium whitespace-nowrap text-pine-300 transition-colors hover:text-gold-300">
              {m}
            </span>
            <Star8 size={13} className="shrink-0 text-gold-500/70" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================= PPDB ============================= */
export function Ppdb() {
  const steps = [
    { t: "Pendaftaran Online", d: "2 Feb — 31 Mar 2026", desc: "Mengisi formulir digital dan mengunggah berkas melalui tautan resmi madrasah." },
    { t: "Observasi & Wawancara", d: "11 — 12 Apr 2026", desc: "Calon santri dan wali mengikuti observasi kesiapan belajar dan wawancara keluarga." },
    { t: "Pengumuman", d: "25 Apr 2026", desc: "Hasil seleksi diumumkan melalui portal dan pesan resmi kepada wali." },
    { t: "Daftar Ulang", d: "4 — 9 Mei 2026", desc: "Penetapan NIS, pengukuran seragam, dan orientasi wali santri baru." },
  ];

  return (
    <section id="ppdb" className="relative overflow-hidden bg-pine-900 py-24 text-mist-50 lg:py-28">
      <div className="bg-star-pattern absolute inset-0 opacity-[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_20%,rgba(201,149,44,0.18),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionTitle
            light
            kicker="PPDB Tahun Ajaran 2026/2027"
            title={
              <>
                Bergabunglah menjadi bagian dari{" "}
                <em className="text-gold-300 italic">keluarga besar madrasah</em>.
              </>
            }
            desc="Penerimaan santri baru kelas 1 dibuka untuk 4 rombongan belajar. Kuota terbatas demi menjaga kualitas pendampingan."
          />
          <Reveal delay={180}>
            <div className="mt-8">
              <p className="text-[11px] font-bold tracking-[0.25em] text-gold-300 uppercase">
                Persyaratan Berkas
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {["Akta Kelahiran", "Kartu Keluarga", "KIA / KTP Wali", "Ijazah RA/TK (jika ada)", "Pas Foto 3×4", "Surat Pernyataan Wali"].map((s) => (
                  <Chip key={s} gold>
                    <Check size={12} /> {s}
                  </Chip>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:mimada.tlogopucang02@gmail.com?subject=Pendaftaran%20PPDB%202026/2027"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-bold text-pine-950 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
              >
                <Mail size={16} /> Daftar via Email
              </a>
              <button
                onClick={() => scrollToSection("kontak")}
                className="inline-flex items-center gap-2 rounded-full border border-pine-500 px-7 py-3.5 text-sm font-bold text-pine-100 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                Hubungi Panitia
              </button>
            </div>
          </Reveal>
        </div>

        <div>
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="group relative flex gap-6 pb-9 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold-400 bg-pine-950 text-lg font-bold text-gold-300 transition-all duration-500 group-hover:bg-gold-400 group-hover:text-pine-950">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && <span className="mt-2 w-px flex-1 border-l border-dashed border-pine-600" />}
                </div>
                <div className="rounded-xl border border-pine-700/70 bg-pine-950/50 p-5 transition-all duration-500 group-hover:border-gold-400/50 group-hover:bg-pine-950/80">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                    <span className="text-[11.5px] font-bold tracking-wider text-gold-400 uppercase">
                      {s.d}
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-pine-200">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= KONTAK ============================= */
export function Kontak() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const info = [
    { icon: Pin, label: "Alamat Sekolah", value: "Tlogopucang Utara RT 04 RW 06, Desa Tlogopucang, Kec. Kandangan, Kab. Temanggung, Jawa Tengah 56254" },
    { icon: Mail, label: "Surel Resmi", value: "mimada.tlogopucang02@gmail.com" },
    { icon: Phone, label: "Telepon Madrasah", value: "(0293) 555-0204" },
    { icon: ClockIc, label: "Jam Layanan", value: "Senin – Jumat, 07.00 – 15.00 WIB" },
  ];

  return (
    <section id="kontak" className="relative bg-mist-50 py-24 lg:py-32">
      <div className="bg-lattice absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionTitle
            kicker="Hubungi Kami"
            title={
              <>
                Kami siap menjawab <em className="text-pine-600 italic">pertanyaan Anda</em>.
              </>
            }
            desc="Kunjungi madrasah kami di kaki Gunung Sindoro, atau sampaikan pertanyaan melalui formulir di samping."
          />
          <div className="mt-10 space-y-4">
            {info.map((it, i) => (
              <Reveal key={it.label} delay={i * 80}>
                <div className="group flex items-start gap-4 rounded-xl border border-mist-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-pine-900 text-gold-300 transition-transform duration-300 group-hover:-rotate-6">
                    <it.icon size={20} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">
                      {it.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed font-semibold text-pine-950">{it.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={360}>
            <a
              href="https://www.google.com/maps?q=Tlogopucang,+Kandangan,+Temanggung,+Jawa+Tengah"
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-xl border-2 border-dashed border-pine-300 bg-pine-50 px-6 py-4 text-sm font-bold text-pine-700 transition-all duration-300 hover:border-pine-500 hover:bg-pine-100"
            >
              <Compass size={19} className="text-gold-600 transition-transform duration-500 group-hover:rotate-45" />
              Buka peta lokasi di Google Maps
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative overflow-hidden rounded-2xl bg-pine-950 p-8 shadow-lift sm:p-10">
            <div className="bg-star-pattern absolute inset-0 opacity-[0.08]" />
            <div className="relative">
              {sent ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400 text-pine-950">
                    <Check size={38} />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-semibold text-mist-50">
                    Jazakumullah khairan!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-pine-200">
                    Pesan Anda telah kami terima. Tim tata usaha akan menghubungi Anda melalui
                    surel atau WhatsApp dalam 1&times;24 jam kerja.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-pine-600 px-6 py-3 text-sm font-bold text-pine-100 transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <p className="font-arabic text-xl text-gold-300">أَهْلًا وَسَهْلًا</p>
                    <h3 className="font-display mt-1.5 text-2xl font-semibold text-mist-50">
                      Kirim Pesan
                    </h3>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                        Nama Wali
                      </span>
                      <input
                        required
                        placeholder="cth. Bapak Abdullah"
                        className="w-full rounded-lg border border-pine-700 bg-pine-900/80 px-4 py-3 text-sm text-mist-50 placeholder-pine-500 transition-colors focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                        WhatsApp / Surel
                      </span>
                      <input
                        required
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full rounded-lg border border-pine-700 bg-pine-900/80 px-4 py-3 text-sm text-mist-50 placeholder-pine-500 transition-colors focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                      Pesan
                    </span>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tulis pertanyaan seputar PPDB, program, atau biaya pendidikan…"
                      className="w-full resize-none rounded-lg border border-pine-700 bg-pine-900/80 px-4 py-3 text-sm text-mist-50 placeholder-pine-500 transition-colors focus:border-gold-400 focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-bold text-pine-950 transition-all duration-300 hover:bg-gold-300 sm:w-auto"
                  >
                    Kirim Pesan
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================= FOOTER ============================= */
export function Footer({ onPortal }: { onPortal: () => void }) {
  const nav = [
    { id: "profil", label: "Profil Madrasah" },
    { id: "program", label: "Program Unggulan" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "galeri", label: "Galeri Kegiatan" },
    { id: "ppdb", label: "PPDB 2026/2027" },
  ];

  return (
    <footer className="relative overflow-hidden bg-pine-950 text-pine-200">
      <div className="bg-star-pattern absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <SchoolMark className="h-12 w-12" />
              <div>
                <p className="font-display text-lg leading-tight font-semibold text-mist-50">
                  MI Ma&rsquo;arif 2 Tlogopucang
                </p>
                <p className="text-[10.5px] font-bold tracking-[0.22em] text-gold-300 uppercase">
                  Rabbani &bull; Visioner &bull; Internasional
                </p>
              </div>
            </div>
            <p className="font-arabic mt-5 text-xl text-gold-300/90">
              رَبَّانِيٌّ · رُؤْيَوِيٌّ · عَالَمِيٌّ
            </p>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-pine-300">
              Madrasah Ibtidaiyah di bawah naungan LP Ma&rsquo;arif NU yang memadukan Cambridge
              Primary, tahfidz mutqin, dan pembentukan karakter Islami.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold-400 uppercase">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToSection(n.id)}
                    className="link-slide text-[13.5px] font-semibold text-pine-200 hover:text-gold-300"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold-400 uppercase">
              Sistem Digital
            </p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] font-semibold">
              <li>
                <button onClick={onPortal} className="link-slide inline-flex items-center gap-2 text-pine-200 hover:text-gold-300">
                  <Star8 size={13} className="text-gold-500" /> Portal Guru &mdash; Administrasi Penilaian
                </button>
              </li>
              <li className="text-pine-400">Dashboard Wali Murid</li>
              <li className="text-pine-400">Dashboard Kepala Madrasah</li>
              <li className="text-pine-400">Cloud Infrastructure Console</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold-400 uppercase">Kontak</p>
            <ul className="mt-4 space-y-3 text-[13px] leading-relaxed">
              <li className="flex gap-2.5">
                <Pin size={15} className="mt-0.5 shrink-0 text-gold-500" />
                Tlogopucang Utara RT 04 RW 06, Kandangan, Temanggung, Jawa Tengah 56254
              </li>
              <li className="flex gap-2.5">
                <Mail size={15} className="mt-0.5 shrink-0 text-gold-500" />
                mimada.tlogopucang02@gmail.com
              </li>
              <li className="flex gap-2.5">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold-500" />
                (0293) 555-0204
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-pine-800 pt-7 sm:flex-row">
          <p className="text-xs text-pine-400">
            &copy; 2026 MI Ma&rsquo;arif 2 Tlogopucang &bull; LP Ma&rsquo;arif NU Kab. Temanggung
          </p>
          <p className="flex items-center gap-2 text-xs text-pine-400">
            <Star8 size={12} className="text-gold-500" />
            Terakreditasi A &bull; Cambridge Primary &bull; JSIT Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
