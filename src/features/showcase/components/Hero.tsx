import { useLayoutEffect, useRef } from "react";
import { hero } from "../data/content";
import { gsap, reducedMotion } from "../lib/motion";

const Letters = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className="aw-hero-line">
    <span className="aw-sr">{text} </span>
    <span aria-hidden="true">
      {Array.from(text).map((char, i) => (
        <span key={i} className={`aw-hero-char ${className}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  </span>
);

export const Hero = ({ ready }: { ready: boolean }) => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.set(".aw-hero-char", { yPercent: 115, opacity: 0 });
      gsap.set(".aw-hero-portrait, .aw-hero-fade", { opacity: 0, y: 40 });

      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "+=100%", scrub: true },
        })
        .to(".aw-hero-title", { yPercent: -45, ease: "none" }, 0)
        .to(".aw-hero-portrait-wrap", { yPercent: -12, ease: "none" }, 0)
        .to(".aw-hero-side", { yPercent: -80, opacity: 0, ease: "none" }, 0);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!ready || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          ".aw-hero-title",
          { filter: "blur(18px)" },
          { filter: "blur(0px)", duration: 1.2, ease: "power4.out", clearProps: "filter" },
          0
        )
        .to(".aw-hero-char", { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.035 }, 0)
        .to(".aw-hero-portrait", { opacity: 1, y: 0, duration: 1.4 }, 0.35)
        .to(".aw-hero-fade", { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.6);
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={rootRef} id="home" className="aw-hero aw-light">
      <h1 className="aw-hero-title aw-display">
        <Letters text={hero.lineOne} />
        <Letters text={hero.lineTwo} className="aw-hero-char--fade" />
      </h1>

      <div className="aw-hero-side aw-hero-intro">
        <p className="aw-eyebrow aw-hero-fade">{hero.introTitle}</p>
        <p className="aw-hero-text aw-hero-fade">{hero.intro}</p>
        <p className="aw-eyebrow aw-hero-scroll aw-hero-fade">
          <span aria-hidden="true" className="aw-hero-scroll-line" />
          {hero.scrollHint}
        </p>
      </div>

      <div className="aw-hero-side aw-hero-label">
        {hero.label.map((line) => (
          <p key={line} className="aw-eyebrow aw-hero-fade">
            {line}
          </p>
        ))}
      </div>

      <div className="aw-hero-portrait-wrap">
        <img className="aw-hero-portrait" src={hero.portrait} alt={hero.portraitAlt} />
      </div>
    </section>
  );
};
