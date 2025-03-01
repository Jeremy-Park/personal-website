"use client";

import { createContext, useContext, useEffect, useState } from "react";

export enum ThemeName {
  DEFAULT = "default",
  MODERN = "modern",
  CLASSIC = "classic",
  // Add more theme names as needed
}

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  themeName: ThemeName;
  toggleMode: () => void;
  setThemeName: (name: ThemeName) => void;
}

interface ThemeConfig {
  mode: ThemeMode;
  themeName: ThemeName;
}

const ThemeOptionsContext = createContext<ThemeContextType>({
  mode: "light",
  themeName: ThemeName.DEFAULT,
  toggleMode: () => {},
  setThemeName: () => {},
});

export function ThemeOptionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    mode: "light",
    themeName: ThemeName.DEFAULT,
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem("themeConfig");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.mode && parsed.themeName) {
          console.log("Loading saved theme config:", parsed);
          setThemeConfig(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved theme config:", e);
      }
    }
  }, []);

  const toggleMode = () => {
    setThemeConfig((prev) => {
      const newMode = prev.mode === "light" ? "dark" : "light";
      console.log("Toggling theme mode from", prev.mode, "to", newMode);
      const newConfig = {
        ...prev,
        mode: newMode,
      };
      localStorage.setItem("themeConfig", JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const setThemeName = (name: ThemeName) => {
    setThemeConfig((prev) => {
      const newConfig = {
        ...prev,
        themeName: name,
      };
      localStorage.setItem("themeConfig", JSON.stringify(newConfig));
      return newConfig;
    });
  };

  return (
    <ThemeOptionsContext.Provider
      value={{
        mode: themeConfig.mode,
        themeName: themeConfig.themeName,
        toggleMode,
        setThemeName,
      }}
    >
      {children}
    </ThemeOptionsContext.Provider>
  );
}

export const useThemeOptions = () => useContext(ThemeOptionsContext);
