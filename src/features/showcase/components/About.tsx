import { useLayoutEffect, useRef } from "react";
import { about } from "../data/content";
import { gsap, reducedMotion, scrollToSection } from "../lib/motion";
import { Magnetic } from "./Magnetic";
import { SpotlightArt } from "./art/SpotlightArt";
import { StarryNight } from "./art/StarryNight";

// Card size [width, height] at each scroll stage: start, words split, words gone, full.
const WIDE_SIZES = [
  ["19vw", "40svh"],
  ["38vw", "66svh"],
  ["60vw", "76svh"],
  ["94vw", "88svh"],
];
const NARROW_SIZES = [
  ["60vw", "34svh"],
  ["74vw", "52svh"],
  ["86vw", "68svh"],
  ["94vw", "86svh"],
];

const isWide = () => window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches;
const size = (stage: number) => {
  const [w, h] = (isWide() ? WIDE_SIZES : NARROW_SIZES)[stage];
  return { "--cw": w, "--ch": h };
};

export const About = () => {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const stage = stageRef.current as HTMLDivElement;
      const split = () => (isWide() ? 37 : 30);

      // Timeline positions are percentages of the pinned scroll distance.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            pin: stage,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(stage, size(0), { ...size(1), duration: 25, ease: "power2.inOut" }, 8)
        .to(stage, { ...size(2), duration: 20, ease: "power1.inOut" }, 33)
        .to(stage, { ...size(3), duration: 20, ease: "power2.inOut" }, 53)

        .fromTo(
          ".aw-ab-word--left",
          { x: 0, filter: "blur(0px)", "--gx": "0em", "--go": 0 },
          { x: () => `${-split()}vw`, filter: "blur(3px)", "--gx": "0.12em", "--go": 0.45, duration: 25, ease: "power2.inOut" },
          8
        )
        .fromTo(
          ".aw-ab-word--right",
          { x: 0, filter: "blur(0px)", "--gx": "0em", "--go": 0 },
          { x: () => `${split()}vw`, filter: "blur(3px)", "--gx": "0.12em", "--go": 0.45, duration: 25, ease: "power2.inOut" },
          8
        )
        .to(".aw-ab-word--left", { x: () => `${-split() - 12}vw`, opacity: 0, filter: "blur(18px)", duration: 16, ease: "power1.in" }, 35)
        .to(".aw-ab-word--right", { x: () => `${split() + 12}vw`, opacity: 0, filter: "blur(18px)", duration: 16, ease: "power1.in" }, 35)

        .fromTo(".aw-ab-overlay", { opacity: 0 }, { opacity: 0.55, duration: 25 }, 25)
        .to(".aw-ab-overlay", { opacity: 0.88, duration: 20 }, 53)
        // On tall phone cards the figure would sit behind the paragraph, so the art is raised there.
        .fromTo(
          ".aw-ab-art",
          { scale: 1.2, yPercent: () => (isWide() ? -9 : -24) },
          { scale: 1, yPercent: () => (isWide() ? 0 : -22), duration: 65, ease: "power2.inOut" },
          8
        )
        .fromTo(".aw-art-figure", { opacity: 0.35 }, { opacity: 1, duration: 22 }, 20)
        .fromTo(".aw-art-beam", { opacity: 0.7 }, { opacity: 1, duration: 40 }, 25)

        .fromTo(".aw-ab-vignette", { opacity: 0 }, { opacity: 1, duration: 8 }, 70)
        .fromTo(
          ".aw-ab-headline, .aw-ab-location",
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 8, ease: "power2.out", stagger: 2 },
          74
        )
        .fromTo(".aw-ab-divider", { scaleX: 0 }, { scaleX: 1, duration: 10, ease: "power2.inOut" }, 77)
        .fromTo(".aw-ab-craft", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 7, ease: "power2.out" }, 79)
        .fromTo(".aw-ab-line > span", { yPercent: 110 }, { yPercent: 0, duration: 8, ease: "power3.out", stagger: 2 }, 81)
        .fromTo(
          ".aw-ab-actions .aw-pill",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 7, ease: "back.out(1.6)", stagger: 2 },
          86
        )
        .to({}, { duration: 6 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const go = (id: string) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <section ref={rootRef} id="about" className="aw-about">
      <div ref={stageRef} className="aw-ab-stage aw-dark">
        <StarryNight className="aw-ab-bg" />
        <div className="aw-ab-overlay" />

        <div className="aw-ab-card">
          <div className="aw-ab-inner">
            <SpotlightArt className="aw-ab-art" />
            <div className="aw-ab-vignette" />

            <div className="aw-ab-content">
              <div className="aw-ab-top">
                <h2 className="aw-sr">
                  {about.wordLeft} {about.wordRight}
                </h2>
                <p className="aw-ab-headline">{about.headline}</p>
                <p className="aw-mono aw-ab-location">{about.location}</p>
              </div>

              <div>
                <div className="aw-ab-divider" />
                <div className="aw-ab-bottom">
                  <div>
                    <p className="aw-mono aw-ab-craft">
                      <span>{about.craftLabel}</span>
                      <i aria-hidden="true" />
                      <span>{about.craft}</span>
                    </p>
                    <p className="aw-ab-para">
                      {about.lines.map((line) => (
                        <span key={line} className="aw-ab-line">
                          <span>{line}</span>
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="aw-ab-actions">
                    <Magnetic>
                      <a className="aw-pill aw-pill--solid" href="#contact" onClick={go("contact")}>
                        {about.primaryLabel}
                        <span className="aw-ab-arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a className="aw-pill" href="#services" onClick={go("services")}>
                        {about.secondaryLabel}
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aw-ab-words aw-display" aria-hidden="true">
          <span className="aw-ab-word aw-ab-word--left aw-ghost" data-text={about.wordLeft}>
            {about.wordLeft}
          </span>
          <span className="aw-ab-word aw-ab-word--right aw-ghost" data-text={about.wordRight}>
            {about.wordRight}
          </span>
        </div>
      </div>
    </section>
  );
};
