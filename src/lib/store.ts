/**
 * Lapisan data — Administrasi Penilaian MI Ma'arif 2 Tlogopucang
 * Backend: Cloud Firestore (real-time) dengan fallback Mode Lokal (localStorage).
 */
import { useSyncExternalStore } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore, isFirebaseConfigured } from "./firebase";

/* ============================== Tipe ============================== */

export type Gender = "L" | "P";

export interface Student {
  id: string;
  nisn: string;
  name: string;
  kelas: string;
  gender: Gender;
  createdAt: number;
}

export type GradeCategory = "pengetahuan" | "keterampilan";

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  category: GradeCategory;
  score: number;
  semester: number;
  tahun: string;
  updatedAt: number;
  updatedBy: string;
}

export interface Activity {
  id: string;
  text: string;
  by: string;
  at: number;
}

export interface DB {
  students: Student[];
  grades: Grade[];
  activities: Activity[];
}

/* ============================ Konstanta ============================ */

export const SUBJECTS = [
  { name: "Matematika", slug: "matematika", base: 88 },
  { name: "IPA", slug: "ipa", base: 89 },
  { name: "Bahasa Inggris", slug: "bahasa-inggris", base: 84 },
  { name: "Bahasa Indonesia", slug: "bahasa-indonesia", base: 90 },
  { name: "Pendidikan Agama Islam", slug: "pai", base: 92 },
  { name: "Tahfidz Al-Qur'an", slug: "tahfidz", base: 91 },
  { name: "PJOK", slug: "pjok", base: 90 },
  { name: "Seni Budaya", slug: "seni-budaya", base: 88 },
] as const;

export const CLASSES = ["1-A", "2-A", "3-A", "4-A", "4-B", "5-A", "5-B", "6-A"];
export const SEMESTERS = [1, 2];
export const TAHUN_AJARAN = "2025/2026";

export const predikat = (na: number): string =>
  na >= 90 ? "A" : na >= 80 ? "B" : na >= 70 ? "C" : "D";

export const predikatLabel = (p: string): string =>
  p === "A" ? "Sangat Baik" : p === "B" ? "Baik" : p === "C" ? "Cukup" : "Perlu Bimbingan";

export const computeNA = (pengetahuan?: number, keterampilan?: number): number | null => {
  if (pengetahuan == null && keterampilan == null) return null;
  const p = pengetahuan ?? keterampilan ?? 0;
  const k = keterampilan ?? pengetahuan ?? 0;
  return Math.round(p * 0.6 + k * 0.4);
};

/* ============================ Seed lokal ============================ */

const uid = (): string =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;

const NAMA_L = [
  "Haikal Zahid Ar Rasyid", "Ahmad Fauzan Hakim", "Muhammad Rizqi Ramadhan",
  "Abdullah Hafiz Alghifari", "Zaki Alfarizi Pratama", "Rafi Ardiansyah",
  "Umar Faruq Alaydrus", "Ali Akbar Maulana", "Fathan Mubina Saputra",
  "Yusuf Hamdani Wijaya", "Ibrahim Malik Firdaus", "Salman Alfarisi Putra",
  "Dzaki Azzam Nugroho", "Fikri Haikal Ramadhan", "Arka Bimasakti Putra",
];

const NAMA_P = [
  "Aisha Nayla Az-Zahra", "Fatimah Azzahra Putri", "Khadijah Nur Ramadhani",
  "Zainab Humaira Salsabila", "Maryam Qonitah Aulia", "Hana Qanitah Shalihah",
  "Safiya Rahma Anindya", "Naura Azkiya Maharani", "Alika Ramadhani Putri",
  "Bilqis Auliya Zahra", "Nadia Shalihah Kamila", "Zahra Mumtaza Inara",
  "Kayla Adzkiya Salsabila", "Rania Putri Ayudia", "Nayla Salsabila Azzahra",
];

