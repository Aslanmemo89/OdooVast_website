import type { CSSProperties } from "react";

import { Mark3D } from "@/components/Mark3D";
import { company } from "@/content/company";
import { t, type Locale } from "@/lib/i18n";

/**
 * Runs before first paint and stores nothing — the privacy policy promises
 * the site saves nothing in the browser. The opening plays only when someone
 * arrives fresh from outside the site: a normal navigation (not a reload or
 * back/forward), no same-site referrer, no #anchor, a visible tab, and
 * neither reduced motion nor Save-Data. Any click, key, wheel or touch skips
 * it. Without JavaScript the overlay never shows (it is display:none until
 * data-intro is set). States: play → done, or play → skip → skipped; either
 * way the attribute is removed once the hero has settled, so a later return
 * to the home page starts its entrance at once. The end follows the
 * animation clock (intro-gone), with a timer only as a fallback.
 */
const SCRIPT = `(function(){try{
var d=document.documentElement,n=performance.getEntriesByType('navigation')[0],r=document.referrer,c=navigator.connection;
if(matchMedia('(prefers-reduced-motion: reduce)').matches||(c&&c.saveData)||location.hash||document.visibilityState!=='visible'||document.prerendering)return;
if(n&&n.type!=='navigate')return;
if(r){try{if(new URL(r).origin===location.origin)return}catch(e){}}
d.setAttribute('data-intro','play');
var set=function(v){d.setAttribute('data-intro',v)};
var clear=function(){setTimeout(function(){var s=d.getAttribute('data-intro');if(s==='done'||s==='skipped')d.removeAttribute('data-intro')},1500)};
var done=function(){if(d.getAttribute('data-intro')!=='play')return;set('done');clear()};
var skip=function(){if(d.getAttribute('data-intro')!=='play')return;set('skip');setTimeout(function(){set('skipped');clear()},400)};
['pointerdown','keydown','wheel','touchstart'].forEach(function(e){addEventListener(e,skip,{once:true,passive:true})});
addEventListener('animationend',function(e){if(e.animationName==='intro-gone')done()});
setTimeout(done,4000);
}catch(e){}})();`;

const WORD = ["O", "d", "o", "o", "V", "a", "s", "t"];

/** Where each loose pixel starts, in px (x, y, depth) — they all fly into the mark's pixel trail. */
const PIXELS = [
  [-300, -140, 220],
  [-360, 70, -260],
  [-200, 190, 300],
  [260, -200, -180],
  [330, 140, 240],
  [-80, -260, 340],
  [150, 240, -300],
  [-420, -20, 140],
  [400, -50, -340],
  [60, 290, 200],
] as const;

/**
 * The opening sequence on the home page: the mark flies in from depth and
 * turns to face you, the name stands up, then two doors swing open into the
 * site. About 1.9 s and once. Only the closed doors catch a click (which
 * skips); once they part, clicks reach the page behind them.
 */
export function Intro({ locale }: { locale: Locale }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <div className="intro" aria-hidden="true">
        <span className="intro__door intro__door--a" />
        <span className="intro__door intro__door--b" />
        <div className="intro__stage">
          {PIXELS.map(([x, y, z], i) => (
            <span
              key={i}
              className="intro__pixel"
              style={{ "--x": `${x}px`, "--y": `${y}px`, "--z": `${z}px`, "--i": i } as CSSProperties}
            />
          ))}
          <Mark3D className="intro__mark" />
          <p className="intro__word" dir="ltr">
            {WORD.map((letter, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties}>
                {letter}
              </span>
            ))}
          </p>
          <p className="intro__tag">{t(company.tagline, locale)}</p>
          <span className="intro__bar" />
        </div>
      </div>
    </>
  );
}
