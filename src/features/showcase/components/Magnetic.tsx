import type { ReactNode } from "react";
import { useMagneticButton } from "../../cursor/useMagneticButton";

export const Magnetic = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useMagneticButton<HTMLSpanElement>();
  return (
    <span ref={ref} className={`aw-magnetic ${className}`}>
      {children}
    </span>
  );
};
