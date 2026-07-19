import { useEffect, useState } from "react";
import type { RefObject } from "react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/** Scans a rendered article container for real subheadings (excludes the demoted title h1). */
export const useHeadings = (
  containerRef: RefObject<HTMLElement | null>,
  contentKey: string
): HeadingItem[] => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      setHeadings([]);
      return;
    }

    const elements = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2, h3, h4")
    ).filter((el) => !el.classList.contains("markdown-heading") && el.id);

    setHeadings(
      elements.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: Number(el.tagName.charAt(1)),
      }))
    );
  }, [containerRef, contentKey]);

  return headings;
};
