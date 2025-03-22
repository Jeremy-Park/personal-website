import { Theme } from "@mui/material";
import { ThemeName } from "../ThemeOptionsContext";

// ----------------------------------------------------------------------

export default function Card(theme: Theme, themeName: ThemeName) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          ...(themeName === ThemeName.VERCEL && {
            border: `1px solid ${theme.palette.divider}`,
          }),
          ...(themeName === ThemeName.GITHUB && {
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
    },
  };
}
