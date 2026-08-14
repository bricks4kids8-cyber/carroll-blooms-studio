import { Suspense, lazy, useEffect, useState } from "react";

const FloralScene = lazy(() => import("./FloralScene"));

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
      <div className="pointer-events-none absolute inset-8 rounded-full bg-leaf/20 blur-3xl" />
      {mounted ? (
        <Suspense fallback={null}>
          <FloralScene />
        </Suspense>
      ) : null}
    </div>
  );
}
