import type { ReactNode } from "react";

/**
 * Scroll reveal with no JavaScript at all — the animation is driven by
 * `animation-timeline: view()` in globals.css. Browsers without scroll-driven
 * animations, and anyone who prefers reduced motion, simply see the content.
 * It is always in the HTML, so crawlers and no-JS visitors never miss it.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}
