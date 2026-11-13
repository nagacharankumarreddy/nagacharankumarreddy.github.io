import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  // Rendered instead of the children once they have failed.
  fallback: ReactNode;
  onError?: () => void;
}

// Contains failures of the WebGL scene (its code failing to download, or the browser
// refusing a WebGL context) so they cannot take the rest of the page down.
export class SceneBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
