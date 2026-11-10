import { useLayoutEffect, useRef } from "react";
import { contact, site, socials } from "../data/content";
import { gsap, reducedMotion } from "../lib/motion";
import { Magnetic } from "./Magnetic";

export const Contact = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      // The footer starts tucked under the light band above and slides up as it is uncovered.
      gsap.fromTo(
        ".aw-contact-inner",
        { yPercent: -35 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom bottom", scrub: true },
        }
      );

      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 45%", once: true },
          defaults: { ease: "expo.out" },
        })
        .from(".aw-contact-char", { yPercent: 110, opacity: 0, duration: 1.3, stagger: 0.05 })
        .from(".aw-contact-rise", { opacity: 0, y: 30, duration: 1, stagger: 0.07 }, 0.5);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} id="contact" className="aw-contact aw-dark">
      <div className="aw-contact-inner">
        <h2 className="aw-display aw-contact-title">
          <span className="aw-sr">{contact.heading}</span>
          <span aria-hidden="true">
            {Array.from(contact.heading).map((char, i) => (
              <span key={i} className="aw-contact-char">
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </h2>

        <div className="aw-contact-pills">
          {socials.map((social) => (
            <Magnetic key={social.key} className="aw-contact-rise">
              <a className="aw-pill aw-pill--fill" href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </Magnetic>
          ))}
          <Magnetic className="aw-contact-rise">
            <a className="aw-pill aw-pill--solid" href={`mailto:${site.email}`}>
              {contact.cta}
            </a>
          </Magnetic>
        </div>

        <div className="aw-contact-foot aw-mono">
          <p>
            © {site.year} {site.name}
          </p>
          <p>Designed &amp; built by {site.name}</p>
        </div>
      </div>
    </footer>
  );
};