const KOMPETENSI = ["Knowledge", "Application", "Reasoning"];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildSeed(): DB {
  const rand = seededRandom(20260712);
  const students: Student[] = [];
  const grades: Grade[] = [];
  const pool = [...NAMA_L, ...NAMA_P];
  let ni = 0;

  CLASSES.forEach((kelas, ci) => {
    const count = 6 + Math.floor(rand() * 3);
    for (let i = 0; i < count; i++) {
      const name = pool[ni % pool.length];
      ni++;
      const gender: Gender = NAMA_L.includes(name) ? "L" : "P";
      const id = `siswa-${kelas}-${i}`.toLowerCase();
      const nisn = `0${String(128400000 + ci * 9137 + i * 131 + Math.floor(rand() * 90)).padStart(9, "0")}`;
      students.push({ id, nisn, name, kelas, gender, createdAt: 1750000000000 + ni });
    }
  });

  // Nilai terisi untuk kelas 4-A dan 5-A (semester ganjil) — menampilkan sistem yang hidup.
  ["4-a", "5-a"].forEach((kelasSlug, si) => {
    students
      .filter((s) => s.kelas.toLowerCase() === kelasSlug)
      .forEach((s, sIdx) => {
        const ability = 0.78 + ((sIdx * 7 + si * 3) % 20) / 100 + rand() * 0.06;
        SUBJECTS.forEach((subj, subjIdx) => {
          (["pengetahuan", "keterampilan"] as GradeCategory[]).forEach((cat, catIdx) => {
            const jitter = Math.floor(rand() * 9) - 4;
            const score = Math.min(
              99,
              Math.max(64, Math.round(subj.base * ability + jitter - (subjIdx + catIdx) % 3))
            );
            const id = `${s.id}__${subj.slug}__${cat}__1__${TAHUN_AJARAN}`;
            grades.push({
              id,
              studentId: s.id,
              subject: subj.name,
              category: cat,
              score,
              semester: 1,
              tahun: TAHUN_AJARAN,
              updatedAt: 1767225600000 + sIdx * 60000 + subjIdx * 9000,
              updatedBy: "Ustadzah Fatimah, S.Pd.I",
            });
          });
        });
      });
  });

  const now = Date.now();
  const activities: Activity[] = [
    { id: uid(), text: "Sinkronisasi nilai Matematika kelas 4-A (18 siswa) ke Firestore", by: "Ustadzah Fatimah", at: now - 1000 * 60 * 12 },
    { id: uid(), text: "Transkrip Cambridge Checkpoint Batch 2026.01 disetujui Kepala Madrasah", by: "Kepala Madrasah", at: now - 1000 * 60 * 60 * 2 },
    { id: uid(), text: "Penilaian Tahfidz Al-Qur'an juz 30 kelas 5-A diperbarui", by: "Ustadz Salman", at: now - 1000 * 60 * 60 * 5 },
    { id: uid(), text: "Backup database harian otomatis selesai (42,6 GB / 100 GB)", by: "Sistem", at: now - 1000 * 60 * 60 * 9 },
    { id: uid(), text: "RPP Sains Bab 4: Energi ditandai selesai oleh wali kelas", by: "Ustadzah Fatimah", at: now - 1000 * 60 * 60 * 26 },
  ];

  return { students, grades, activities };
}

/* ============================ Store inti ============================ */

const LS_KEY = "mimada2_tlogopucang_db_v1";
const MAX_ACTIVITIES = 40;

let cache: DB = { students: [], grades: [], activities: [] };
let initialized = false;
let usingCloud = false;
const listeners = new Set<() => void>();

export const storeMode: "cloud" | "local" = isFirebaseConfigured && firestore ? "cloud" : "local";

function emit(): void {
  listeners.forEach((fn) => fn());
}

function readLocal(): DB | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DB;
    if (!Array.isArray(parsed.students)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeLocal(data: DB): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    /* penyimpanan penuh — abaikan */
  }
}

function logLocal(text: string, by: string, data: DB): Activity[] {
  const entry: Activity = { id: uid(), text, by, at: Date.now() };
  return [entry, ...data.activities].slice(0, MAX_ACTIVITIES);
}

function initStore(): void {
  if (initialized) return;
  initialized = true;

  if (storeMode === "cloud" && firestore) {
    const cloud: DB = readLocal() ?? { students: [], grades: [], activities: [] };
    cache = cloud;
    usingCloud = true;

    onSnapshot(
      collection(firestore, "mi_students"),
      (snap) => {
        const students = snap.docs.map((d) => ({ ...(d.data() as Omit<Student, "id">), id: d.id }));
        cache = { ...cache, students };
        writeLocal(cache);
        emit();
      },
      (err) => {
        console.warn("[MIMADA] Snapshot siswa gagal, gunakan cache lokal.", err);
        if (cache.students.length === 0) cache = { ...cache, ...buildSeed() };
        emit();
      }
    );

    onSnapshot(
      collection(firestore, "mi_grades"),
      (snap) => {
        const grades = snap.docs.map((d) => ({ ...(d.data() as Omit<Grade, "id">), id: d.id }));
        cache = { ...cache, grades };
        writeLocal(cache);
        emit();
      },
      (err) => {
        console.warn("[MIMADA] Snapshot nilai gagal, gunakan cache lokal.", err);
        emit();
      }
    );

    onSnapshot(
      collection(firestore, "mi_activities"),
      (snap) => {
        const activities = snap.docs
          .map((d) => ({ ...(d.data() as Omit<Activity, "id">), id: d.id }))
          .sort((a, b) => b.at - a.at)
          .slice(0, MAX_ACTIVITIES);
        cache = { ...cache, activities };
        emit();
      },
      () => emit()
    );
  } else {
    cache = readLocal() ?? buildSeed();
    writeLocal(cache);
    emit();
  }
}

