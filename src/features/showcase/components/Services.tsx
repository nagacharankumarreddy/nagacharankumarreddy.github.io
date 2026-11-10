import { useState } from "react";
import { services, site } from "../data/content";
import { GlitchText } from "./GlitchText";
import { Lines } from "./Lines";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export const Services = () => {
  const [open, setOpen] = useState(-1);

  return (
    <section id="services" className="aw-services aw-light">
      <GlitchText text={services.heading} className="aw-display aw-services-title" />
      <Lines text={services.subtitle} className="aw-eyebrow aw-services-sub" />

      <div className="aw-acc" onMouseLeave={canHover ? () => setOpen(-1) : undefined}>
        {services.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.title}
              className={`aw-acc-row ${isOpen ? "is-open" : ""}`}
              onMouseEnter={canHover ? () => setOpen(i) : undefined}
            >
              <h3>
                <button
                  type="button"
                  className="aw-acc-head"
                  aria-expanded={isOpen}
                  aria-controls={`aw-acc-${i}`}
                  id={`aw-acc-head-${i}`}
                  onClick={() => setOpen(isOpen && !canHover ? -1 : i)}
                >
                  <span className="aw-mono aw-acc-num">{i + 1}</span>
                  <span className="aw-display aw-acc-title aw-ghost" data-text={item.title}>
                    {item.title}
                  </span>
                  <svg className="aw-acc-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </h3>
              <div id={`aw-acc-${i}`} role="region" aria-labelledby={`aw-acc-head-${i}`} className="aw-acc-body">
                <div className="aw-acc-inner">
                  <div className="aw-acc-content">
                    <p className="aw-acc-text">{item.text}</p>
                    <p className="aw-mono aw-acc-deliver">DELIVERABLES: {item.deliverables}</p>
                    <a
                      className="aw-link aw-mono aw-acc-inquire"
                      href={`mailto:${site.email}?subject=${encodeURIComponent(`Inquiry: ${item.title}`)}`}
                      tabIndex={isOpen ? 0 : -1}
                    >
                      {services.inquireLabel} ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
