/**
 * Konfigurasi Firebase — MI Ma'arif 2 Tlogopucang
 * ------------------------------------------------
 * Portal secara otomatis terhubung ke Cloud Firestore apabila kredensial
 * berikut diisi melalui environment variables Vite (.env):
 *
 *   VITE_FIREBASE_API_KEY=...
 *   VITE_FIREBASE_AUTH_DOMAIN=...
 *   VITE_FIREBASE_PROJECT_ID=...
 *   VITE_FIREBASE_STORAGE_BUCKET=...
 *   VITE_FIREBASE_MESSAGING_SENDER_ID=...
 *   VITE_FIREBASE_APP_ID=...
 *
 * Tanpa kredensial, portal berjalan dalam Mode Lokal (localStorage)
 * dengan struktur data yang identik, sehingga siap migrasi 1:1.
 */
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const env = import.meta.env as Record<string, string | undefined>;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps()[0] ?? initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn("[MIMADA] Inisialisasi Firebase gagal, kembali ke mode lokal.", err);
    app = null;
    db = null;
  }
}

export const firestore = db;
export const firebaseApp = app;
