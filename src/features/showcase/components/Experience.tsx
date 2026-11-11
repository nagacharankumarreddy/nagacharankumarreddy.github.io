import { useLayoutEffect, useRef } from "react";
import { experience } from "../data/content";
import { ScrollTrigger, gsap, playGlitch, playLines, reducedMotion } from "../lib/motion";
import { GlitchText } from "./GlitchText";
import { Lines } from "./Lines";

export const Experience = () => {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { intro, roles } = experience;

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current as HTMLDivElement;
      const distance = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          pin: pinRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".aw-exp-marquee", {
        xPercent: -45,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: () => `+=${distance() + window.innerHeight * 2}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".aw-exp-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".aw-exp-panel").forEach((panel, i) => {
        const rise = panel.querySelectorAll("[data-rise]");
        gsap.set(rise, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: panel,
          ...(i === 0 ? { start: "top 55%" } : { containerAnimation: scrollTween, start: "left 60%" }),
          once: true,
          onEnter: () => {
            panel.querySelectorAll<HTMLElement>("[data-glitch]").forEach(playGlitch);
            panel.querySelectorAll<HTMLElement>("[data-lines]").forEach(playLines);
            gsap.to(rise, { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.09 });
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="experience" className="aw-exp aw-dark">
      <div ref={pinRef} className="aw-exp-pin">
        <div className="aw-exp-marquee aw-display" aria-hidden="true">
          {experience.marquee} {experience.marquee}
        </div>

        <div ref={trackRef} className="aw-exp-track">
          <article className="aw-exp-panel">
            <p className="aw-eyebrow" data-rise="">
              {intro.eyebrow}
            </p>
            <span className="aw-pill aw-pill--tag" data-rise="">
              {intro.tag}
            </span>
            <GlitchText manual text={intro.heading} className="aw-display aw-exp-title aw-exp-title--xl" />
            <Lines manual text={intro.text} className="aw-exp-text" />
          </article>

          {roles.map((role) => (
            <article key={role.company} className="aw-exp-panel">
              <p className="aw-mono aw-exp-date" data-rise="">
                {role.date}
              </p>
              <GlitchText manual text={role.heading} className="aw-display aw-exp-title" />
              <p className="aw-eyebrow" data-rise="">
                {role.company}
              </p>
              <Lines manual text={role.text} className="aw-exp-text" />
              <div className="aw-exp-grid aw-exp-grid--three">
                {role.columns.map((item) => (
                  <div key={item.label} className="aw-exp-block" data-rise="">
                    <p className="aw-eyebrow">{item.label}</p>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="aw-exp-foot">
          <div className="aw-exp-tags">
            {experience.tags.map((tag) => (
              <span key={tag} className="aw-pill aw-pill--tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="aw-exp-progress" aria-hidden="true">
            <span className="aw-exp-bar" />
          </div>
        </div>
      </div>
    </section>
  );
};
