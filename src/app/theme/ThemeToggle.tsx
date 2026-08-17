import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";
import type { ThemeMode } from "./ThemeContext";
import { useTheme } from "./useTheme";

const NEXT_THEME: Record<ThemeMode, ThemeMode> = {
  dark: "light",
  light: "system",
  system: "dark",
};

const THEME_ICON: Record<ThemeMode, ReactNode> = {
  dark: <FaMoon size={16} />,
  light: <FaSun size={16} />,
  system: <FaDesktop size={16} />,
};

const THEME_LABEL: Record<ThemeMode, string> = {
  dark: "Dark theme",
  light: "Light theme",
  system: "System theme",
};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(NEXT_THEME[theme])}
      aria-label={`${THEME_LABEL[theme]}. Click to switch theme.`}
      title={THEME_LABEL[theme]}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ display: "inline-flex" }}
        >
          {THEME_ICON[theme]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
