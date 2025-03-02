import { ThemeName, useThemeOptions } from "@/theme/ThemeOptionsContext";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { Drawer } from "@mui/material";
import { capitalCase } from "change-case";
import React from "react";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
};

// ----------------------------------------------------------------------

const SettingsDrawer = ({ open, onClose }: Props) => {
  const { mode, themeName, toggleMode, setThemeName } = useThemeOptions();

  const handleThemeToggle = () => {
    toggleMode();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: "100%", md: 320 }, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Theme Settings
        </Typography>

        <FormControlLabel
          control={
            <Switch checked={mode === "dark"} onChange={handleThemeToggle} />
          }
          label={`${capitalCase(mode)} Mode`}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth>
          <InputLabel>Theme</InputLabel>
          <Select
            value={themeName}
            label="Theme"
            onChange={(e) => setThemeName(e.target.value as ThemeName)}
          >
            {Object.values(ThemeName).map((name) => (
              <MenuItem key={name} value={name}>
                {capitalCase(name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
