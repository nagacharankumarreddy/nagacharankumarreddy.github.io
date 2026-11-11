import { useLayoutEffect, useRef, useState } from "react";
import { about } from "../data/content";
import { gsap, reducedMotion, scrollToSection } from "../lib/motion";
import { playSfx, setSfxEnabled, type Sfx } from "../lib/sfx";
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
      const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            pin: stage,
            start: "top top",
            end: "+=430%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      // Sounds only fire while scrolling forward, never on the way back up.
      const cue = (name: Sfx) => () => {
        if ((tl.scrollTrigger?.direction ?? 1) > 0) playSfx(name);
      };
      const slashTrail = (selector: string, at: number) =>
        tl
          .fromTo(selector, { opacity: 1, strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 2.5, ease: "power2.out" }, at)
          .to(selector, { strokeDashoffset: -100, opacity: 0, duration: 2.5, ease: "power1.in" }, at + 2.5);

      tl.fromTo(stage, size(0), { ...size(1), duration: 25, ease: "power2.inOut" }, 8)
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
        // He stands up like a hero, draws a sword, twirls it, fights, then light rays burst from him.
        .fromTo(".aw-art-figure", { y: 0 }, { y: -30, duration: 26, ease: "power2.inOut" }, 36)
        .to(".aw-fig-leg-a", { morphSVG: "M814 640 L810 598 L806 556", duration: 26, ease: "power2.inOut" }, 36)
        .to(".aw-fig-leg-b", { morphSVG: "M798 640 L802 598 L806 556", duration: 26, ease: "power2.inOut" }, 36)
        .to(".aw-fig-torso", { morphSVG: "M806 556 Q806 524 806 492", duration: 26, ease: "power2.inOut" }, 36)
        .to(".aw-fig-arm-a", { morphSVG: "M806 506 Q788 532 782 566", duration: 26, ease: "power2.inOut" }, 36)
        .to(".aw-fig-arm-b", { morphSVG: "M806 506 Q824 532 830 566", duration: 26, ease: "power2.inOut" }, 36)
        .to(".aw-fig-head", { attr: { cx: 806, cy: 470 }, duration: 26, ease: "power2.inOut" }, 36)
        .fromTo(".aw-art-shadow", { scale: 1, opacity: 0.7 }, { scale: 0.55, opacity: 0.3, transformOrigin: "50% 50%", duration: 26, ease: "power2.inOut" }, 36)
        .fromTo(".aw-art-lift", { y: 0 }, { y: -72, duration: 26, ease: "power2.inOut" }, 36)

        .fromTo(".aw-sword", { opacity: 0, scale: 0.3, rotation: 150, svgOrigin: "0 0" }, { opacity: 1, scale: 1, rotation: 28, svgOrigin: "0 0", duration: 8, ease: "back.out(1.8)" }, 62)
        .call(cue("shing"), [], 63)
        // Three turns of the sword. The About text arrives one piece at a time while it spins.
        .to(".aw-sword", { rotation: 1108, svgOrigin: "0 0", duration: 18, ease: "power2.inOut" }, 72)
        .call(cue("whoosh"), [], 75)
        .call(cue("whoosh"), [], 80)
        .call(cue("whoosh"), [], 85)
        .fromTo(".aw-ab-vignette", { opacity: 0 }, { opacity: 1, duration: 8 }, 68)
        .fromTo(
          ".aw-ab-headline, .aw-ab-location",
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 4, ease: "power2.out", stagger: 3 },
          72
        )
        .fromTo(".aw-ab-divider", { scaleX: 0 }, { scaleX: 1, duration: 4, ease: "power2.inOut" }, 78)
        .fromTo(".aw-ab-craft", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 4, ease: "power2.out" }, 78)
        .fromTo(".aw-ab-line > span", { yPercent: 110 }, { yPercent: 0, duration: 4, ease: "power3.out", stagger: 3 }, 81)

        // Fight moves: wide stance, overhead slash, sweeping back slash, then sword to the sky.
        .to(".aw-fig-leg-a", { morphSVG: "M828 640 L819 600 L806 556", duration: 3, ease: "power2.out" }, 92)
        .to(".aw-fig-leg-b", { morphSVG: "M784 640 L795 598 L806 556", duration: 3, ease: "power2.out" }, 92)
        .to(".aw-fig-arm-b", { morphSVG: "M806 506 Q826 486 840 462", duration: 3, ease: "power2.out" }, 92)
        .to(".aw-sword-hand", { x: 10, y: -104, duration: 3, ease: "power2.out" }, 92)
        .to(".aw-sword", { rotation: 1040, svgOrigin: "0 0", duration: 3, ease: "power2.out" }, 92)

        .to(".aw-fig-arm-b", { morphSVG: "M806 506 Q832 512 852 528", duration: 3, ease: "power3.in" }, 95)
        .to(".aw-sword-hand", { x: 22, y: -38, duration: 3, ease: "power3.in" }, 95)
        .to(".aw-sword", { rotation: 1195, svgOrigin: "0 0", duration: 3, ease: "power3.in" }, 95)
        .call(cue("slash"), [], 96)

        .to(".aw-fig-arm-b", { morphSVG: "M806 506 Q790 500 770 516", duration: 5, ease: "power3.inOut" }, 100)
        .to(".aw-fig-arm-a", { morphSVG: "M806 506 Q784 524 772 548", duration: 5, ease: "power3.inOut" }, 100)
        .to(".aw-sword-hand", { x: -60, y: -50, duration: 5, ease: "power3.inOut" }, 100)
        .to(".aw-sword", { rotation: 1000, svgOrigin: "0 0", duration: 5, ease: "power3.inOut" }, 100)
        .call(cue("slash"), [], 101.5)

        .to(".aw-fig-arm-b", { morphSVG: "M806 506 Q824 484 828 452", duration: 4, ease: "back.out(1.4)" }, 106)
        .to(".aw-fig-arm-a", { morphSVG: "M806 506 Q788 532 782 566", duration: 4, ease: "power2.out" }, 106)
        .to(".aw-sword-hand", { x: -2, y: -114, duration: 4, ease: "back.out(1.4)" }, 106)
        .to(".aw-sword", { rotation: 1080, svgOrigin: "0 0", duration: 4, ease: "back.out(1.4)" }, 106)

        .call(cue("boom"), [], 110)
        .fromTo(".aw-art-figure", { scale: 1 }, { scale: 1.06, svgOrigin: "806 640", duration: 3, ease: "power2.out", yoyo: true, repeat: 1 }, 110)
        .fromTo(
          ".aw-art-rays",
          { opacity: 0, scale: 0.05, rotation: -20, svgOrigin: "0 0" },
          { opacity: 1, scale: 1, rotation: 8, svgOrigin: "0 0", duration: 14, ease: "power4.out" },
          109
        )
        .to(".aw-art-rays", { opacity: 0.75, duration: 8 }, 123)

        .fromTo(
          ".aw-ab-actions .aw-pill",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 7, ease: "back.out(1.6)", stagger: 2 },
          112
        )
        .to({}, { duration: 6 });
      slashTrail(".aw-slash-1", 95.5);
      slashTrail(".aw-slash-2", 101);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const [sound, setSound] = useState(true);
  const toggleSound = () => {
    setSfxEnabled(!sound);
    setSound(!sound);
  };

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

        {!reducedMotion && (
          <button type="button" className="aw-mono aw-ab-sound" onClick={toggleSound} aria-pressed={sound}>
            Sound {sound ? "on" : "off"}
          </button>
        )}

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
