import { useEffect, useMemo, useState } from "react";
import { useDB, storeMode } from "../lib/store";
import {
  CLASSES,
  SUBJECTS,
  SEMESTERS,
  TAHUN_AJARAN,
  addStudent,
  computeNA,
  gradeFor,
  predikat,
  predikatLabel,
  removeStudent,
  resetDemoData,
  saveGrades,
  timeAgo,
  updateStudent,
  type GradeCategory,
  type Student,
} from "../lib/store";
import {
  ArrowRight,
  Chalkboard,
  ChartUp,
  Check,
  Close,
  Database,
  Graduate,
  GridBoard,
  Logout,
  Medal,
  PenEdit,
  Plus,
  Printer,
  Quran,
  SaveDisk,
  SchoolMark,
  Search,
  Star8,
  Trash,
} from "./icons";

/* ============================ Sesi guru ============================ */

interface Teacher {
  name: string;
  role: string;
}

const TEACHER_KEY = "mimada_teacher_session";

function readTeacher(): Teacher | null {
  try {
    const raw = sessionStorage.getItem(TEACHER_KEY);
    return raw ? (JSON.parse(raw) as Teacher) : null;
  } catch {
    return null;
  }
}

const ROLES = ["Guru Kelas", "Guru Mata Pelajaran", "Wali Kelas", "Kepala Madrasah", "Operator Akademik"];

/* ============================ Toast ============================ */

interface ToastMsg {
  id: number;
  text: string;
  kind: "success" | "info" | "danger";
}

function useToast() {
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const show = (text: string, kind: ToastMsg["kind"] = "success") => {
    setToast({ id: Date.now(), text, kind });
  };
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  return { toast, show };
}

