"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The hero's 3D scene: the OdooVast mark inside a sphere of brand-coloured
 * pixels — the squares from the mark itself — with Odoo apps on two orbits.
 *
 * Hand-written perspective projection onto two 2D canvases: the sphere's far
 * half is drawn behind the mark, its near half over it. No WebGL, no library.
 * The orbit chips are server-rendered children ([data-orbit]); this only
 * moves them.
 *
 * Nothing here moves for long on its own: the sphere assembles, turns for a
 * few seconds and comes to rest. After that it turns only as the page scrolls
 * or the mouse moves, and the loop sleeps whenever nothing is happening. One
 * still frame under reduced motion; off-screen and background tabs cost nothing.
 */

/** Lavender, periwinkle, white and the brand gold — light enough for the navy band. */
const PALETTE = ["#c9a2f2", "#9fb0ff", "#ffffff", "#ffd700"] as const;
const ALPHA_STEPS = 6;
/** Camera distance in sphere radii — lower means stronger perspective. */
const CAMERA = 3.4;
/**
 * Two orbits: radius (sphere radii), inclination and roll (radians), how fast
 * their chips follow the sphere's turn, and where the first chip starts. The
 * starts were searched so that at rest no two chips touch and none covers the
 * mark, on a desktop and on a phone alike.
 */
const RINGS = [
  { r: 1.36, inc: 1.22, roll: 0.42, follow: 1.4, start: 0.28 },
  { r: 1.6, inc: 0.42, roll: -0.2, follow: -0.9, start: 3.7 },
] as const;
/** Seconds after navigation start when the sphere assembles behind the opening doors. */
const AFTER_INTRO = 1.1;
const ASSEMBLE = 1.6;
/** After gathering, the sphere turns on its own for this long, slowing to rest —
    under five seconds of motion in all (WCAG 2.2.2). */
const SETTLE = 3.8;
const SPIN = 0.32;
/** Radians of turn per pixel scrolled. */
const SCROLL_TURN = 0.0022;
/** The pointer's trail of pixels: how many at once and how long each lives (ms). */
const TRAIL = 12;
const TRAIL_LIFE = 700;
/**
 * How the apps feed each other, by the chips' data-orbit names: goods into
 * Inventory (lavender, palette 0), money into Accounting (gold, palette 3).
 */
const LINKS = [
  ["sales", "inventory", 0],
  ["purchase", "inventory", 0],
  ["manufacturing", "inventory", 0],
  ["inventory", "accounting", 3],
  ["pos", "accounting", 3],
  ["sales", "accounting", 3],
] as const;

