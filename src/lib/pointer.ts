/**
 * The pointer engine — loaded by PointerFx only on devices with a mouse,
 * once the page is idle. Elements opt in with a data attribute and draw the
 * effect themselves in CSS from the variables written here:
 *
 *   data-tilt="8"    --rx / --ry (deg, at most ±8 here) and --px / --py (%)
 *                    while hovered, plus .is-tilting — the element turns
 *   data-turn="20"   the same variables and .is-turning, but the element stays
 *                    put — something inside it turns (the page-head mark)
 *   data-magnetic    --mx / --my (px, at most ±6) while hovered; frozen while
 *                    a button is held, so the click lands where it was aimed
 *   data-glow        --gx / --gy (px) on every [data-glow] in the hovered
 *                    [data-glow-group], so light runs along a whole grid
 *   data-spotlight   --sx / --sy (px) and .is-lit — a light inside a dark band
 *   data-lens        the same, for the faint lens on light sections
 *
 * One animation frame per pointer move or scroll at most; every frame reads
 * all the geometry it needs before writing anything, and nothing runs while
 * the pointer and the page are still.
 */

type Hovered = { el: HTMLElement; rect: DOMRect; scrollY: number };

const TILT_VARS = ["--rx", "--ry", "--px", "--py"] as const;
const MAGNET_VARS = ["--mx", "--my"] as const;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function startPointerEngine(): () => void {
  const root = document.documentElement;
  root.setAttribute("data-pointer", "fine");

  let x = 0;
  let y = 0;
  let inWindow = false;
  let raf = 0;
  let pressed = false;
  // After a scroll the element under a resting pointer may have changed.
  let rehit = false;
  let magnetStale = false;
  let tilt: Hovered | null = null;
  let magnet: Hovered | null = null;
  let group: HTMLElement | null = null;
  let spot: HTMLElement | null = null;

  const set = (el: HTMLElement, name: string, value: string) => el.style.setProperty(name, value);
  const clear = (el: HTMLElement, names: readonly string[], cls: string) => {
    el.classList.remove(cls);
    for (const name of names) el.style.removeProperty(name);
  };
  // Measured on arrival, before any transform is applied to it.
  const measure = (el: HTMLElement): Hovered => ({
    el,
    rect: el.getBoundingClientRect(),
    scrollY: window.scrollY,
  });
  const tiltClass = (el: HTMLElement) => (el.hasAttribute("data-turn") ? "is-turning" : "is-tilting");
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  function releaseMagnet() {
    if (magnet) clear(magnet.el, MAGNET_VARS, "is-magnet");
    magnet = null;
  }

  function releaseAll() {
    if (tilt) clear(tilt.el, TILT_VARS, tiltClass(tilt.el));
    releaseMagnet();
    spot?.classList.remove("is-lit");
    tilt = null;
    group = null;
    spot = null;
  }

  /** Which effects the element under the pointer belongs to. */
  function resolve(target: Element | null) {
    const nextTilt = target?.closest<HTMLElement>("[data-tilt], [data-turn]") ?? null;
    if (nextTilt !== (tilt?.el ?? null)) {
      if (tilt) clear(tilt.el, TILT_VARS, tiltClass(tilt.el));
      tilt = nextTilt ? measure(nextTilt) : null;
      nextTilt?.classList.add(tiltClass(nextTilt));
    }

    // While a button is held the magnet keeps its place, so the press and the
    // release land on the same element.
    if (!pressed) {
      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== (magnet?.el ?? null)) {
        releaseMagnet();
        magnet = nextMagnet ? measure(nextMagnet) : null;
        nextMagnet?.classList.add("is-magnet");
      }
    }

    group = target?.closest<HTMLElement>("[data-glow-group]") ?? null;

    const nextSpot = target?.closest<HTMLElement>("[data-spotlight], [data-lens]") ?? null;
    if (nextSpot !== spot) {
      spot?.classList.remove("is-lit");
      spot = nextSpot;
      spot?.classList.add("is-lit");
    }
  }

  function onMove(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    x = event.clientX;
    y = event.clientY;
    inWindow = true;
    pressed = (event.buttons & 1) === 1;
    resolve(event.target instanceof Element ? event.target : null);
    schedule();
  }

  function frame() {
    raf = 0;

    // Read…
    const scrollY = window.scrollY;
    if (rehit && inWindow) resolve(document.elementFromPoint(x, y));
    rehit = false;
    if (magnet && magnetStale) {
      // Re-measured, minus its own pull: fixed and sticky buttons do not move
      // with the page, so a scroll offset alone would be wrong for them.
      const r = magnet.el.getBoundingClientRect();
      const mx = parseFloat(magnet.el.style.getPropertyValue("--mx")) || 0;
      const my = parseFloat(magnet.el.style.getPropertyValue("--my")) || 0;
      magnet = { el: magnet.el, rect: new DOMRect(r.x - mx, r.y - my, r.width, r.height), scrollY };
    }
    magnetStale = false;
    const glowEls = group ? Array.from(group.querySelectorAll<HTMLElement>("[data-glow]")) : [];
    const glowRects = glowEls.map((el) => el.getBoundingClientRect());
    const spotRect = spot?.getBoundingClientRect() ?? null;

    // …then write.
    if (tilt) {
      const { el, rect } = tilt;
      const top = rect.top - (scrollY - tilt.scrollY);
      const px = clamp((x - rect.left) / rect.width, 0, 1);
      const py = clamp((y - top) / rect.height, 0, 1);
      const max = Number(el.dataset.tilt ?? el.dataset.turn) || 8;
      set(el, "--rx", `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
      set(el, "--ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
      set(el, "--px", `${(px * 100).toFixed(1)}%`);
      set(el, "--py", `${(py * 100).toFixed(1)}%`);
    }

    if (magnet && !pressed) {
      const { el, rect } = magnet;
      const top = rect.top - (scrollY - magnet.scrollY);
      set(el, "--mx", `${clamp((x - rect.left - rect.width / 2) * 0.25, -6, 6).toFixed(1)}px`);
      set(el, "--my", `${clamp((y - top - rect.height / 2) * 0.3, -5, 5).toFixed(1)}px`);
    }

    glowEls.forEach((el, i) => {
      const rect = glowRects[i];
      if (!rect) return;
      set(el, "--gx", `${(x - rect.left).toFixed(0)}px`);
      set(el, "--gy", `${(y - rect.top).toFixed(0)}px`);
    });

    if (spot && spotRect) {
      set(spot, "--sx", `${(x - spotRect.left).toFixed(0)}px`);
      set(spot, "--sy", `${(y - spotRect.top).toFixed(0)}px`);
    }
  }

  function onLeave(event: PointerEvent) {
    if (event.relatedTarget) return;
    inWindow = false;
    releaseAll();
  }

  function onDown(event: PointerEvent) {
    if (event.button === 0) pressed = true;
  }

  // However a press ends — release, cancel, a native drag, or the window
  // losing focus — the magnets come back.
  function onUp() {
    pressed = false;
  }

  function onScroll() {
    if (!inWindow) return;
    rehit = true;
    if (magnet) magnetStale = true;
    schedule();
  }

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onLeave, { passive: true });
  document.addEventListener("pointerdown", onDown, { passive: true });
  document.addEventListener("pointerup", onUp, { passive: true });
  document.addEventListener("pointercancel", onUp, { passive: true });
  document.addEventListener("dragend", onUp, { passive: true });
  window.addEventListener("blur", onUp);
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    releaseAll();
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onLeave);
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("pointerup", onUp);
    document.removeEventListener("pointercancel", onUp);
    document.removeEventListener("dragend", onUp);
    window.removeEventListener("blur", onUp);
    window.removeEventListener("scroll", onScroll);
    root.removeAttribute("data-pointer");
  };
}
