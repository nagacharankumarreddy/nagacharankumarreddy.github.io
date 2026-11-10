import { useLayoutEffect, useRef, useState } from "react";
import { works } from "../data/content";
import { ScrollTrigger, gsap, reducedMotion } from "../lib/motion";

const { items } = works;
const COUNT = items.length;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const mix = (from: number, to: number, t: number) => from + (to - from) * t;
const pad = (value: number) => String(value).padStart(2, "0");

export const WorksRing = () => {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current as HTMLElement;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".aw-works-card"));
    const tilt = root.querySelector<HTMLElement>(".aw-works-tilt");
    const center = root.querySelector<HTMLElement>(".aw-works-center");
    const sides = Array.from(root.querySelectorAll<HTMLElement>(".aw-works-side"));

    // target = scroll position, live = eased values actually drawn.
    const target = { burst: 0, slot: 0 };
    const live = { burst: 0, slot: 0, angle: 0 };
    let current = 0;

    const render = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      live.burst += (target.burst - live.burst) * Math.min(1, dt * 6);
      live.slot += (target.slot - live.slot) * Math.min(1, dt * 7);
      live.angle += dt * 14 * (1 - live.burst);

      const t = live.burst * live.burst * (3 - 2 * live.burst);
      const cardHeight = cards[0].offsetHeight;
      const radius = Math.min(window.innerWidth * 0.36, 440);
      const ringScale = window.innerWidth < 768 ? 0.5 : 0.58;

      cards.forEach((card, i) => {
        let theta = (live.angle + (i * 360) / COUNT) % 360;
        if (theta > 180) theta -= 360;
        const rad = (theta * Math.PI) / 180;
        const offset = i - live.slot;

        const x = mix(radius * Math.sin(rad), 0, t);
        const y = mix(0, offset * cardHeight * 1.12, t);
        const z = mix(radius * Math.cos(rad), -Math.abs(offset) * 70, t);
        const rotateY = mix(theta, 0, t);
        const rotateZ = mix(0, Math.max(-1, Math.min(1, offset)) * -3, t);
        const scale = mix(ringScale, 1, t);

        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = (1 - Math.min(1, Math.abs(offset)) * 0.6 * t).toFixed(3);
      });

      if (tilt) tilt.style.transform = `rotateX(${mix(-16, 0, t).toFixed(2)}deg) rotateZ(${mix(-7, 0, t).toFixed(2)}deg)`;
      if (center) {
        center.style.opacity = clamp01(1 - t * 1.8).toFixed(3);
        center.style.transform = `translate(-50%, -50%) scale(${mix(1, 0.8, t).toFixed(3)})`;
      }
      const sideOpacity = clamp01((t - 0.6) / 0.4).toFixed(3);
      sides.forEach((side) => (side.style.opacity = sideOpacity));

      const next = Math.min(COUNT - 1, Math.max(0, Math.round(live.slot)));
      if (next !== current) {
        current = next;
        setActive(next);
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        pin: pinRef.current,
        start: "top top",
        end: "+=420%",
        onUpdate: (self) => {
          target.burst = clamp01((self.progress - 0.08) / 0.22);
          target.slot = clamp01((self.progress - 0.34) / 0.6) * (COUNT - 1);
        },
      });
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? gsap.ticker.add(render) : gsap.ticker.remove(render)),
      });
    }, root);
    render(0, 16);

    return () => {
      gsap.ticker.remove(render);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="works" className="aw-works aw-light">
      <div ref={pinRef} className="aw-works-pin">
        <h2 className="aw-works-center aw-display">{works.title}</h2>

        <div className="aw-works-side aw-works-name">
          <p className="aw-mono">
            {pad(active + 1)} / {pad(COUNT)}
          </p>
          <div key={active} className="aw-swap">
            <p className="aw-display aw-works-title">{items[active].title}</p>
            <p className="aw-eyebrow">{items[active].subtitle}</p>
          </div>
        </div>

        <ol className="aw-works-side aw-works-index aw-mono">
          {items.map((item, i) => (
            <li key={item.title} aria-current={i === active ? "true" : undefined}>
              {item.title}
            </li>
          ))}
        </ol>

        <div className="aw-works-stage">
          <div className="aw-works-tilt">
            {items.map((item, i) => (
              <a
                key={item.title}
                className="aw-works-card"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${item.title}: ${item.subtitle}`}
              >
                <span className="aw-works-face">
                  <img src={item.image} alt="" loading="lazy" />
                  <span className="aw-mono aw-works-tag">
                    {pad(i + 1)} — {item.title}
                  </span>
                </span>
                <span className="aw-works-face aw-works-face--back aw-mono" aria-hidden="true">
                  {pad(i + 1)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