type Ring = (typeof RINGS)[number];
type Dot = { x: number; y: number; z: number; fx: number; fy: number; fz: number; tone: number };
type Spark = { x: number; y: number; vx: number; vy: number; born: number; tone: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (from: number, to: number, value: number) => {
  const k = clamp((value - from) / (to - from), 0, 1);
  return k * k * (3 - 2 * k);
};

/**
 * How far the sphere has turned by itself u seconds after it starts to
 * assemble: full speed while it gathers, then slowing smoothly to a stop.
 * A function of time rather than a running sum, so it always comes to rest
 * in the same pose.
 */
function selfTurn(u: number): number {
  if (u <= 0) return 0;
  const gather = ASSEMBLE / 2;
  if (u < gather) return SPIN * u;
  const k = Math.min(1, (u - gather) / SETTLE);
  return SPIN * (gather + (SETTLE / 3) * (1 - Math.pow(1 - k, 3)));
}

const REST_TURN = selfTurn(Number.POSITIVE_INFINITY);

export function HeroScene({ core, children }: { core: ReactNode; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const coreEl = coreRef.current;
    const canvases = [backRef.current, frontRef.current];
    const contexts = canvases.map((canvas) => canvas?.getContext("2d") ?? null);
    const [backCanvas, frontCanvas] = canvases;
    const [back, front] = contexts;
    if (!wrap || !coreEl || !backCanvas || !frontCanvas || !back || !front) return;
    const layers = [back, front] as const;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const chipEls = Array.from(wrap.querySelectorAll<HTMLElement>("[data-orbit]"));
    const perRing = Math.ceil(chipEls.length / RINGS.length);
    const chips = chipEls.map((el, i) => {
      const ring = i % RINGS.length;
      const start = RINGS[ring]?.start ?? 0;
      // Evenly spaced around their orbit from that orbit's start.
      return {
        el,
        app: el.dataset.orbit ?? "",
        ring,
        phase: start + (Math.floor(i / RINGS.length) / perRing) * Math.PI * 2,
      };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];

    const build = () => {
      const count = width < 520 ? 420 : 780;
      const golden = Math.PI * (3 - Math.sqrt(5));
      dots = [];
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const ring = Math.sqrt(1 - y * y);
        const theta = i * golden;
        // A cheap deterministic hash picks the colour and the scattered start point.
        const h = Math.sin(i * 12.9898) * 43758.5453;
        const rnd = h - Math.floor(h);
        const spread = 2.6 + rnd * 2.2;
        dots.push({
          x: Math.cos(theta) * ring,
          y,
          z: Math.sin(theta) * ring,
          fx: Math.cos(theta * 1.7 + rnd) * ring * spread,
          fy: y * spread,
          fz: Math.sin(theta * 1.3 - rnd) * ring * spread,
          tone: rnd < 0.05 ? 3 : rnd < 0.15 ? 2 : rnd < 0.57 ? 1 : 0,
        });
      }
    };

    const resize = () => {
      // The layout size, not the bounding box: the box is still mid-entrance
      // (scaled and turned) when this first runs.
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 520 ? 1.75 : 2);
      for (const canvas of [backCanvas, frontCanvas]) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
      build();
    };

    // The pointer, normalised to -0.5…0.5 across the scene, and in scene pixels.
    let targetX = 0;
    let targetY = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let lastInput = 0;
    let lastSparkX = -9999;
    let lastSparkY = -9999;
    const sparks: Spark[] = [];

    const buckets: number[][] = Array.from({ length: 2 * PALETTE.length * ALPHA_STEPS }, () => []);
    let tiltX = 0;
    let tiltY = 0;
    let last = 0;
    // Times are seconds since navigation start. The scene's clock starts when
    // its box starts moving in (the CSS entrance), so a late hydration joins a
    // timeline already running and all motion still ends within SETTLE of it.
    const introPlaying = document.documentElement.getAttribute("data-intro") === "play";
    const entrance = wrap.closest<HTMLElement>(".hero__visual")?.getAnimations()[0];
    const entranceDelay = Number(entrance?.effect?.getComputedTiming().delay ?? 0);
    const visualStart =
      typeof entrance?.startTime === "number"
        ? (entrance.startTime + entranceDelay) / 1000
        : performance.now() / 1000;
    const assembleFrom = introPlaying ? Math.max(AFTER_INTRO, visualStart) : visualStart;
    const restAt = assembleFrom + Math.max(ASSEMBLE, ASSEMBLE / 2 + SETTLE);

    const draw = (now: number) => {
      const t = now / 1000;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      const ease = 1 - Math.exp(-dt * 3.2);
      tiltX += (targetY - tiltX) * ease;
      tiltY += (targetX - tiltY) * ease;

      const progress = reduce ? 1 : clamp((t - assembleFrom) / ASSEMBLE, 0, 1);
      const assembled = 1 - Math.pow(1 - progress, 3);
      const turn = reduce ? REST_TURN : selfTurn(t - assembleFrom) + window.scrollY * SCROLL_TURN;

      const cx = width / 2;
      const cy = height / 2;
      // A little smaller on a phone, so the outer orbit's chips stay on screen.
      const radius = Math.min(width, height) * (width < 420 ? 0.26 : 0.3);
      const ay = 0.6 + turn + tiltY * 0.9;
      const ax = -0.32 + tiltX * 0.7;
      const sinY = Math.sin(ay);
      const cosY = Math.cos(ay);
      const sinX = Math.sin(ax);
      const cosX = Math.cos(ax);
      const pulse = Math.sin(t * 0.55) * 1.1;
      const magnet = 92;

      for (const bucket of buckets) bucket.length = 0;

      for (const d of dots) {
        const px = d.fx + (d.x - d.fx) * assembled;
        const py = d.fy + (d.y - d.fy) * assembled;
        const pz = d.fz + (d.z - d.fz) * assembled;
        const x1 = px * cosY + pz * sinY;
        const z1 = -px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;
        const s = CAMERA / (CAMERA - z2);
        let sx = cx + x1 * radius * s;
        let sy = cy - y2 * radius * s;

        const depth = clamp((z2 + 1) / 2, 0, 1);
        let alpha = 0.16 + 0.84 * Math.pow(depth, 1.6);
        let size = (z2 > 0 ? 2.1 : 1.6) * s;
        let tone = d.tone;

        // A slow band of light travels up and down the sphere while it moves.
        const band = Math.exp(-((y2 - pulse) * (y2 - pulse)) / 0.012);
        alpha = Math.min(1, alpha + band * 0.35);
        size += band * 0.9;

        if (z2 > 0) {
          // The near side thins out in front of the mark, so the mark reads clearly.
          alpha *= 0.15 + 0.85 * smoothstep(0.25, 0.8, Math.hypot(sx - cx, sy - cy) / radius);

          // Under the pointer the near side bulges out and sparks gold.
          const dx = sx - pointerX;
          const dy = sy - pointerY;
          const dist = Math.hypot(dx, dy);
          if (dist < magnet && dist > 0.01) {
            const k = (1 - dist / magnet) ** 2;
            sx += (dx / dist) * k * 18;
            sy += (dy / dist) * k * 18;
            size += k * 1.6;
            alpha = Math.min(1, alpha + k);
            if (k > 0.35) tone = 3;
          }
        }

        const step = Math.min(ALPHA_STEPS - 1, Math.floor(alpha * ALPHA_STEPS));
        const index = ((z2 > 0 ? 1 : 0) * PALETTE.length + tone) * ALPHA_STEPS + step;
        buckets[index]?.push(sx, sy, size);
      }

      layers.forEach((ctx, layer) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        // Orbits: the far arcs on the back canvas, the near arcs on the front one.
        ctx.lineWidth = 1;
        ctx.strokeStyle = PALETTE[0];
        ctx.globalAlpha = (layer === 1 ? 0.4 : 0.16) * assembled;
        for (const ring of RINGS) {
          ctx.beginPath();
          let pen = false;
          for (let i = 0; i <= 160; i++) {
            const p = ringPoint(ring, (i / 160) * Math.PI * 2, ax, tiltY);
            const s = CAMERA / (CAMERA - p.z);
            const sx = cx + p.x * radius * s;
            const sy = cy - p.y * radius * s;
            if ((layer === 1) === p.z > 0) {
              if (pen) ctx.lineTo(sx, sy);
              else ctx.moveTo(sx, sy);
              pen = true;
            } else {
              pen = false;
            }
          }
          ctx.stroke();
        }

        for (let tone = 0; tone < PALETTE.length; tone++) {
          ctx.fillStyle = PALETTE[tone] ?? PALETTE[0];
          for (let step = 0; step < ALPHA_STEPS; step++) {
            const bucket = buckets[(layer * PALETTE.length + tone) * ALPHA_STEPS + step];
            if (!bucket || bucket.length === 0) continue;
            ctx.globalAlpha = (step + 1) / ALPHA_STEPS;
            for (let i = 0; i + 2 < bucket.length; i += 3) {
              const size = bucket[i + 2] ?? 0;
              ctx.fillRect((bucket[i] ?? 0) - size / 2, (bucket[i + 1] ?? 0) - size / 2, size, size);
            }
          }
        }
      });

      // The pointer's trail: loose pixels that drift up and fade.
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        if (!spark) continue;
        const life = (now - spark.born) / TRAIL_LIFE;
        if (life >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        const size = 5 * (1 - life * 0.5);
        front.globalAlpha = 1 - life;
        front.fillStyle = PALETTE[spark.tone] ?? PALETTE[0];
        front.fillRect(spark.x - size / 2, spark.y - size / 2, size, size);
      }

      // Chips ride the orbits, scaled and layered by depth.
      const spots = new Map<string, { x: number; y: number }>();
      for (const chip of chips) {
        const ring = RINGS[chip.ring] ?? RINGS[0];
        const p = ringPoint(ring, chip.phase + turn * ring.follow, ax, tiltY);
        const s = CAMERA / (CAMERA - p.z);
        const near = p.z > -0.2;
        const sx = cx + p.x * radius * s;
        const sy = cy - p.y * radius * s;
        spots.set(chip.app, { x: sx, y: sy });
        chip.el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(0.62 + 0.32 * s).toFixed(3)})`;
        chip.el.style.opacity = ((near ? 1 : 0.42) * assembled).toFixed(3);
        chip.el.style.zIndex = near ? "4" : "1";
      }

      // The apps are one system: faint links bowing through the sphere, and —
      // while anything moves — packets of light running along them, gold
      // where money flows into Accounting, lavender where goods flow into
      // Inventory. At rest the packets have faded and only the links remain.
      const flow = reduce
        ? 0
        : assembled *
          Math.max(clamp((restAt - t) / 0.8, 0, 1), clamp(1 - (now - lastInput) / 1400, 0, 1));
      back.lineWidth = 1;
      back.setLineDash([3, 6]);
      LINKS.forEach(([from, to, tone], i) => {
        const a = spots.get(from);
        const b = spots.get(to);
        if (!a || !b) return;
        // The curve bends toward the centre, so the links pass through the sphere.
        const qx = (a.x + b.x) / 2 + (cx - (a.x + b.x) / 2) * 0.45;
        const qy = (a.y + b.y) / 2 + (cy - (a.y + b.y) / 2) * 0.45;
        back.globalAlpha = 0.22 * assembled;
        back.strokeStyle = PALETTE[tone];
        back.beginPath();
        back.moveTo(a.x, a.y);
        back.quadraticCurveTo(qx, qy, b.x, b.y);
        back.stroke();
        if (flow <= 0.01) return;
        const head = (t * 0.32 + i * 0.17) % 1;
        for (let k = 0; k < 4; k++) {
          const u = head - k * 0.025;
          if (u < 0) break;
          const v = 1 - u;
          const px = v * v * a.x + 2 * v * u * qx + u * u * b.x;
          const py = v * v * a.y + 2 * v * u * qy + u * u * b.y;
          front.globalAlpha = flow * (k === 0 ? 1 : 0.45 / k);
          front.fillStyle = PALETTE[tone];
          front.beginPath();
          front.arc(px, py, k === 0 ? 2.6 : 1.8, 0, Math.PI * 2);
          front.fill();
        }
        // A soft halo around the head of each packet.
        front.globalAlpha = flow * 0.25;
        front.beginPath();
        const v = 1 - head;
        front.arc(
          v * v * a.x + 2 * v * head * qx + head * head * b.x,
          v * v * a.y + 2 * v * head * qy + head * head * b.y,
          7,
          0,
          Math.PI * 2,
        );
        front.fill();
      });
      back.setLineDash([]);

      // The mark turns toward the pointer like a real object would.
      coreEl.style.setProperty("--ry", `${(tiltY * 46).toFixed(2)}deg`);
      coreEl.style.setProperty("--rx", `${(-tiltX * 40).toFixed(2)}deg`);
    };

    let raf = 0;
    let visible = true;
    // Keep drawing only while something is still changing.
    const busy = (now: number) =>
      now / 1000 < restAt ||
      now - lastInput < 1500 ||
      sparks.length > 0 ||
      Math.abs(targetX - tiltY) + Math.abs(targetY - tiltX) > 0.002;
    const loop = (now: number) => {
      draw(now);
      raf = visible && !document.hidden && busy(now) ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (raf || reduce || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    // The turn follows the pointer across the whole hero band, so reading the
    // headline turns the sphere a little, not all the way.
    const band = wrap.closest("section") ?? wrap;
    let clientX = -9999;
    let clientY = -9999;
    // Where the pointer is in scene pixels (the layout size the canvases use),
    // so the bulge sits under it even while the box is still scaled.
    const locate = () => {
      const rect = wrap.getBoundingClientRect();
      const x = ((clientX - rect.left) * width) / (rect.width || 1);
      const y = ((clientY - rect.top) * height) / (rect.height || 1);
      const inside = x >= 0 && y >= 0 && x <= width && y <= height;
      pointerX = inside ? x : -9999;
      pointerY = inside ? y : -9999;
      return inside;
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const area = band.getBoundingClientRect();
      // Only react while the pointer is somewhere near the hero.
      if (event.clientY > area.bottom + 200) return;
      clientX = event.clientX;
      clientY = event.clientY;
      targetX = clamp((clientX - area.left) / area.width - 0.5, -0.5, 0.5);
      targetY = clamp((clientY - area.top) / area.height - 0.5, -0.5, 0.5);
      const inside = locate();
      const x = pointerX;
      const y = pointerY;
      if (inside && Math.hypot(x - lastSparkX, y - lastSparkY) > 16) {
        lastSparkX = x;
        lastSparkY = y;
        if (sparks.length >= TRAIL) sparks.shift();
        const r = Math.random();
        sparks.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 40,
          vy: -25 - Math.random() * 35,
          born: performance.now(),
          tone: r < 0.35 ? 3 : r < 0.7 ? 0 : 1,
        });
      }
      lastInput = performance.now();
      wake();
    };

    const onScroll = () => {
      // The page moved under a resting pointer: find it again in the scene.
      if (mouse) locate();
      lastInput = performance.now();
      wake();
    };

    // The pointer left the window: let the sphere drift back to its rest pose.
    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      clientX = clientY = pointerX = pointerY = -9999;
      targetX = targetY = 0;
      wake();
    };

    resize();
    if (reduce) draw(performance.now());
    else wake();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) wake();
    });
    io.observe(wrap);

    const onVisibility = () => {
      if (!document.hidden) wake();
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      if (mouse) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("pointerout", onOut, { passive: true });
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <div ref={wrapRef} className="scene" aria-hidden="true">
      <canvas ref={backRef} className="scene__canvas" />
      <div ref={coreRef} className="scene__core">
        {core}
      </div>
      <canvas ref={frontRef} className="scene__canvas scene__canvas--front" />
      {children}
    </div>
  );
}

/** A point on an orbit after the view's tilt — the orbits do not spin with the sphere. */
function ringPoint(ring: Ring, theta: number, ax: number, tiltY: number) {
  // The orbit starts flat in the x-z plane, is inclined about x and rolled about z…
  const bx = Math.cos(theta) * ring.r;
  const bz = Math.sin(theta) * ring.r;
  const iy = -bz * Math.sin(ring.inc);
  const iz = bz * Math.cos(ring.inc);
  const rx = bx * Math.cos(ring.roll) - iy * Math.sin(ring.roll);
  const ry = bx * Math.sin(ring.roll) + iy * Math.cos(ring.roll);
  // …then follows the pointer's turn and the view's tilt.
  const ay = tiltY * 0.9;
  const x1 = rx * Math.cos(ay) + iz * Math.sin(ay);
  const z1 = -rx * Math.sin(ay) + iz * Math.cos(ay);
  const y2 = ry * Math.cos(ax) - z1 * Math.sin(ax);
  const z2 = ry * Math.sin(ax) + z1 * Math.cos(ax);
  return { x: x1, y: y2, z: z2 };
}
