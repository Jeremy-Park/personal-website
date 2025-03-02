import { Theme } from "@mui/material";
import { ThemeName } from "../ThemeOptionsContext";
import MuiCssBaseline from "./MuiCssBaseline";

// ----------------------------------------------------------------------

export default function ComponentOverrides(theme: Theme, themeName: ThemeName) {
  return Object.assign(MuiCssBaseline(theme, themeName));
}
