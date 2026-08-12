import type { ReactNode } from "react";

/**
 * Every icon on the site, hand-drawn as inline SVG on a 24x24 grid.
 * Monoline icons inherit `currentColor` and the surrounding font colour;
 * the three social glyphs are filled because that is how those marks are drawn.
 */
type Glyph = { filled?: true; body: ReactNode };

const glyphs = {
  /* ------------------------------------------------------------- services */
  implementation: {
    body: (
      <>
        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
        <path d="m3 12 9 4.5L21 12" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
  },
  code: {
    body: (
      <>
        <path d="m8.5 17.5-5.5-5.5 5.5-5.5" />
        <path d="m15.5 6.5 5.5 5.5-5.5 5.5" />
      </>
    ),
  },
  integration: {
    body: (
      <>
        <path d="M10.2 13.8a4.6 4.6 0 0 0 6.5 0l2.6-2.6a4.6 4.6 0 0 0-6.5-6.5l-1.5 1.5" />
        <path d="M13.8 10.2a4.6 4.6 0 0 0-6.5 0l-2.6 2.6a4.6 4.6 0 0 0 6.5 6.5l1.5-1.5" />
      </>
    ),
  },
  support: {
    body: (
      <>
        <path d="M4 13.5V12a8 8 0 0 1 16 0v1.5" />
        <path d="M4 13.5h2.2a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H6a2 2 0 0 1-2-2v-4Z" />
        <path d="M20 13.5h-2.2a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h.2a2 2 0 0 0 2-2v-4Z" />
      </>
    ),
  },
  website: {
    body: (
      <>
        <rect x="2.75" y="4" width="18.5" height="16" rx="2.2" />
        <path d="M2.75 9h18.5" />
        <path d="M6 6.5h.01M8.5 6.5h.01M11 6.5h.01" />
      </>
    ),
  },
  accounting: {
    body: (
      <>
        <rect x="5" y="2.75" width="14" height="18.5" rx="2.2" />
        <path d="M8.5 7h7" />
        <path d="M8.75 12h.01M12 12h.01M15.25 12h.01M8.75 16.25h.01M12 16.25h.01M15.25 16.25h.01" />
      </>
    ),
  },
  sales: {
    body: (
      <>
        <path d="M3 17.5 9.5 11l3.5 3.5L21 6.5" />
        <path d="M15.5 6.5H21v5.5" />
      </>
    ),
  },
  purchase: {
    body: (
      <>
        <path d="M2.5 3.5h2.7l2.3 11.1a1.9 1.9 0 0 0 1.9 1.5h7.4a1.9 1.9 0 0 0 1.9-1.5L21 7.5H6" />
        <circle cx="9.5" cy="20" r="1.4" />
        <circle cx="17.5" cy="20" r="1.4" />
      </>
    ),
  },
  inventory: {
    body: (
      <>
        <path d="M3.5 7.75 12 3.5l8.5 4.25v8.5L12 20.5l-8.5-4.25v-8.5Z" />
        <path d="m3.5 7.75 8.5 4.25 8.5-4.25" />
        <path d="M12 12v8.5" />
      </>
    ),
  },
  manufacturing: {
    body: (
      <>
        <path d="M3 21V10.5l5.5 3.5V10.5L14 14V6.5l7 4.5V21" />
        <path d="M2.5 21h19" />
        <path d="M7 17.5h1.5M12.5 17.5H14M18 17.5h.5" />
      </>
    ),
  },
  pos: {
    body: (
      <>
        <rect x="5" y="2.75" width="14" height="8" rx="1.6" />
        <path d="M3 11h18v6.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5V11Z" />
        <path d="M8.5 15.5h5" />
      </>
    ),
  },

  /* ----------------------------------------------------------- industries */
  distribution: {
    body: (
      <>
        <path d="M2.75 6.5h10.5v10H2.75z" />
        <path d="M13.25 10h3.9l3.6 3.4v3.1h-7.5" />
        <circle cx="7" cy="18.5" r="1.7" />
        <circle cx="17" cy="18.5" r="1.7" />
      </>
    ),
  },
  fashion: {
    body: (
      <>
        <path d="M8.75 3 5 5.2 2.9 9.3l3.35 1.7V21h11.5V11l3.35-1.7L19 5.2 15.25 3a3.3 3.3 0 0 1-6.5 0Z" />
      </>
    ),
  },
  restaurant: {
    body: (
      <>
        <path d="M5 3v6a2.6 2.6 0 0 0 5.2 0V3" />
        <path d="M7.6 11.6V21" />
        <path d="M17.6 3c1.6 1.1 2.4 3 2.4 5.2 0 1.9-.9 3.2-2.4 3.6V21" />
      </>
    ),
  },
  logistics: {
    body: (
      <>
        <path d="M3 21V9.2L12 3l9 6.2V21" />
        <path d="M2.5 21h19" />
        <path d="M9 21v-6.5h6V21" />
      </>
    ),
  },

  /* ------------------------------------------------------- selling points */
  partner: {
    body: (
      <>
        <circle cx="12" cy="9" r="5.5" />
        <path d="m8.2 13.6-1.4 7.4L12 18.4l5.2 2.6-1.4-7.4" />
      </>
    ),
  },
  team: {
    body: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
        <path d="M16.2 5.4a3.2 3.2 0 0 1 0 5.6" />
        <path d="M17.6 14.4A6.2 6.2 0 0 1 21.2 20" />
      </>
    ),
  },
  enterprise: {
    body: (
      <>
        <path d="M4 21V5.2A2.2 2.2 0 0 1 6.2 3h5.6A2.2 2.2 0 0 1 14 5.2V21" />
        <path d="M14 9.5h3.8A2.2 2.2 0 0 1 20 11.7V21" />
        <path d="M2.75 21h18.5" />
        <path d="M7.5 7.5h3M7.5 11.5h3M7.5 15.5h3M17 14h.01M17 17.5h.01" />
      </>
    ),
  },
  honest: {
    body: (
      <>
        <path d="M12 3 4.75 5.9v5.8c0 4.4 3.1 7.7 7.25 8.8 4.15-1.1 7.25-4.4 7.25-8.8V5.9L12 3Z" />
        <path d="m9.2 11.8 2 2 3.6-3.8" />
      </>
    ),
  },
  training: {
    body: (
      <>
        <path d="M2.5 8.5 12 4l9.5 4.5L12 13 2.5 8.5Z" />
        <path d="M6.5 10.6v4.9c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.9" />
        <path d="M21.5 8.5V14" />
      </>
    ),
  },

  /* ----------------------------------------------------------------- ui */
  check: { body: <path d="m4.8 12.4 4.9 4.9L19.2 6.7" /> },
  problem: {
    body: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.5 12h7" />
      </>
    ),
  },
  arrow: {
    body: (
      <>
        <path d="M4 12h14.5" />
        <path d="m13 6.2 6.2 5.8-6.2 5.8" />
      </>
    ),
  },
  phone: {
    body: (
      <path d="M6.4 3h3.1l1.5 4.4-2 1.5a12.3 12.3 0 0 0 6.1 6.1l1.5-2 4.4 1.5v3.1a2 2 0 0 1-2.2 2A17.6 17.6 0 0 1 4.4 5.2 2 2 0 0 1 6.4 3Z" />
    ),
  },
  mail: {
    body: (
      <>
        <rect x="2.5" y="4.75" width="19" height="14.5" rx="2.2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  pin: {
    body: (
      <>
        <path d="M12 21.2s7-6.3 7-11.1a7 7 0 1 0-14 0c0 4.8 7 11.1 7 11.1Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  clock: {
    body: (
      <>
        <circle cx="12" cy="12" r="8.75" />
        <path d="M12 6.75v5.6l3.4 2" />
      </>
    ),
  },
  globe: {
    body: (
      <>
        <circle cx="12" cy="12" r="8.75" />
        <path d="M3.25 12h17.5" />
        <path d="M12 3.25c2.4 2.4 3.6 5.3 3.6 8.75S14.4 18.35 12 20.75c-2.4-2.4-3.6-5.3-3.6-8.75S9.6 5.65 12 3.25Z" />
      </>
    ),
  },
  menu: { body: <path d="M4 7h16M4 12h16M4 17h16" /> },
  download: {
    body: (
      <>
        <path d="M12 3.5v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M4 20.5h16" />
      </>
    ),
  },
  alert: {
    body: (
      <>
        <path d="M12 3.75 2.6 20.25h18.8L12 3.75Z" />
        <path d="M12 10v4.2" />
        <path d="M12 17.4h.01" />
      </>
    ),
  },
  spark: {
    body: (
      <>
        <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9 12 3.5Z" />
      </>
    ),
  },

  /* -------------------------------------------------------------- social */
  whatsapp: {
    filled: true,
    body: (
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.83c0 1.94.55 3.75 1.5 5.29L2 22l5.02-1.64a9.8 9.8 0 0 0 5.02 1.38h.01c5.43 0 9.84-4.4 9.84-9.83A9.75 9.75 0 0 0 19 4.87 9.75 9.75 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09 1.01 1.02-3.01-.2-.31a8.1 8.1 0 0 1-1.25-4.35c0-4.5 3.68-8.17 8.2-8.17a8.14 8.14 0 0 1 8.18 8.18c0 4.51-3.67 8.17-8.19 8.17Zm4.49-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    ),
  },
  linkedin: {
    filled: true,
    body: (
      <path d="M20.45 2H3.55A1.53 1.53 0 0 0 2 3.5v17A1.53 1.53 0 0 0 3.55 22h16.9A1.53 1.53 0 0 0 22 20.5v-17A1.53 1.53 0 0 0 20.45 2ZM8.12 18.75H5.16V9.5h2.96v9.25ZM6.64 8.24a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.2 10.51h-2.96v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58H9.7V9.5h2.84v1.27h.04a3.11 3.11 0 0 1 2.8-1.54c3 0 3.55 1.97 3.55 4.54v4.98Z" />
    ),
  },
  facebook: {
    filled: true,
    body: (
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.44 2.9h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    ),
  },
  instagram: {
    body: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.2 6.8h.01" />
      </>
    ),
  },
} satisfies Record<string, Glyph>;

export type IconName = keyof typeof glyphs;

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  /** Only set when the icon carries meaning no nearby text already carries. */
  title?: string;
};

export function Icon({ name, size = 24, className, title }: Props) {
  const glyph: Glyph = glyphs[name];
  const filled = glyph.filled === true;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {glyph.body}
    </svg>
  );
}
