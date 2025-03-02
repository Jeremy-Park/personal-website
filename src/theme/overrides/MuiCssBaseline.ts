import { Theme } from "@mui/material";
import { ThemeName } from "../ThemeOptionsContext";

// ----------------------------------------------------------------------

export default function MuiCssBaseline(theme: Theme, themeName: ThemeName) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  };
}
