import { Theme } from "@mui/material";
import { ThemeName } from "../ThemeOptionsContext";
import Card from "./Card";
import Paper from "./Paper";

// ----------------------------------------------------------------------

export default function ComponentOverrides(theme: Theme, themeName: ThemeName) {
  return Object.assign(Card(theme, themeName), Paper(theme, themeName));
}
