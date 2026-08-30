import { lazy, Suspense, useEffect } from "react";
import Landing from "./components/Landing";
import { SchoolMark, Star8 } from "./components/icons";
import { useHashRoute } from "./hooks";

/* Portal dimuat secara terpisah (code-split) agar beranda tetap ringan;
   modul Firebase hanya diunduh saat konsol penilaian dibuka. */
const Portal = lazy(() => import("./components/Portal"));

function PortalLoader() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-pine-950">
      <div className="bg-star-pattern absolute inset-0 opacity-[0.06]" />
      <Star8 size={280} className="anim-spin-slow absolute -top-16 -right-16 text-gold-400/10" />
      <SchoolMark className="anim-float h-16 w-16" />
      <div className="text-center">
        <p className="font-display text-lg font-semibold text-mist-50">
          Membuka Konsol Penilaian&hellip;
        </p>
        <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-pine-400 uppercase">
          MI Ma&rsquo;arif 2 Tlogopucang
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="anim-pulse-soft h-2 w-2 rounded-full bg-gold-400"
            style={{ animationDelay: `${i * 250}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Portal Web MI Ma'arif 2 Tlogopucang
 * Rute: #/ (beranda publik) dan #/portal (administrasi penilaian guru)
 */
export default function App() {
  const [route, navigate] = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  if (route === "portal") {
    return (
      <Suspense fallback={<PortalLoader />}>
        <Portal onHome={() => navigate("home")} />
      </Suspense>
    );
  }
  return <Landing onPortal={() => navigate("portal")} />;
}
