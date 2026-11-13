import { Suspense, lazy, useCallback, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { carousel } from "../data/content";
import { ScrollTrigger, gsap, reducedMotion } from "../lib/motion";
import type { RibbonState } from "./CurvedCarouselScene";
import { GlitchText } from "./GlitchText";
import { SceneBoundary } from "./SceneBoundary";

const CurvedCarouselScene = lazy(() => import("./CurvedCarouselScene"));

const { items } = carousel;
const LAST = items.length - 1;
const IMAGES = items.map((item) => item.image);
// One card step spans roughly this fraction of the canvas height on screen.
const STEP_PER_HEIGHT = 1.1;

const clamp = (value: number) => Math.min(LAST, Math.max(0, value));
const pad = (value: number) => String(value).padStart(2, "0");

export const CurvedCarousel = () => {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const state = useRef<RibbonState>({ target: 0, current: 0, velocity: 0 });
  const drag = useRef({ active: false, startX: 0, startTarget: 0, lastX: 0, lastTime: 0, speed: 0 });
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [mounted, setMounted] = useState(false);
  // True once the WebGL scene has failed; a flat image of the active project is shown instead.
  const [, setFlat] = useState(false);
  const flatRef = useRef(false);
  const onSceneError = useCallback(() => {
    flatRef.current = true;
    setFlat(true);
  }, []);
  // Without the scene nothing reports the active card, so derive it from the target.
  const syncFlat = () => {
    if (flatRef.current) setActive(Math.round(state.current.target));
  };

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "+=260%",
        onUpdate: (self) => {
          if (!drag.current.active) state.current.target = self.progress * LAST;
          syncFlat();
        },
      });
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setRunning(self.isActive),
      });
      // Start fetching the WebGL bundle a few screens before the section arrives.
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: () => `top bottom+=${Math.round(window.innerHeight * 3)}px`,
        once: true,
        onEnter: () => setMounted(true),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onActive = useCallback((index: number) => setActive(index), []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      startX: event.clientX,
      startTarget: state.current.target,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      speed: 0,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const stepPx = event.currentTarget.clientHeight * STEP_PER_HEIGHT;
    const elapsed = Math.max(1, event.timeStamp - d.lastTime);
    d.speed = (event.clientX - d.lastX) / elapsed;
    d.lastX = event.clientX;
    d.lastTime = event.timeStamp;
    state.current.target = clamp(d.startTarget - (event.clientX - d.startX) / stepPx);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const stepPx = event.currentTarget.clientHeight * STEP_PER_HEIGHT;
    // A click (no real drag) opens the project under the pointer.
    if (Math.abs(event.clientX - d.startX) < 6) {
      const box = event.currentTarget.getBoundingClientRect();
      const offset = flatRef.current ? 0 : (event.clientX - (box.left + box.width / 2)) / stepPx;
      const centre = flatRef.current ? state.current.target : state.current.current;
      const clicked = items[clamp(Math.round(centre + offset))];
      window.open(clicked.href, "_blank", "noopener,noreferrer");
      return;
    }
    // Throw the ribbon with its release speed, then settle on the nearest card.
    state.current.target = clamp(Math.round(state.current.target - (d.speed * 220) / stepPx));
    syncFlat();
  };

  const step = (direction: number) => {
    state.current.target = clamp(Math.round(state.current.target) + direction);
    syncFlat();
  };

  const item = items[active];

  return (
    <section ref={rootRef} id="landing-pages" className="aw-carousel aw-light">
      <div ref={pinRef} className="aw-carousel-pin">
        <GlitchText text={carousel.heading} className="aw-carousel-title" />

        {reducedMotion ? (
          <div className="aw-strip">
            {items.map((entry) => (
              <a key={entry.title} href={entry.href} target="_blank" rel="noreferrer" className="aw-strip-item">
                <img src={entry.image} alt="" loading="lazy" />
                <span className="aw-carousel-name">{entry.title}</span>
                <span className="aw-eyebrow">{entry.subtitle}</span>
              </a>
            ))}
          </div>
        ) : (
          <>
            <div
              className="aw-carousel-canvas"
              data-cursor="drag"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {mounted && (
                <SceneBoundary
                  onError={onSceneError}
                  fallback={
                    <div className="aw-carousel-flat">
                      <img key={active} src={item.image} alt="" />
                    </div>
                  }
                >
                  <Suspense fallback={null}>
                    <CurvedCarouselScene images={IMAGES} state={state} onActive={onActive} running={running} />
                  </Suspense>
                </SceneBoundary>
              )}
            </div>

            <div className="aw-carousel-info" aria-live="polite">
              <div key={active} className="aw-swap">
                <p className="aw-carousel-name">{item.title}</p>
                <p className="aw-eyebrow">{item.subtitle}</p>
              </div>
              <div className="aw-carousel-controls aw-mono">
                <button type="button" onClick={() => step(-1)} disabled={active === 0} aria-label="Previous project">
                  ←
                </button>
                <span>
                  {pad(active + 1)} / {pad(items.length)}
                </span>
                <button type="button" onClick={() => step(1)} disabled={active === LAST} aria-label="Next project">
                  →
                </button>
              </div>
              <a className="aw-link aw-mono" href={item.href} target="_blank" rel="noreferrer">
                {carousel.visitLabel} ↗
              </a>
            </div>
          </>
        )}

        <p className="aw-carousel-label">{carousel.label}</p>
      </div>
    </section>
  );
};
