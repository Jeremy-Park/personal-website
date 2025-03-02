import { alpha } from "@mui/material/styles";
import { ThemeName } from "./ThemeOptionsContext";

// ----------------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  950: "#0A0A0A",
};

const PRIMARY = (themeName: ThemeName) => {
  const colors = {
    [ThemeName.GITHUB]: {
      lighter: "#E8F8FD",
      light: "#8AA7E9",
      main: "rgb(46, 103, 211)",
      dark: "#1655BE",
      darker: "#0054A8",
      contrastText: "#FFFFFF",
    },
    [ThemeName.GLASS]: {
      lighter: "#f09389",
      light: "#ea6152",
      main: "#E74C3C",
      dark: "#ad2315",
      darker: "#76180f",
      contrastText: "#FFFFFF",
    },
    [ThemeName.VERCEL]: {
      lighter: "#E8F8FD",
      light: "#8AA7E9",
      main: "rgb(0, 0, 0)",
      dark: "rgb(0, 0, 0)",
      darker: "rgb(0, 0, 0)",
      contrastText: "#FFFFFF",
    },
  };
  return colors[themeName];
};

const SECONDARY = {
  lighter: "#cffcef",
  light: "#5ff7ea",
  main: "#00BCD4",
  dark: "#007aa3",
  darker: "#00527a",
  contrastText: "#FFFFFF",
};

const INFO = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#D8FBDE",
  light: "#86E8AB",
  main: "#36B37E",
  dark: "#1B806A",
  darker: "#0A5554",
  contrastText: "#FFFFFF",
};

const WARNING = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

const COMMON = (themeName: ThemeName) => {
  const primary = PRIMARY(themeName);

  return {
    common: { black: "#000000", white: "#FFFFFF" },
    primary: primary,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.24),
    action: {
      hover: alpha(GREY[500], 0.08),
      selected: alpha(GREY[500], 0.16),
      disabled: alpha(GREY[500], 0.8),
      disabledBackground: alpha(GREY[500], 0.24),
      focus: alpha(GREY[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
};

export default function palette(
  themeMode: "light" | "dark",
  themeName: ThemeName
) {
  const common = COMMON(themeName);

  const light = {
    ...common,
    mode: "light",
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: "#FFFFFF",
      default: GREY[100],
      neutral: GREY[200],
    },
    action: {
      ...common.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    [ThemeName.GITHUB]: {
      ...common,
      mode: "dark",
      text: {
        primary: "#FFFFFF",
        secondary: GREY[500],
        disabled: GREY[600],
      },
      background: {
        paper: "rgb(14, 17, 22)",
        default: "rgb(2, 4, 9)",
        neutral: "rgb(22, 27, 34)",
      },
      action: {
        ...common.action,
        active: GREY[500],
      },
    },
    [ThemeName.GLASS]: {
      ...common,
      mode: "dark",
      text: {
        primary: "#FFFFFF",
        secondary: GREY[500],
        disabled: GREY[600],
      },
      background: {
        paper: GREY[950],
        default: "#000000",
        neutral: alpha(GREY[500], 0.16),
      },
      action: {
        ...common.action,
        active: GREY[500],
      },
    },
    [ThemeName.VERCEL]: {
      ...common,
      mode: "dark",
      text: {
        primary: "#FFFFFF",
        secondary: GREY[500],
        disabled: GREY[600],
      },
      background: {
        paper: "rgb(10, 10, 10)",
        default: "rgb(0, 0, 0)",
        neutral: "rgb(17, 17, 17)",
      },
      action: {
        ...common.action,
        active: GREY[500],
      },
    },
  } as const;

  return themeMode === "light" ? light : dark[themeName];
}
