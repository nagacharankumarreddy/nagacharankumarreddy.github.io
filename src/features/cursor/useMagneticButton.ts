import { useEffect, useRef } from "react";
import { isTouchDevice, prefersReducedMotion } from "./cursorSupport";

const MAX_OFFSET = 8;

export const useMagneticButton = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchDevice() || prefersReducedMotion()) {
      return;
    }

    let frame: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      frame = null;
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        frame = requestAnimationFrame(render);
      }
    };

    const scheduleRender = () => {
      if (frame === null) {
        frame = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      targetX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x * 0.3));
      targetY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y * 0.3));
      scheduleRender();
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      scheduleRender();
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      el.style.transform = "";
    };
  }, []);

  return ref;
};
