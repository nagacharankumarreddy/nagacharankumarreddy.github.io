import { useEffect, useRef, useState } from "react";
import { classifyHoverTarget, isTouchDevice, prefersReducedMotion } from "./cursorSupport";
import type { CursorState } from "./cursorSupport";
import "./cursor.css";

const DOT_EASE = 0.18;
const TRAIL_EASE = 0.1;

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(!isTouchDevice());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const reducedMotion = prefersReducedMotion();
    let frame: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let trailX = targetX;
    let trailY = targetY;

    const applyPosition = () => {
      const dot = dotRef.current;
      const trail = trailRef.current;
      if (dot) dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      if (trail) trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
    };

    const render = () => {
      if (reducedMotion) {
        dotX = targetX;
        dotY = targetY;
        trailX = targetX;
        trailY = targetY;
        applyPosition();
        frame = null;
        return;
      }

      dotX += (targetX - dotX) * DOT_EASE;
      dotY += (targetY - dotY) * DOT_EASE;
      trailX += (targetX - trailX) * TRAIL_EASE;
      trailY += (targetY - trailY) * TRAIL_EASE;
      applyPosition();
      frame = requestAnimationFrame(render);
    };

    const scheduleRender = () => {
      if (frame === null) {
        frame = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      scheduleRender();
    };

    const handleMouseOver = (event: MouseEvent) => {
      setState(classifyHoverTarget(event.target as Element));
    };

    const handleMouseOut = (event: MouseEvent) => {
      const related = event.relatedTarget as Element | null;
      setState(classifyHoverTarget(related));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    scheduleRender();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [enabled]);

  if (!enabled || state === "input") {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" data-cursor-state={state} />
      <div ref={trailRef} className="custom-cursor-trail" data-cursor-state={state} />
    </>
  );
};
