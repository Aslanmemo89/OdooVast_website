/**
 * Builds public/odoovast-legal.html — one self-contained file holding the
 * Privacy Policy, Terms of Service and User Data Deletion notice in all three
 * languages. No network, no fonts, no scripts: it opens offline and prints to
 * PDF, which is what a regulator, a platform reviewer or a client asks for.
 *
 * It reads the pages Next has already rendered, so the file can never say
 * something different from the website.
 *
 *   node scripts/build-legal-file.mjs      (run after `next build`)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILD = ".next/server/app";
const OUT = "public/odoovast-legal.html";

const LOCALES = [
  { code: "en", dir: "ltr", label: "English" },
  { code: "ar", dir: "rtl", label: "العربية" },
  { code: "ckb", dir: "rtl", label: "کوردی" },
];

const DOCS = ["privacy", "terms", "data-deletion"];

/** Pulls one element and its children out of the rendered page. */
function extract(html, className) {
  const open = html.indexOf(`<div class="${className}"`);
  if (open === -1) return null;

  // Walk the tag stack from the opening <div> to its matching close.
  let depth = 0;
  const tag = /<(\/?)div\b[^>]*?(\/?)>/g;
  tag.lastIndex = open;

  for (let m = tag.exec(html); m; m = tag.exec(html)) {
    if (m[2] === "/") continue; // self-closing, never a div in practice
    depth += m[1] === "/" ? -1 : 1;
    if (depth === 0) return html.slice(open, m.index + m[0].length);
  }
  return null;
}

function text(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
}

const sections = [];

for (const locale of LOCALES) {
  for (const doc of DOCS) {
    const file = join(BUILD, locale.code, `${doc}.html`);
    if (!existsSync(file)) {
      console.error(`missing ${file} — run \`next build\` first`);
      process.exit(1);
    }

    const html = readFileSync(file, "utf8");
    const body = extract(html, "legal");
    if (!body) {
      console.error(`no .legal block in ${file}`);
      process.exit(1);
    }

    sections.push({
      locale,
      doc,
      h1: text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/),
      lead: text(html, /<p class="pagehead__lead"[^>]*>([\s\S]*?)<\/p>/),
      updated: text(html, /<time datetime="([^"]+)"/) || "",
      updatedLabel: text(html, /<time[^>]*>([\s\S]*?)<\/time>/),
      // The standalone file has no router; internal links would dangle.
      body: body.replace(/<a\b[^>]*href="\/(?:en|ar|ckb)\/[^"]*"[^>]*>([\s\S]*?)<\/a>/g, "$1"),
    });
  }
}

const css = `
:root { color-scheme: light; --ink:#12162a; --muted:#4a5170; --accent:#6b2fa0;
  --bg:#fff; --surface:#f7f6fb; --border:#e2e0ec; }
* { box-sizing: border-box; }
body { margin:0; background:var(--bg); color:var(--ink); line-height:1.65;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-width: 46rem; margin:0 auto; padding: 2.5rem 1.25rem 4rem; }
.masthead { border-bottom:2px solid var(--accent); padding-bottom:1.25rem; margin-bottom:2rem; }
.masthead h1 { font-size:1.5rem; margin:0 0 .35rem; }
.masthead p { margin:0; color:var(--muted); font-size:.9rem; }
.toc { background:var(--surface); border:1px solid var(--border); border-radius:.75rem;
  padding:1.25rem 1.5rem; margin-bottom:2.5rem; }
.toc h2 { font-size:.75rem; text-transform:uppercase; letter-spacing:.08em;
  color:var(--muted); margin:0 0 .75rem; }
.toc ul { margin:0; padding-inline-start:1.1rem; display:grid; gap:.4rem; }
.toc a { color:var(--accent); }
.doc { padding-top:2.5rem; margin-top:2.5rem; border-top:1px solid var(--border); }
.doc:first-of-type { border-top:0; margin-top:0; padding-top:0; }
.doc > h2 { font-size:1.35rem; margin:0 0 .4rem; }
.doc__meta { color:var(--muted); font-size:.85rem; margin:0 0 1.5rem; }
.legal__summary { background:var(--surface); border:1px solid var(--border);
  border-radius:.75rem; padding:1.25rem 1.5rem; }
.legal__summary h2 { font-size:.75rem; text-transform:uppercase; letter-spacing:.08em;
  color:var(--accent); margin:0 0 .75rem; }
.legal__summary ul { margin:0; padding-inline-start:1.1rem; display:grid; gap:.5rem; color:var(--muted); }
.legal__clauses { counter-reset: clause; list-style:none; padding:0; margin:2rem 0 0; }
.legal__clause { counter-increment: clause; padding-top:1.75rem; margin-top:1.75rem;
  border-top:1px solid var(--border); break-inside: avoid; }
.legal__clause:first-child { border-top:0; margin-top:0; padding-top:0; }
.legal__clause > h2 { font-size:1.05rem; margin:0 0 .6rem; }
.legal__clause > h2::before { content: counter(clause) ". "; color:var(--accent); }
.legal__clause p { color:var(--muted); margin:.6rem 0 0; }
.legal__points { margin:.85rem 0 0; padding-inline-start:1.1rem; display:grid; gap:.4rem; color:var(--muted); }
.legal__defs { margin:1rem 0 0; display:grid; gap:.85rem; }
.legal__defs dt { font-weight:600; }
.legal__defs dd { margin:.2rem 0 0; color:var(--muted); }
.legal__contact { margin-top:2rem; padding:1.25rem 1.5rem; border:1px solid var(--border);
  border-radius:.75rem; background:var(--surface); }
.legal__contact h2 { font-size:1rem; margin:0 0 .4rem; }
.legal__contact p { color:var(--muted); margin:.4rem 0 0; }
.legal__contact .btn-row { display:flex; flex-wrap:wrap; gap:.75rem; margin-top:1rem; }
.legal__contact a { color:var(--accent); font-weight:600; }
.legal__related, .legal__links { display:none; }
.ltr { direction:ltr; unicode-bidi:isolate; }
svg { display:none; }
[dir="rtl"] { text-align:right; }
@media print { .toc { break-after: page; } .doc { break-before: page; } .doc:first-of-type { break-before: auto; } }
`;

const docTitle = (s) => `${s.h1} — ${s.locale.label}`;

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>OdooVast — Privacy Policy, Terms of Service, User Data Deletion</title>
<style>${css}</style>
</head>
<body>
<div class="wrap">
  <header class="masthead">
    <h1>OdooVast — Legal Notices</h1>
    <p>Privacy Policy · Terms of Service · User Data Deletion — English, العربية, کوردی</p>
    <p>Odoo Partner, Erbil, Kurdistan Region, Iraq · info@odoovast.com · +964 751 239 9899 · www.odoovast.com</p>
  </header>

  <nav class="toc">
    <h2>Contents</h2>
    <ul>
${sections.map((s, i) => `      <li><a href="#d${i}">${docTitle(s)}</a></li>`).join("\n")}
    </ul>
  </nav>

${sections
  .map(
    (s, i) => `  <article class="doc" id="d${i}" lang="${s.locale.code}" dir="${s.locale.dir}">
    <h2>${s.h1}</h2>
    <p class="doc__meta">${s.lead}<br>${s.updatedLabel ? `${s.updatedLabel} (${s.updated})` : ""}</p>
    ${s.body}
  </article>`,
  )
  .join("\n\n")}
</div>
</body>
</html>
`;

writeFileSync(OUT, page, "utf8");
console.log(`wrote ${OUT} — ${sections.length} documents, ${(page.length / 1024).toFixed(0)} KB`);