export function subscribe(fn: () => void): () => void {
  initStore();
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getDB(): DB {
  initStore();
  return cache;
}

export function useDB(): DB {
  return useSyncExternalStore(subscribe, getDB);
}

export const isCloudActive = (): boolean => usingCloud;

/* ============================ Mutasi ============================ */

function safeCloud(run: () => void): void {
  if (storeMode === "cloud" && firestore) {
    try {
      run();
      return;
    } catch (err) {
      console.warn("[MIMADA] Operasi cloud gagal, disimpan lokal.", err);
    }
  }
}

export async function addStudent(input: Omit<Student, "id" | "createdAt">, by: string): Promise<void> {
  const student: Student = { ...input, id: uid(), createdAt: Date.now() };
  safeCloud(() => void addDoc(collection(firestore!, "mi_students"), student));
  cache = {
    ...cache,
    students: [...cache.students, student],
    activities: logLocal(`Siswa baru ditambahkan: ${student.name} (${student.kelas})`, by, cache),
  };
  writeLocal(cache);
  emit();
}

export async function updateStudent(student: Student, by: string): Promise<void> {
  safeCloud(() => void updateDoc(doc(firestore!, "mi_students", student.id), { ...student }));
  cache = {
    ...cache,
    students: cache.students.map((s) => (s.id === student.id ? student : s)),
    activities: logLocal(`Profil siswa diperbarui: ${student.name}`, by, cache),
  };
  writeLocal(cache);
  emit();
}

export async function removeStudent(studentId: string, by: string): Promise<void> {
  const target = cache.students.find((s) => s.id === studentId);
  safeCloud(() => {
    void deleteDoc(doc(firestore!, "mi_students", studentId));
    cache.grades
      .filter((g) => g.studentId === studentId)
      .forEach((g) => void deleteDoc(doc(firestore!, "mi_grades", g.id)));
  });
  cache = {
    ...cache,
    students: cache.students.filter((s) => s.id !== studentId),
    grades: cache.grades.filter((g) => g.studentId !== studentId),
    activities: logLocal(`Siswa dihapus dari data madrasah: ${target?.name ?? studentId}`, by, cache),
  };
  writeLocal(cache);
  emit();
}

export interface GradeInput {
  studentId: string;
  subject: string;
  category: GradeCategory;
  score: number;
}

export async function saveGrades(
  rows: GradeInput[],
  meta: { semester: number; tahun: string; by: string; kelas: string; subject: string }
): Promise<number> {
  let saved = 0;
  const nowTs = Date.now();
  let grades = [...cache.grades];

  for (const row of rows) {
    const subj = SUBJECTS.find((s) => s.name === meta.subject);
    const slug = subj?.slug ?? meta.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const id = `${row.studentId}__${slug}__${row.category}__${meta.semester}__${meta.tahun}`;
    const payload: Grade = {
      id,
      studentId: row.studentId,
      subject: meta.subject,
      category: row.category,
      score: Math.min(100, Math.max(0, Math.round(row.score))),
      semester: meta.semester,
      tahun: meta.tahun,
      updatedAt: nowTs,
      updatedBy: meta.by,
    };
    const existingIdx = grades.findIndex(
      (g) => g.studentId === row.studentId && g.subject === meta.subject &&
        g.category === row.category && g.semester === meta.semester && g.tahun === meta.tahun
    );
    if (existingIdx >= 0) grades[existingIdx] = payload;
    else grades = [...grades, payload];
    saved++;

    safeCloud(() => void setDoc(doc(firestore!, "mi_grades", id), payload, { merge: true }));
  }

  cache = {
    ...cache,
    grades,
    activities: logLocal(
      `Penilaian ${meta.subject} kelas ${meta.kelas} disimpan (${saved} entri, semester ${meta.semester})`,
      meta.by,
      cache
    ),
  };
  writeLocal(cache);
  emit();
  return saved;
}

export function resetDemoData(): void {
  cache = buildSeed();
  writeLocal(cache);
  emit();
}

/* ============================ Selektor ============================ */

export function gradeFor(
  grades: Grade[],
  studentId: string,
  subject: string,
  category: GradeCategory,
  semester: number,
  tahun: string
): Grade | undefined {
  return grades.find(
    (g) =>
      g.studentId === studentId &&
      g.subject === subject &&
      g.category === category &&
      g.semester === semester &&
      g.tahun === tahun
  );
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  return `${d} hari lalu`;
}

export { KOMPETENSI };
