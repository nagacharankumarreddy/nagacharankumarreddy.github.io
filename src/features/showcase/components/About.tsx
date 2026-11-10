import { useLayoutEffect, useRef } from "react";
import { about, site } from "../data/content";
import { gsap, reducedMotion, scrollToSection } from "../lib/motion";
import { Magnetic } from "./Magnetic";
import { SpotlightArt } from "./art/SpotlightArt";
import { StarryNight } from "./art/StarryNight";

export const About = () => {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const wordFrom = { filter: "blur(16px)", "--gx": "0.3em", "--go": 0.8 };
      const wordTo = { filter: "blur(0px)", "--gx": "0em", "--go": 0, x: 0, duration: 2.4, ease: "power3.out" };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            pin: stageRef.current,
            start: "top top",
            end: "+=320%",
            scrub: 0.8,
          },
        })
        .fromTo(".aw-about-word--left", { ...wordFrom, x: "-70vw" }, wordTo, 0)
        .fromTo(".aw-about-word--right", { ...wordFrom, x: "70vw" }, wordTo, 0)
        .fromTo(
          ".aw-about-panel",
          { opacity: 0, "--k": 1.35 },
          { opacity: 1, "--k": 1, duration: 1.6, ease: "power3.out" },
          0.3
        )
        .to(".aw-about-panel", { "--k": 0, duration: 3.4, ease: "power2.inOut" }, 3.4)
        .to(".aw-about-word--left", { x: "-18vw", duration: 3.4, ease: "power2.in" }, 3.4)
        .to(".aw-about-word--right", { x: "18vw", duration: 3.4, ease: "power2.in" }, 3.4)
        .to(".aw-about-art", { opacity: 0.28, scale: 1.14, duration: 2.6, ease: "power2.out" }, 6)
        .from(
          ".aw-about-content > *",
          { opacity: 0, y: 50, duration: 1.6, ease: "power3.out", stagger: 0.35 },
          6.6
        )
        .to({}, { duration: 0.8 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="about" className="aw-about">
      <div ref={stageRef} className="aw-about-stage aw-light">
        <StarryNight className="aw-about-engraving" />

        <div className="aw-about-words aw-display" aria-hidden="true">
          <span className="aw-about-word aw-about-word--left aw-ghost" data-text={about.wordLeft}>
            {about.wordLeft}
          </span>
          <span className="aw-about-word aw-about-word--right aw-ghost" data-text={about.wordRight}>
            {about.wordRight}
          </span>
        </div>

        <div className="aw-about-panel aw-dark">
          <SpotlightArt className="aw-about-art" />
          <div className="aw-about-content">
            <p className="aw-eyebrow">{about.eyebrow}</p>
            <h2 className="aw-sr">
              {about.wordLeft} {about.wordRight}
            </h2>
            <p className="aw-about-manifesto">{about.manifesto}</p>
            <dl className="aw-about-meta">
              {about.meta.map((item) => (
                <div key={item.label}>
                  <dt className="aw-eyebrow">{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="aw-about-actions">
              <Magnetic>
                <a className="aw-pill aw-pill--solid" href={site.cv} download>
                  {about.cvLabel}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  className="aw-pill"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  {about.contactLabel}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
