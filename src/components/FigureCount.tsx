"use client";

import { useEffect } from "react";

/** Pages whose figures have counted (or were left as they were) in this visit. */
const counted = new Set<string>();

/**
 * Has the client figures count up the first time they come into view: a
 * short count on a timer, so it always ends on the real number wherever the
 * page comes to rest. Only figures still below the fold take part — they wait
 * at zero (data-count="ready") and start counting once they are well up the
 * screen (data-count="play"). Figures already on screen or scrolled past keep
 * their number, and so does a return visit (Back, Forward, reload, or coming
 * back to a page in the same visit): a number is never seen to drop back.
 * Without this script, or with reduced motion, the numbers simply show.
 */
export function FigureCount() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload" || nav?.type === "back_forward") return;
    const page = window.location.pathname;
    if (counted.has(page)) return;

    const waiting = Array.from(document.querySelectorAll<HTMLElement>(".figures")).filter(
      (list) => list.getBoundingClientRect().top >= window.innerHeight,
    );
    if (waiting.length === 0) {
      counted.add(page);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.count = "play";
          observer.unobserve(entry.target);
          counted.add(page);
        }
      },
      // Once a fifth of the way up the screen, where the numbers can be read.
      { rootMargin: "0px 0px -20% 0px" },
    );
    for (const list of waiting) {
      list.dataset.count = "ready";
      observer.observe(list);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
