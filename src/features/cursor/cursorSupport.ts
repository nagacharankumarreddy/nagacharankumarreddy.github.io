export type CursorState = "default" | "button" | "link" | "card" | "code" | "image" | "input";

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

const SELECTORS: { state: CursorState; selector: string }[] = [
  { state: "input", selector: "input, textarea" },
  { state: "code", selector: '.markdown-body code[class*="language-"]' },
  { state: "image", selector: ".zoomable-image" },
  { state: "button", selector: 'button, [class*="btn"], .navbar-link, .scroll-button' },
  { state: "card", selector: '[class*="card"]' },
  { state: "link", selector: "a[href]" },
];

export const classifyHoverTarget = (element: Element | null): CursorState => {
  if (!element) return "default";

  for (const { state, selector } of SELECTORS) {
    if (element.closest(selector)) {
      return state;
    }
  }

  return "default";
};
