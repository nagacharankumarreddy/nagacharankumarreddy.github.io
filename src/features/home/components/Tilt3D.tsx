import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const Tilt3D = ({
  children,
  className,
  maxTilt = 12,
  glare = true,
}: Tilt3DProps) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [maxTilt, -maxTilt]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-maxTilt, maxTilt]),
    springConfig,
  );
  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width);
    y.set((event.clientY - bounds.top) / bounds.height);
  };

  const handlePointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // Touch devices can't hover to drive the tilt, so tapping instead
  // triggers a quick 3D pop for the same sense of depth/feedback.
  const handleTouchStart = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width);
    y.set((event.clientY - bounds.top) / bounds.height);
  };

  return (
    <motion.div
      className={className}
      onPointerMove={handlePointerMove}
      onPointerDown={handleTouchStart}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      whileTap={{ scale: 0.97 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
        position: "relative",
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18), transparent 60%)`,
            ),
          }}
        />
      )}
    </motion.div>
  );
};
