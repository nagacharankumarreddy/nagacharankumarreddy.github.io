declare module "react-on-screen" {
  import type { ComponentType, ReactNode } from "react";

  export interface TrackVisibilityProps {
    children: (state: { isVisible: boolean }) => ReactNode;
    partialVisibility?: boolean;
    offset?: number;
    once?: boolean;
  }

  const TrackVisibility: ComponentType<TrackVisibilityProps>;
  export default TrackVisibility;
}
