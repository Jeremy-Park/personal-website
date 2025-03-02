"use client";
import { useThemeOptions } from "@/theme/ThemeOptionsContext";
import { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import palette from "./palette";
import ComponentOverrides from "./overrides/ComponentOverrides";

export function MyThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, themeName } = useThemeOptions();

  const theme = useMemo(
    () =>
      createTheme({
        palette: palette(mode, themeName),
      }),
    [mode, themeName]
  );

  theme.components = ComponentOverrides(theme, themeName);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
