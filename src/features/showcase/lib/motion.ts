import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { prefersReducedMotion } from "../../cursor/cursorSupport";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, MorphSVGPlugin);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };

export const reducedMotion = prefersReducedMotion();

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const lockScroll = (locked: boolean) => {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
};

export const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView();
};

const GLYPHS = "ABCDEFGHIKLMNOPRSTUVXYZ0123456789/#";

// Signature heading reveal: letters streak in blurred with grey ghosts, scramble, then snap sharp.
export const playGlitch = (el: HTMLElement | null) => {
  if (!el) return;
  el.removeAttribute("data-armed");
  if (reducedMotion) return;

  const chars = Array.from(el.querySelectorAll<HTMLElement>(".aw-char"));
  const finals = chars.map((c) => c.dataset.char ?? "");
  const progress = { value: 0 };
  let frame = 0;

  return gsap
    .timeline({ defaults: { overwrite: "auto" } })
    .fromTo(
      chars,
      { opacity: 0, xPercent: 70, scaleX: 1.7 },
      { opacity: 1, xPercent: 0, scaleX: 1, duration: 0.9, ease: "expo.out", stagger: 0.028 },
      0
    )
    .fromTo(
      el,
      { filter: "blur(14px)", "--gx": "0.22em", "--go": 0.75 },
      { filter: "blur(0px)", "--gx": "0em", "--go": 0, duration: 1.1, ease: "power4.out", clearProps: "filter" },
      0
    )
    .to(
      progress,
      {
        value: 1,
        duration: 0.85,
        ease: "none",
        onUpdate: () => {
          frame += 1;
          if (frame % 3 !== 0 && progress.value < 1) return;
          chars.forEach((char, i) => {
            const settleAt = 0.3 + (i / chars.length) * 0.65;
            char.textContent =
              progress.value >= settleAt
                ? finals[i]
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          });
        },
        onComplete: () => chars.forEach((char, i) => (char.textContent = finals[i])),
      },
      0
    );
};

// Paragraph reveal: words fade up grouped by the line they wrapped onto.
export const playLines = (el: HTMLElement | null) => {
  if (!el) return;
  el.removeAttribute("data-armed");
  if (reducedMotion) return;

  const words = Array.from(el.querySelectorAll<HTMLElement>(".aw-word"));
  const tops = Array.from(new Set(words.map((w) => w.offsetTop))).sort((a, b) => a - b);

  return gsap.fromTo(
    words,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: (i) => tops.indexOf(words[i].offsetTop) * 0.09,
    }
  );
};
