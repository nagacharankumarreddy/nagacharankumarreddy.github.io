import { useEffect, useRef } from "react";
import { ScrollTrigger, playLines, reducedMotion } from "../lib/motion";

interface LinesProps {
  text: string;
  className?: string;
  /** Skip the built-in scroll trigger; the parent calls playLines itself. */
  manual?: boolean;
}

export const Lines = ({ text, className = "", manual = false }: LinesProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (manual || reducedMotion) return;
    const el = ref.current;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => playLines(el),
    });
    return () => trigger.kill();
  }, [manual]);

  return (
    <p ref={ref} className={`aw-lines ${className}`} data-lines="" data-armed={reducedMotion ? undefined : ""}>
      <span className="aw-sr">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <span key={i} className="aw-word">
            {word}
          </span>
        ))}
      </span>
    </p>
  );
};
