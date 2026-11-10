import { useEffect, useRef } from "react";
import { ScrollTrigger, playGlitch, reducedMotion } from "../lib/motion";

interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  charClassName?: string;
  /** Skip the built-in scroll trigger; the parent calls playGlitch itself. */
  manual?: boolean;
}

export const GlitchText = ({
  text,
  as: Tag = "h2",
  className = "",
  charClassName = "",
  manual = false,
}: GlitchTextProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (manual || reducedMotion) return;
    const el = ref.current;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => playGlitch(el),
    });
    return () => trigger.kill();
  }, [manual]);

  return (
    <Tag
      ref={ref as never}
      className={`aw-glitch ${className}`}
      data-text={text}
      data-glitch=""
      data-armed={reducedMotion ? undefined : ""}
    >
      <span className="aw-sr">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w) => (
          <span key={w} className="aw-glitch-word">
            {Array.from(word).map((char, c) => (
              <span key={c} className={`aw-char ${charClassName}`} data-char={char}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
};
