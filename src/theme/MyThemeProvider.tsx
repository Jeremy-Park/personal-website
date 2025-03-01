"use client";
import { useThemeOptions } from "@/theme/ThemeOptionsContext";
import { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import palette from "./palette";

export function MyThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, themeName } = useThemeOptions();

  const theme = useMemo(
    () =>
      createTheme({
        palette: palette(mode),
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === "dark" ? "#000000" : "#FFFFFF",
                color: mode === "dark" ? "#FFFFFF" : "#000000",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