function ToastView({ toast }: { toast: ToastMsg | null }) {
  if (!toast) return null;
  const palette =
    toast.kind === "success"
      ? "border-gold-400/60 bg-pine-900 text-mist-50"
      : toast.kind === "danger"
        ? "border-red-400/60 bg-pine-950 text-red-200"
        : "border-pine-500 bg-pine-950 text-pine-100";
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4 print-hide">
      <div
        key={toast.id}
        className={`anim-toast flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-semibold shadow-lift ${palette}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 text-pine-950">
          {toast.kind === "danger" ? <Close size={13} /> : <Check size={13} />}
        </span>
        {toast.text}
      </div>
    </div>
  );
}

/* ============================ Login ============================ */

function LoginView({ onLogin }: { onLogin: (t: Teacher) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES[2]);
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (name.trim().length < 3) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    onLogin({ name: name.trim(), role });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-pine-950 px-5 py-16">
      <div className="bg-star-pattern absolute inset-0 opacity-[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_0%,rgba(42,125,88,0.5),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_90%_100%,rgba(201,149,44,0.15),transparent_60%)]" />
      <Star8 size={300} className="anim-spin-slow absolute -top-20 -left-20 text-gold-400/10" />
      <Star8 size={220} className="anim-spin-slow absolute -right-16 -bottom-16 text-pine-500/15 [animation-direction:reverse]" />

      <div
        className={`relative w-full max-w-md transition-transform duration-300 ${shake ? "translate-x-1.5" : ""}`}
      >
        <div className="overflow-hidden rounded-2xl border border-pine-800 bg-pine-900/85 shadow-lift backdrop-blur">
          <div className="border-b border-pine-800 bg-pine-950/60 px-8 pt-9 pb-7 text-center">
            <SchoolMark className="mx-auto h-16 w-16" />
            <p className="font-arabic mt-4 text-xl text-gold-300">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            <h1 className="font-display mt-2 text-2xl font-semibold text-mist-50">
              Portal Guru &amp; Administrasi Penilaian
            </h1>
            <p className="mt-1.5 text-[12.5px] font-semibold tracking-wide text-pine-300">
              MI Ma&rsquo;arif 2 Tlogopucang &bull; Tahun Ajaran {TAHUN_AJARAN}
            </p>
          </div>

          <div className="space-y-5 px-8 py-8">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                Nama Lengkap &amp; Gelar
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="cth. Ustadzah Fatimah, S.Pd.I"
                className="w-full rounded-lg border border-pine-700 bg-pine-950/70 px-4 py-3 text-sm text-mist-50 placeholder-pine-600 transition-colors focus:border-gold-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                Peran / Jabatan
              </span>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-pine-700 bg-pine-950/70 px-4 py-3 text-sm font-semibold text-mist-50 transition-colors focus:border-gold-400 focus:outline-none"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r} className="bg-pine-950">
                      {r}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gold-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </div>
            </label>
            <button
              onClick={submit}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-pine-950 transition-all duration-300 hover:bg-gold-300"
            >
              Masuk ke Konsol Penilaian
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[11.5px] leading-relaxed text-pine-400">
              Akses internal dewan guru. Data penilaian tersinkron ke{" "}
              <span className="font-bold text-gold-400">
                {storeMode === "cloud" ? "Cloud Firestore" : "Mode Lokal (demo)"}
              </span>
              .
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const t: Teacher = { name: "Ustadzah Fatimah, S.Pd.I", role: "Wali Kelas 4-A" };
            onLogin(t);
          }}
          className="link-slide mx-auto mt-6 flex items-center gap-2 text-[12.5px] font-bold text-pine-300 hover:text-gold-300"
        >
          <Star8 size={13} className="text-gold-500" />
          Masuk cepat sebagai Ustadzah Fatimah (demo)
        </button>
        <a href="#/" className="mx-auto mt-3 block text-center text-[12px] font-semibold text-pine-500 hover:text-pine-300">
          &larr; Kembali ke beranda publik
        </a>
      </div>
    </div>
  );
}

/* ============================ Shell ============================ */

type Tab = "dasbor" | "nilai" | "siswa" | "rapor";

const TABS: { id: Tab; label: string; icon: typeof GridBoard }[] = [
  { id: "dasbor", label: "Dasbor", icon: GridBoard },
  { id: "nilai", label: "Input Nilai", icon: Chalkboard },
  { id: "siswa", label: "Data Siswa", icon: Graduate },
  { id: "rapor", label: "Rapor Siswa", icon: Medal },
];

/* ============================ Dasbor ============================ */

function Dasbor({ onGo, show }: { onGo: (t: Tab) => void; show: (t: string, k?: ToastMsg["kind"]) => void }) {
  const db = useDB();

  const avgAll = useMemo(() => {
    if (db.grades.length === 0) return 0;
    return Math.round(db.grades.reduce((a, g) => a + g.score, 0) / db.grades.length);
  }, [db.grades]);

  const tuntas = useMemo(() => {
    if (db.grades.length === 0) return 0;
    return Math.round((db.grades.filter((g) => g.score >= 75).length / db.grades.length) * 100);
  }, [db.grades]);

  const subjectAvg = useMemo(
    () =>
      SUBJECTS.map((s) => {
        const gs = db.grades.filter((g) => g.subject === s.name);
        return {
          name: s.name,
          avg: gs.length ? Math.round(gs.reduce((a, g) => a + g.score, 0) / gs.length) : 0,
          n: gs.length,
        };
      }),
    [db.grades]
  );

  const kelasDist = useMemo(
    () => CLASSES.map((k) => ({ k, n: db.students.filter((s) => s.kelas === k).length })),
    [db.students]
  );

  const stats = [
    { icon: Graduate, label: "Siswa Aktif", value: String(db.students.length), note: "8 rombongan belajar" },
    { icon: SaveDisk, label: "Nilai Tercatat", value: String(db.grades.length), note: "pengetahuan + keterampilan" },
    { icon: ChartUp, label: "Rata-rata Madrasah", value: `${avgAll}`, note: "skala 0–100" },
    { icon: Medal, label: "Ketuntasan", value: `${tuntas}%`, note: "KKM 75" },
  ];

  return (
    <div className="space-y-8">
      {/* kartu statistik */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-xl border border-pine-200/80 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-pine-50 transition-colors duration-300 group-hover:bg-gold-100" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-pine-900 text-gold-300 transition-transform duration-300 group-hover:-rotate-6">
              <s.icon size={21} />
            </span>
            <p className="font-display relative mt-4 text-[32px] leading-none font-semibold text-pine-950 tabular-nums">
              {s.value}
            </p>
            <p className="relative mt-1.5 text-[12.5px] font-bold text-pine-800">{s.label}</p>
            <p className="relative text-[11.5px] font-medium text-ink-400">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* grafik rata-rata per mapel */}
        <div className="rounded-xl border border-pine-200/80 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-pine-950">
                Rata-rata per Mata Pelajaran
              </h3>
              <p className="text-xs font-semibold text-ink-400">
                Agregat seluruh kelas &bull; Semester 1 &bull; {TAHUN_AJARAN}
              </p>
            </div>
            <span className="rounded-full bg-pine-900 px-3.5 py-1.5 text-[11px] font-bold text-gold-300">
              LIVE DATA
            </span>
          </div>
          <div className="mt-7 flex h-48 items-end gap-3 sm:gap-4">
            {subjectAvg.map((s) => (
              <div key={s.name} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[11px] font-bold text-pine-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 tabular-nums">
                  {s.avg || "—"}
                </span>
                <div
                  className="w-full max-w-12 rounded-t-md bg-gradient-to-t from-pine-700 to-pine-500 transition-all duration-700 group-hover:from-gold-600 group-hover:to-gold-400"
                  style={{ height: `${Math.max(4, s.avg)}%` }}
                />
                <span className="w-full truncate text-center text-[10px] font-bold text-ink-400">
                  {s.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-mist-200 pt-5">
            <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">
              Distribusi Siswa per Rombel
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {kelasDist.map((k) => (
                <span
                  key={k.k}
                  className="inline-flex items-center gap-1.5 rounded-full border border-pine-200 bg-mist-50 px-3 py-1 text-[11.5px] font-bold text-pine-700"
                >
                  {k.k}
                  <span className="rounded-full bg-pine-900 px-1.5 py-0.5 text-[10px] text-gold-300 tabular-nums">
                    {k.n}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* aktivitas + aksi cepat */}
        <div className="space-y-6">
          <div className="rounded-xl border border-pine-200/80 bg-pine-950 p-6 text-mist-50 shadow-card">
            <h3 className="font-display text-lg font-semibold">Aktivitas Terbaru</h3>
            <p className="text-xs font-semibold text-pine-400">Log sistem administrasi penilaian</p>
            <ul className="mt-5 space-y-4">
              {db.activities.slice(0, 5).map((a) => (
                <li key={a.id} className="flex gap-3.5">
                  <span className="mt-1 flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                    <span className="anim-pulse-soft h-2.5 w-2.5 rounded-full bg-gold-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug font-medium text-pine-100">{a.text}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-pine-400">
                      {a.by} &bull; {timeAgo(a.at)}
                    </p>
                  </div>
                </li>
              ))}
              {db.activities.length === 0 && (
                <li className="text-sm text-pine-400">Belum ada aktivitas tercatat.</li>
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-pine-200/80 bg-white p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-pine-950">Aksi Cepat</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => onGo("nilai")}
                className="group rounded-lg border border-pine-200 bg-mist-50 p-4 text-left transition-all duration-300 hover:border-gold-400 hover:bg-gold-100/50"
              >
                <Chalkboard size={20} className="text-pine-600 transition-colors group-hover:text-gold-600" />
                <p className="mt-2 text-[12.5px] leading-snug font-bold text-pine-900">Input Nilai Kelas</p>
              </button>
              <button
                onClick={() => onGo("siswa")}
                className="group rounded-lg border border-pine-200 bg-mist-50 p-4 text-left transition-all duration-300 hover:border-gold-400 hover:bg-gold-100/50"
              >
                <Graduate size={20} className="text-pine-600 transition-colors group-hover:text-gold-600" />
                <p className="mt-2 text-[12.5px] leading-snug font-bold text-pine-900">Kelola Data Siswa</p>
              </button>
              <button
                onClick={() => onGo("rapor")}
                className="group rounded-lg border border-pine-200 bg-mist-50 p-4 text-left transition-all duration-300 hover:border-gold-400 hover:bg-gold-100/50"
              >
                <Medal size={20} className="text-pine-600 transition-colors group-hover:text-gold-600" />
                <p className="mt-2 text-[12.5px] leading-snug font-bold text-pine-900">Cetak Rapor Santri</p>
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  show("Data demo dimuat ulang dari seed awal", "info");
                }}
                className="group rounded-lg border border-pine-200 bg-mist-50 p-4 text-left transition-all duration-300 hover:border-gold-400 hover:bg-gold-100/50"
              >
                <Database size={20} className="text-pine-600 transition-colors group-hover:text-gold-600" />
                <p className="mt-2 text-[12.5px] leading-snug font-bold text-pine-900">Reset Data Demo</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ Input Nilai ============================ */

function InputNilai({
  teacher,
  show,
}: {
  teacher: Teacher;
  show: (t: string, k?: ToastMsg["kind"]) => void;
}) {
  const db = useDB();
  const [kelas, setKelas] = useState("4-A");
  const [subject, setSubject] = useState<string>(SUBJECTS[0].name);
  const [semester, setSemester] = useState(1);
  const [draft, setDraft] = useState<Record<string, { p?: string; k?: string }>>({});
  const [saving, setSaving] = useState(false);

  const students = useMemo(
    () => db.students.filter((s) => s.kelas === kelas).sort((a, b) => a.name.localeCompare(b.name)),
    [db.students, kelas]
  );

  useEffect(() => {
    setDraft({});
  }, [kelas, subject, semester]);

  const valueOf = (st: Student, cat: GradeCategory): string => {
    const d = draft[st.id]?.[cat === "pengetahuan" ? "p" : "k"];
    if (d !== undefined) return d;
    const g = gradeFor(db.grades, st.id, subject, cat, semester, TAHUN_AJARAN);
    return g ? String(g.score) : "";
  };

  const isDirty = (st: Student): boolean => Boolean(draft[st.id] && (draft[st.id].p !== undefined || draft[st.id].k !== undefined));

  const dirtyRows = students.filter(isDirty);

  const onChange = (st: Student, cat: GradeCategory, raw: string) => {
    const val = raw === "" ? "" : String(Math.min(100, Math.max(0, Number(raw) || 0)));
    setDraft((prev) => ({
      ...prev,
      [st.id]: { ...prev[st.id], [cat === "pengetahuan" ? "p" : "k"]: val },
    }));
  };

  const filledCount = useMemo(() => {
    let n = 0;
    students.forEach((st) => {
      (["pengetahuan", "keterampilan"] as GradeCategory[]).forEach((cat) => {
        if (valueOf(st, cat) !== "") n++;
      });
    });
    return n;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, db.grades, subject, semester, draft]);

  const saveAll = async () => {
    const rows: { studentId: string; subject: string; category: GradeCategory; score: number }[] = [];
    dirtyRows.forEach((st) => {
      (["pengetahuan", "keterampilan"] as GradeCategory[]).forEach((cat) => {
        const v = draft[st.id]?.[cat === "pengetahuan" ? "p" : "k"];
        if (v !== undefined && v !== "") {
          rows.push({ studentId: st.id, subject, category: cat, score: Number(v) });
        }
      });
    });
    if (rows.length === 0) return;
    setSaving(true);
    await saveGrades(rows, { semester, tahun: TAHUN_AJARAN, by: teacher.name, kelas, subject });
    setDraft({});
    setSaving(false);
    show(
      `${rows.length} nilai ${subject} kelas ${kelas} tersimpan ke ${storeMode === "cloud" ? "Firestore" : "penyimpanan lokal"}`
    );
  };

  return (
    <div className="space-y-6">
      {/* bar filter */}
      <div className="rounded-xl border border-pine-200/80 bg-white p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(
            [
              { label: "Rombel / Kelas", value: kelas, opts: CLASSES, set: setKelas },
              { label: "Mata Pelajaran", value: subject, opts: SUBJECTS.map((s) => s.name), set: setSubject },
              { label: "Semester", value: String(semester), opts: SEMESTERS.map(String), set: (v: string) => setSemester(Number(v)) },
              { label: "Tahun Ajaran", value: TAHUN_AJARAN, opts: [TAHUN_AJARAN], set: () => undefined },
            ] as { label: string; value: string; opts: string[]; set: (v: string) => void }[]
          ).map((f) => (
            <label key={f.label} className="block">
              <span className="mb-1.5 block text-[10.5px] font-bold tracking-[0.18em] text-ink-400 uppercase">
                {f.label}
              </span>
              <div className="relative">
                <select
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-pine-200 bg-mist-50 px-3.5 py-2.5 text-sm font-bold text-pine-900 transition-colors focus:border-gold-500 focus:outline-none"
                >
                  {f.opts.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-pine-400">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-mist-200 pt-4 text-[12px] font-semibold text-ink-400">
          <span>
            <strong className="text-pine-800">{students.length}</strong> siswa &bull;{" "}
            <strong className="text-pine-800">{filledCount}</strong> entri terisi dari {students.length * 2}
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-pine-500" /> tersimpan
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold-500" /> belum disimpan
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-pine-700">
            <Quran size={14} className="text-gold-600" /> NA = 60% Pengetahuan + 40% Keterampilan
          </span>
        </div>
      </div>

      {/* tabel matriks */}
      <div className="overflow-hidden rounded-xl border border-pine-200/80 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b-2 border-pine-900 bg-pine-950 text-[11px] font-bold tracking-[0.14em] text-gold-300 uppercase">
                <th className="px-5 py-3.5">No</th>
                <th className="px-4 py-3.5">Nama Siswa</th>
                <th className="px-4 py-3.5">NISN</th>
                <th className="px-4 py-3.5 text-center">Pengetahuan</th>
                <th className="px-4 py-3.5 text-center">Keterampilan</th>
                <th className="px-4 py-3.5 text-center">Nilai Akhir</th>
                <th className="px-4 py-3.5 text-center">Predikat</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st, i) => {
                const pv = valueOf(st, "pengetahuan");
                const kv = valueOf(st, "keterampilan");
                const na = computeNA(pv === "" ? undefined : Number(pv), kv === "" ? undefined : Number(kv));
                const p = na != null ? predikat(na) : "—";
                const dirty = isDirty(st);
                const filled = pv !== "" || kv !== "";
                return (
                  <tr
                    key={st.id}
                    className={`border-b border-mist-200 transition-colors duration-300 last:border-none ${
                      dirty ? "bg-gold-100/60" : i % 2 === 1 ? "bg-mist-50/70" : "bg-white"
                    }`}
                  >
                    <td className="px-5 py-3 font-display text-sm text-ink-400 italic">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold text-pine-950">{st.name}</p>
                      <p className="text-[11px] font-semibold text-ink-400">
                        {st.gender === "L" ? "Putra" : "Putri"} &bull; {st.kelas}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[12.5px] font-semibold text-ink-600 tabular-nums">{st.nisn}</td>
                    {(["pengetahuan", "keterampilan"] as GradeCategory[]).map((cat) => (
                      <td key={cat} className="px-4 py-3 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          inputMode="numeric"
                          value={valueOf(st, cat)}
                          onChange={(e) => onChange(st, cat, e.target.value)}
                          placeholder="—"
                          className="w-20 rounded-lg border border-pine-200 bg-white px-3 py-2 text-center text-sm font-bold text-pine-950 tabular-nums transition-all duration-200 placeholder-ink-400/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-300/50 focus:outline-none"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <span className={`font-display text-lg font-semibold tabular-nums ${na != null ? "text-pine-800" : "text-ink-400"}`}>
                        {na ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${
                          p === "A"
                            ? "bg-pine-100 text-pine-700"
                            : p === "B"
                              ? "bg-gold-100 text-gold-700"
                              : p === "C"
                                ? "bg-orange-100 text-orange-700"
                                : p === "D"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-mist-100 text-ink-400"
                        }`}
                        title={p !== "—" ? predikatLabel(p) : "Belum dinilai"}
                      >
                        {p}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {dirty ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-[11px] font-bold text-gold-700">
                          <span className="anim-pulse-soft h-1.5 w-1.5 rounded-full bg-gold-500" />
                          Belum disimpan
                        </span>
                      ) : filled ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-pine-100 px-3 py-1 text-[11px] font-bold text-pine-700">
                          <Check size={11} /> Tersimpan
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-ink-400">Belum dinilai</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-14 text-center">
                    <Graduate size={34} className="mx-auto text-pine-300" />
                    <p className="mt-3 text-sm font-bold text-pine-800">Belum ada siswa di rombel ini</p>
                    <p className="text-xs font-medium text-ink-400">Tambahkan siswa melalui menu Data Siswa.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* bar simpan */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-pine-900/10 bg-mist-50 px-5 py-4">
          <p className="text-[12.5px] font-semibold text-ink-600">
            {dirtyRows.length > 0 ? (
              <>
                <strong className="text-gold-700">{dirtyRows.length} baris</strong> memiliki perubahan
                yang belum disimpan.
              </>
            ) : (
              <>Semua penilaian {subject} kelas {kelas} semester {semester} sudah tersinkron.</>
            )}
          </p>
          <button
            onClick={saveAll}
            disabled={dirtyRows.length === 0 || saving}
            className="group inline-flex items-center gap-2.5 rounded-full bg-pine-900 px-7 py-3 text-sm font-bold text-gold-300 shadow-card transition-all duration-300 hover:bg-pine-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SaveDisk size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            {saving ? "Menyimpan…" : `Simpan ${dirtyRows.length > 0 ? `(${dirtyRows.length} baris)` : "Perubahan"}`}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================ Data Siswa ============================ */

const emptyForm = { name: "", nisn: "", kelas: CLASSES[3], gender: "L" as "L" | "P" };

function SiswaPanel({
  teacher,
  show,
}: {
  teacher: Teacher;
  show: (t: string, k?: ToastMsg["kind"]) => void;
}) {
  const db = useDB();
  const [q, setQ] = useState("");
  const [fKelas, setFKelas] = useState("Semua");
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; student: Student }>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  const list = useMemo(() => {
    return db.students
      .filter((s) => (fKelas === "Semua" ? true : s.kelas === fKelas))
      .filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.nisn.includes(q))
      .sort((a, b) => a.kelas.localeCompare(b.kelas) || a.name.localeCompare(b.name));
  }, [db.students, q, fKelas]);

  const openAdd = () => {
    setForm(emptyForm);
    setModal({ mode: "add" });
  };
  const openEdit = (s: Student) => {
    setForm({ name: s.name, nisn: s.nisn, kelas: s.kelas, gender: s.gender });
    setModal({ mode: "edit", student: s });
  };

  const submit = async () => {
    if (form.name.trim().length < 3 || form.nisn.trim().length < 5) {
      show("Nama minimal 3 huruf dan NISN minimal 5 digit", "danger");
      return;
    }
    if (modal?.mode === "add") {
      await addStudent({ name: form.name.trim(), nisn: form.nisn.trim(), kelas: form.kelas, gender: form.gender }, teacher.name);
      show(`Siswa baru "${form.name.trim()}" ditambahkan ke kelas ${form.kelas}`);
    } else if (modal?.mode === "edit") {
      await updateStudent({ ...modal.student, name: form.name.trim(), nisn: form.nisn.trim(), kelas: form.kelas, gender: form.gender }, teacher.name);
      show(`Profil "${form.name.trim()}" berhasil diperbarui`);
    }
    setModal(null);
  };

  const del = async (s: Student) => {
    await removeStudent(s.id, teacher.name);
    setConfirmDel(null);
    show(`Data "${s.name}" dan seluruh nilainya dihapus`, "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative min-w-56 flex-1">
          <Search size={17} className="absolute top-1/2 left-4 -translate-y-1/2 text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama atau NISN santri…"
            className="w-full rounded-full border border-pine-200 bg-white py-3 pr-5 pl-11 text-sm font-semibold text-pine-950 shadow-card transition-colors placeholder-ink-400/60 focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <select
            value={fKelas}
            onChange={(e) => setFKelas(e.target.value)}
            className="appearance-none rounded-full border border-pine-200 bg-white py-3 pr-10 pl-5 text-sm font-bold text-pine-900 shadow-card focus:border-gold-500 focus:outline-none"
          >
            {["Semua", ...CLASSES].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-pine-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
        <button
          onClick={openAdd}
          className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-pine-950 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
        >
          <Plus size={16} className="transition-transform duration-300 group-hover:rotate-90" />
          Tambah Siswa
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-pine-200/80 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b-2 border-pine-900 bg-pine-950 text-[11px] font-bold tracking-[0.14em] text-gold-300 uppercase">
                <th className="px-5 py-3.5">Nama Lengkap</th>
                <th className="px-4 py-3.5">NISN</th>
                <th className="px-4 py-3.5 text-center">Rombel</th>
                <th className="px-4 py-3.5 text-center">L/P</th>
                <th className="px-4 py-3.5 text-center">Jumlah Nilai</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s, i) => {
                const nGrades = db.grades.filter((g) => g.studentId === s.id).length;
                return (
                  <tr
                    key={s.id}
                    className={`border-b border-mist-200 transition-colors last:border-none hover:bg-pine-50/60 ${i % 2 === 1 ? "bg-mist-50/60" : ""}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine-900 text-[13px] font-bold text-gold-300">
                          {s.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </span>
                        <p className="text-sm font-bold text-pine-950">{s.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[12.5px] font-semibold text-ink-600 tabular-nums">{s.nisn}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="rounded-full bg-pine-100 px-3 py-1 text-[11.5px] font-bold text-pine-700">
                        {s.kelas}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center text-[12.5px] font-bold text-ink-600">{s.gender}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="text-[12.5px] font-bold text-pine-800 tabular-nums">{nGrades}</span>
                      <span className="text-[11px] font-medium text-ink-400"> entri</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        {confirmDel === s.id ? (
                          <>
                            <button
                              onClick={() => del(s)}
                              className="rounded-full bg-red-600 px-3.5 py-1.5 text-[11.5px] font-bold text-white transition-colors hover:bg-red-700"
                            >
                              Ya, hapus
                            </button>
                            <button
                              onClick={() => setConfirmDel(null)}
                              className="rounded-full border border-pine-300 px-3.5 py-1.5 text-[11.5px] font-bold text-pine-700 hover:bg-pine-50"
                            >
                              Batal
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => openEdit(s)}
                              title="Edit profil"
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-pine-200 text-pine-600 transition-all duration-200 hover:border-gold-500 hover:bg-gold-100 hover:text-gold-700"
                            >
                              <PenEdit size={15} />
                            </button>
                            <button
                              onClick={() => setConfirmDel(s.id)}
                              title="Hapus"
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-pine-200 text-pine-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <Search size={32} className="mx-auto text-pine-300" />
                    <p className="mt-3 text-sm font-bold text-pine-800">Tidak ada siswa yang cocok</p>
                    <p className="text-xs font-medium text-ink-400">Coba ubah kata kunci atau filter rombel.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-mist-200 bg-mist-50 px-5 py-3 text-[12px] font-semibold text-ink-400">
          Menampilkan <strong className="text-pine-800">{list.length}</strong> dari {db.students.length} santri terdaftar
        </div>
      </div>

      {/* modal tambah/edit */}
      {modal && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-pine-950/70 p-5 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="anim-toast w-full max-w-md rounded-2xl border border-pine-700 bg-pine-900 p-7 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-arabic text-lg text-gold-300">
                  {modal.mode === "add" ? "تَسْجِيْلُ الطُّلَّابِ" : "تَحْدِيْثُ البَيَانَاتِ"}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold text-mist-50">
                  {modal.mode === "add" ? "Tambah Siswa Baru" : "Edit Profil Siswa"}
                </h3>
              </div>
              <button
                onClick={() => setModal(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-pine-700 text-pine-300 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <Close size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                  Nama Lengkap
                </span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="cth. Aisha Nayla Az-Zahra"
                  className="w-full rounded-lg border border-pine-700 bg-pine-950/70 px-4 py-2.5 text-sm text-mist-50 placeholder-pine-600 focus:border-gold-400 focus:outline-none"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">NISN</span>
                  <input
                    value={form.nisn}
                    onChange={(e) => setForm({ ...form, nisn: e.target.value.replace(/[^0-9]/g, "").slice(0, 10) })}
                    placeholder="10 digit"
                    className="w-full rounded-lg border border-pine-700 bg-pine-950/70 px-4 py-2.5 text-sm text-mist-50 placeholder-pine-600 focus:border-gold-400 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">Rombel</span>
                  <select
                    value={form.kelas}
                    onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                    className="w-full rounded-lg border border-pine-700 bg-pine-950/70 px-3 py-2.5 text-sm font-semibold text-mist-50 focus:border-gold-400 focus:outline-none"
                  >
                    {CLASSES.map((k) => (
                      <option key={k} className="bg-pine-950">{k}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <span className="mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-pine-300 uppercase">
                  Jenis Kelamin
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(["L", "P"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setForm({ ...form, gender: g })}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                        form.gender === g
                          ? "border-gold-400 bg-gold-400/15 text-gold-300"
                          : "border-pine-700 text-pine-300 hover:border-pine-500"
                      }`}
                    >
                      {g === "L" ? "Laki-laki" : "Perempuan"}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={submit}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-pine-950 transition-colors hover:bg-gold-300"
              >
                <Check size={16} /> {modal.mode === "add" ? "Simpan Siswa Baru" : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ Rapor ============================ */

function RaporPanel({ teacher, show }: { teacher: Teacher; show: (t: string, k?: ToastMsg["kind"]) => void }) {
  const db = useDB();
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState(1);

  const student = db.students.find((s) => s.id === studentId) ?? null;

  const rows = useMemo(() => {
    if (!student) return [];
    return SUBJECTS.map((subj) => {
      const p = gradeFor(db.grades, student.id, subj.name, "pengetahuan", semester, TAHUN_AJARAN);
      const k = gradeFor(db.grades, student.id, subj.name, "keterampilan", semester, TAHUN_AJARAN);
      const na = computeNA(p?.score, k?.score);
      return { name: subj.name, p: p?.score, k: k?.score, na, pred: na != null ? predikat(na) : "—" };
    });
  }, [db.grades, student, semester]);

  const rataNA = useMemo(() => {
    const vals = rows.filter((r) => r.na != null).map((r) => r.na as number);
    return vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : null;
  }, [rows]);

  const peringkat = useMemo(() => {
    if (!student) return null;
    const avgs = db.students
      .filter((s) => s.kelas === student.kelas)
      .map((s) => {
        const vals = SUBJECTS.map((subj) =>
          computeNA(
            gradeFor(db.grades, s.id, subj.name, "pengetahuan", semester, TAHUN_AJARAN)?.score,
            gradeFor(db.grades, s.id, subj.name, "keterampilan", semester, TAHUN_AJARAN)?.score
          )
        ).filter((v): v is number => v != null);
        return { id: s.id, avg: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0 };
      })
      .sort((a, b) => b.avg - a.avg);
    const idx = avgs.findIndex((a) => a.id === student.id);
    return idx >= 0 ? { rank: idx + 1, total: avgs.filter((a) => a.avg > 0).length } : null;
  }, [db.students, db.grades, student, semester]);

  return (
    <div className="space-y-6">
      <div className="print-hide flex flex-wrap items-center gap-4">
        <div className="relative min-w-64 flex-1">
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full appearance-none rounded-full border border-pine-200 bg-white py-3 pr-10 pl-5 text-sm font-bold text-pine-900 shadow-card focus:border-gold-500 focus:outline-none"
          >
            <option value="">— Pilih santri untuk menampilkan rapor —</option>
            {CLASSES.map((k) => {
              const anak = db.students.filter((s) => s.kelas === k);
              if (anak.length === 0) return null;
              return (
                <optgroup key={k} label={`Kelas ${k}`}>
                  {anak.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.nisn})
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-pine-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
        <div className="relative">
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="appearance-none rounded-full border border-pine-200 bg-white py-3 pr-10 pl-5 text-sm font-bold text-pine-900 shadow-card focus:border-gold-500 focus:outline-none"
          >
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-pine-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
        <button
          onClick={() => {
            if (!student) {
              show("Pilih santri terlebih dahulu sebelum mencetak", "danger");
              return;
            }
            window.print();
          }}
          className="group inline-flex items-center gap-2 rounded-full bg-pine-900 px-6 py-3 text-sm font-bold text-gold-300 shadow-card transition-all duration-300 hover:bg-pine-800"
        >
          <Printer size={16} />
          Cetak Rapor
        </button>
      </div>

      {!student ? (
        <div className="print-hide rounded-xl border-2 border-dashed border-pine-200 bg-white/60 px-6 py-20 text-center">
          <Medal size={40} className="mx-auto text-pine-300" />
          <p className="font-display mt-4 text-lg font-semibold text-pine-800">
            Rapor Digital Santri
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed font-medium text-ink-400">
            Pilih salah satu santri dari daftar di atas. Rapor disusun otomatis dari matriks penilaian
            yang tersimpan di {storeMode === "cloud" ? "Cloud Firestore" : "basis data lokal"} dan siap
            dicetak untuk wali santri.
          </p>
        </div>
      ) : (
        <div id="rapor-sheet" className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-pine-200 bg-white shadow-lift">
          {/* kop rapor */}
          <div className="relative bg-pine-950 px-8 py-7 text-mist-50">
            <div className="bg-star-pattern absolute inset-0 opacity-[0.08]" />
            <div className="relative flex items-center gap-5">
              <SchoolMark className="h-16 w-16 shrink-0" />
              <div className="flex-1">
                <p className="text-[10.5px] font-bold tracking-[0.25em] text-gold-300 uppercase">
                  LP Ma&rsquo;arif NU &bull; Kementerian Agama RI &bull; NPSN 60712345
                </p>
                <h2 className="font-display mt-1 text-2xl font-semibold">MI Ma&rsquo;arif 2 Tlogopucang</h2>
                <p className="text-[11.5px] font-medium text-pine-300">
                  Tlogopucang Utara RT 04 RW 06, Kandangan, Temanggung, Jawa Tengah 56254
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-arabic text-lg text-gold-300">تَقْرِيْرُ النَّتَائِجِ</p>
                <p className="mt-0.5 text-[10.5px] font-bold tracking-widest text-pine-300 uppercase">
                  Laporan Hasil Belajar
                </p>
              </div>
            </div>
          </div>

          {/* identitas */}
          <div className="grid gap-x-8 gap-y-2 border-b-2 border-gold-400 px-8 py-5 text-[13px] sm:grid-cols-2">
            {[
              ["Nama Santri", student.name],
              ["NISN", student.nisn],
              ["Kelas / Rombel", `${student.kelas}`],
              ["Tahun Ajaran", `${TAHUN_AJARAN} — Semester ${semester}`],
            ].map(([l, v]) => (
              <p key={l} className="flex justify-between gap-4 border-b border-dotted border-pine-200 py-1.5">
                <span className="font-semibold text-ink-400">{l}</span>
                <span className="text-right font-bold text-pine-950">{v}</span>
              </p>
            ))}
          </div>

          {/* matriks nilai */}
          <div className="px-8 py-6">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b-2 border-pine-900 text-[10.5px] font-bold tracking-[0.14em] text-pine-700 uppercase">
                  <th className="py-2.5">Mata Pelajaran</th>
                  <th className="py-2.5 text-center">Pengetahuan</th>
                  <th className="py-2.5 text-center">Keterampilan</th>
                  <th className="py-2.5 text-center">Nilai Akhir</th>
                  <th className="py-2.5 text-center">Predikat</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.name} className={`border-b border-mist-200 ${i % 2 === 1 ? "bg-mist-50/70" : ""}`}>
                    <td className="py-2.5 pl-1 font-bold text-pine-950">{r.name}</td>
                    <td className="py-2.5 text-center font-semibold text-ink-600 tabular-nums">{r.p ?? "—"}</td>
                    <td className="py-2.5 text-center font-semibold text-ink-600 tabular-nums">{r.k ?? "—"}</td>
                    <td className="font-display py-2.5 text-center text-base font-semibold text-pine-800 tabular-nums">
                      {r.na ?? "—"}
                    </td>
                    <td className="py-2.5 text-center">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          r.pred === "A"
                            ? "bg-pine-100 text-pine-700"
                            : r.pred === "B"
                              ? "bg-gold-100 text-gold-700"
                              : r.pred === "C"
                                ? "bg-orange-100 text-orange-700"
                                : r.pred === "D"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-mist-100 text-ink-400"
                        }`}
                      >
                        {r.pred}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ringkasan */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-pine-950 p-4 text-center text-mist-50">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gold-300 uppercase">Rata-rata NA</p>
                <p className="font-display mt-1 text-3xl font-semibold tabular-nums">{rataNA ?? "—"}</p>
              </div>
              <div className="rounded-xl border-2 border-gold-400 bg-gold-100/60 p-4 text-center">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gold-700 uppercase">Peringkat Kelas</p>
                <p className="font-display mt-1 text-3xl font-semibold text-pine-900 tabular-nums">
                  {peringkat ? `${peringkat.rank}` : "—"}
                  <span className="text-base text-ink-400"> / {peringkat?.total ?? "—"}</span>
                </p>
              </div>
              <div className="rounded-xl border border-pine-200 bg-mist-50 p-4 text-center">
                <p className="text-[10px] font-bold tracking-[0.2em] text-pine-600 uppercase">Hafalan Tahfidz</p>
                <p className="font-display mt-1 text-3xl font-semibold text-pine-900">2 Juz</p>
                <p className="text-[10.5px] font-semibold text-ink-400">mutqin &bull; juz 30–29</p>
              </div>
            </div>

            <p className="mt-6 rounded-lg bg-mist-100 px-4 py-3 text-[12px] leading-relaxed font-medium text-ink-600">
              <strong className="text-pine-800">Catatan Wali Kelas:</strong> Alhamdulillah, ananda
              menunjukkan perkembangan yang istiqamah. Mohon pendampingan muraja&rsquo;ah harian di
              rumah agar hafalan semakin mutqin. Sikap spiritual dan sosial:{" "}
              <strong className="text-pine-800">Sangat Baik</strong> &bull; Presensi:{" "}
              <strong className="text-pine-800">98,5%</strong>.
            </p>

            {/* tanda tangan */}
            <div className="mt-10 grid grid-cols-2 gap-8 text-center text-[12.5px]">
              <div>
                <p className="font-semibold text-ink-600">Wali Kelas {student.kelas},</p>
                <div className="mx-auto mt-16 w-48 border-t border-pine-400 pt-1.5">
                  <p className="font-bold text-pine-950">{teacher.name}</p>
                  <p className="text-[11px] text-ink-400">NIP. —</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-ink-600">Kepala Madrasah,</p>
                <div className="mx-auto mt-16 w-48 border-t border-pine-400 pt-1.5">
                  <p className="font-bold text-pine-950">( &nbsp;....................................&nbsp; )</p>
                  <p className="text-[11px] text-ink-400">NIP. ................................</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-mist-200 bg-mist-50 px-8 py-3 text-center text-[10.5px] font-semibold text-ink-400">
            Dokumen digital dicetak dari Portal Guru MI Ma&rsquo;arif 2 Tlogopucang &bull; validasi QR tersedia pada dokumen asli
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ Portal utama ============================ */

export default function Portal({ onHome }: { onHome: () => void }) {
  const [teacher, setTeacher] = useState<Teacher | null>(() => readTeacher());
  const [tab, setTab] = useState<Tab>("dasbor");
  const { toast, show } = useToast();

  const login = (t: Teacher) => {
    try {
      sessionStorage.setItem(TEACHER_KEY, JSON.stringify(t));
    } catch {
      /* abaikan */
    }
    setTeacher(t);
    show(`Assalamu'alaikum, ${t.name.split(",")[0]} — selamat bertugas`);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(TEACHER_KEY);
    } catch {
      /* abaikan */
    }
    setTeacher(null);
    setTab("dasbor");
  };

  if (!teacher) return <LoginView onLogin={login} />;

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="min-h-screen bg-mist-100">
      {/* bilah atas */}
      <header className="print-hide sticky top-0 z-50 border-b border-pine-800 bg-pine-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <SchoolMark className="h-10 w-10" />
            <div>
              <p className="font-display text-[15px] leading-tight font-semibold text-mist-50">
                Konsol Administrasi Penilaian
              </p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-gold-300 uppercase">
                MI Ma&rsquo;arif 2 Tlogopucang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`hidden items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold md:inline-flex ${
                storeMode === "cloud"
                  ? "border-pine-500 bg-pine-900 text-pine-200"
                  : "border-gold-500/60 bg-gold-400/10 text-gold-300"
              }`}
            >
              <span
                className={`anim-pulse-soft h-2 w-2 rounded-full ${storeMode === "cloud" ? "bg-pine-400" : "bg-gold-400"}`}
              />
              <Database size={13} />
              {storeMode === "cloud" ? "Cloud Firestore" : "Mode Lokal (Demo)"}
            </span>

            <button
              onClick={onHome}
              className="hidden rounded-full border border-pine-700 px-4 py-2 text-[12px] font-bold text-pine-200 transition-colors hover:border-gold-400 hover:text-gold-300 sm:inline-flex"
            >
              &larr; Beranda Publik
            </button>

            <div className="flex items-center gap-2.5 rounded-full border border-pine-700 bg-pine-900 py-1.5 pr-1.5 pl-4">
              <div className="text-right">
                <p className="max-w-36 truncate text-[12px] leading-tight font-bold text-mist-50">
                  {teacher.name}
                </p>
                <p className="text-[10px] font-semibold text-gold-400">{teacher.role}</p>
              </div>
              <span className="font-display flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-[12px] font-bold text-pine-950">
                {teacher.name.replace(/[^A-Za-z ]/g, "").trim().split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
            </div>

            <button
              onClick={logout}
              title="Keluar"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-pine-700 text-pine-300 transition-colors hover:border-red-400 hover:text-red-400"
            >
              <Logout size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-7 px-4 py-7 sm:px-6">
        {/* sidebar desktop */}
        <aside className="print-hide sticky top-24 hidden h-fit w-56 shrink-0 lg:block">
          <nav className="overflow-hidden rounded-xl border border-pine-200/80 bg-white shadow-card">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`group flex w-full items-center gap-3.5 border-l-[3px] px-5 py-4 text-left text-[13.5px] font-bold transition-all duration-200 ${
                  tab === t.id
                    ? "border-gold-500 bg-pine-950 text-gold-300"
                    : "border-transparent text-ink-600 hover:bg-mist-50 hover:text-pine-800"
                }`}
              >
                <t.icon size={19} className={tab === t.id ? "text-gold-400" : "text-pine-400 group-hover:text-pine-600"} />
                {t.label}
                {tab === t.id && <Star8 size={11} className="ml-auto text-gold-500" />}
              </button>
            ))}
          </nav>

          <div className="relative mt-5 overflow-hidden rounded-xl bg-pine-950 p-5 text-mist-50">
            <div className="bg-star-pattern absolute inset-0 opacity-[0.1]" />
            <p className="font-arabic relative text-lg text-gold-300">عِلْمٌ يَنْفَعُ</p>
            <p className="relative mt-2 text-[12px] leading-relaxed font-medium text-pine-200">
              &ldquo;Ilmu yang bermanfaat adalah yang diamalkan dan diajarkan dengan penuh amanah.&rdquo;
            </p>
          </div>
        </aside>

        {/* konten */}
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <div className="print-hide mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold tracking-[0.25em] text-pine-600 uppercase">
                Modul {activeTab.label}
              </p>
              <h1 className="font-display mt-1 text-2xl font-semibold text-pine-950 sm:text-3xl">
                {tab === "dasbor" && "Dasbor Akademik"}
                {tab === "nilai" && "Matriks Penilaian Siswa"}
                {tab === "siswa" && "Manajemen Data Siswa"}
                {tab === "rapor" && "Rapor & Transkrip Santri"}
              </h1>
            </div>
            <p className="text-[12px] font-semibold text-ink-400">
              Semester 1 &bull; TA {TAHUN_AJARAN} &bull; KKM 75
            </p>
          </div>

          {tab === "dasbor" && <Dasbor onGo={setTab} show={show} />}
          {tab === "nilai" && <InputNilai teacher={teacher} show={show} />}
          {tab === "siswa" && <SiswaPanel teacher={teacher} show={show} />}
          {tab === "rapor" && <RaporPanel teacher={teacher} show={show} />}
        </main>
      </div>

      {/* tabbar mobile */}
      <nav className="print-hide fixed inset-x-0 bottom-0 z-50 border-t border-pine-800 bg-pine-950/97 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-1 py-3 text-[10.5px] font-bold transition-colors ${
                tab === t.id ? "text-gold-300" : "text-pine-400"
              }`}
            >
              <t.icon size={20} />
              {t.label.split(" ")[0]}
              {tab === t.id && <span className="h-1 w-6 rounded-full bg-gold-400" />}
            </button>
          ))}
        </div>
      </nav>

      <ToastView toast={toast} />
    </div>
  );
}
