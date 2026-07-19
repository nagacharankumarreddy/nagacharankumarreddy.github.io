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
      {THEME_ICON[theme]}
    </button>
  );
};
