"use client";
import { useThemeOptions } from "@/theme/ThemeOptionsContext";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import palette from "./palette";

export function MyThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, themeName } = useThemeOptions();

  const theme = useMemo(
    () =>
      createTheme({
        palette: palette(mode),
      }),
    [mode]
  );

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
