import { useEffect, useRef, useState } from "react";
import { readerConfig } from "../config/readerConfig";

const NEAR_BOTTOM_THRESHOLD = 40;
const SHOW_TOP_BUTTON_AFTER = 400;

export const ScrollButtons = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!readerConfig.reader.scrollToTop && !readerConfig.reader.scrollToBottom) {
      return;
    }

    const updateVisibility = () => {
      frameRef.current = null;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setShowTop(scrollY > SHOW_TOP_BUTTON_AFTER);
      setShowBottom(maxScroll - scrollY > NEAR_BOTTOM_THRESHOLD);
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (!readerConfig.reader.scrollToTop && !readerConfig.reader.scrollToBottom) {
    return null;
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <div className="scroll-buttons" aria-hidden={!showTop && !showBottom}>
      {readerConfig.reader.scrollToTop && (
        <button
          type="button"
          className="scroll-button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          aria-hidden={!showTop}
          tabIndex={showTop ? 0 : -1}
          data-visible={showTop}
        >
          ↑
        </button>
      )}
      {readerConfig.reader.scrollToBottom && (
        <button
          type="button"
          className="scroll-button"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          aria-hidden={!showBottom}
          tabIndex={showBottom ? 0 : -1}
          data-visible={showBottom}
        >
          ↓
        </button>
      )}
    </div>
  );
};
