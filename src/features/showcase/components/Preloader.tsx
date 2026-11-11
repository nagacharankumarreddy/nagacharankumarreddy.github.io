import { useLayoutEffect, useRef } from "react";
import { site } from "../data/content";
import { gsap, reducedMotion } from "../lib/motion";
import { PENCIL_SECONDS, playSfx, primeSfx } from "../lib/sfx";

const CABLE_PATH =
  "M -1200 560 C -700 560 -180 520 40 420 C 110 386 130 340 165 285 C 215 185 310 128 425 138 C 565 150 688 172 696 262 C 704 352 566 384 424 366 C 300 350 176 386 150 304 C 132 240 196 190 268 172";

// How long the line takes to circle the name. The pencil sound lasts the same time.
const DRAW_SECONDS = PENCIL_SECONDS;

export const Preloader = ({ onDone }: { onDone: () => void }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });

      if (reducedMotion) {
        gsap.set(".aw-pre-cable, .aw-pre-plug", { autoAlpha: 0 });
        tl.to(rootRef.current, { autoAlpha: 0, duration: 0.4, delay: 0.5 });
        return;
      }

      // Sound plays by itself wherever the browser allows it without a click.
      primeSfx();
      tl.from(".aw-pre-letter", { opacity: 0, y: 14, duration: 0.5, ease: "power4.out", stagger: 0.05 })
        .call(() => playSfx("pencil"), [], 0.1)
        .fromTo(".aw-pre-cable", { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: DRAW_SECONDS, ease: "power1.inOut" }, 0.1)
        .fromTo(
          ".aw-pre-plug",
          { opacity: 1 },
          {
            motionPath: { path: ".aw-pre-cable", align: ".aw-pre-cable", alignOrigin: [0.5, 0.5], autoRotate: true },
            duration: DRAW_SECONDS,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(".aw-pre-plug", { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" })
        .fromTo(".aw-pre-dot", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" })
        .to(".aw-pre-cable", { opacity: 0, duration: 0.3 }, "<")
        .to(rootRef.current, { autoAlpha: 0, scale: 1.12, duration: 0.55, ease: "power3.inOut" }, "+=0.15");
    }, rootRef);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div ref={rootRef} className="aw-preloader" role="status" aria-label="Loading">
      <svg className="aw-pre-svg" viewBox="0 0 800 500" fill="none" aria-hidden="true">
        <path className="aw-pre-cable" d={CABLE_PATH} pathLength={1000} />
        <g className="aw-pre-plug">
          <rect x="-9" y="-6" width="14" height="12" rx="2.5" fill="#f5f5f5" />
          <rect x="5" y="-4" width="7" height="1.8" fill="#f5f5f5" />
          <rect x="5" y="2.2" width="7" height="1.8" fill="#f5f5f5" />
        </g>
      </svg>
      <div className="aw-pre-word" aria-hidden="true">
        {Array.from(site.brand).map((letter, i) => (
          <span key={i} className="aw-pre-letter">
            {letter}
          </span>
        ))}
        <span className="aw-pre-dot">.</span>
      </div>
    </div>
  );
};
