"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ThemeOptions, Theme } from "@mui/material/styles";

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

  // Load saved theme preferences from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("themeConfig");
    if (savedConfig) {
      setThemeConfig(JSON.parse(savedConfig));
    }
  }, []);

  const toggleMode = () => {
    // @ts-ignore
    setThemeConfig((prev) => {
      const newConfig = {
        ...prev,
        mode: prev.mode === "light" ? "dark" : "light",
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
