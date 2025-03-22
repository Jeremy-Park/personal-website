import { Theme } from "@mui/material";
import { ThemeName } from "../ThemeOptionsContext";

// ----------------------------------------------------------------------

export default function Paper(theme: Theme, themeName: ThemeName) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          // Disable elevation gradient overlay
          backgroundImage: "none",

          // Disable border
          //   border:
          //     themeName === ThemeName.VERCEL
          //       ? `1px solid ${theme.palette.divider}`
          //       : undefined,
        },
      },
    },
  };
}
