"use client";

import { useEffect } from "react";

type ConnectionInfo = { connection?: { saveData?: boolean } };

/**
 * Starts the pointer engine (src/lib/pointer.ts) — only on devices with a
 * mouse, never under reduced motion or Save-Data, and only once the page is
 * idle. The engine is a separate chunk, so phones never download it.
 */
export function PointerFx() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & ConnectionInfo).connection?.saveData === true;
    if (!fine || reduce || saveData) return;

    let stop: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      void import("@/lib/pointer").then(({ startPointerEngine }) => {
        if (!cancelled) stop = startPointerEngine();
      });
    };

    const idle = "requestIdleCallback" in window;
    const handle = idle ? window.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 800);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      stop?.();
    };
  }, []);

  return null;
}
