"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useThemeOptions, ThemeName } from "@/theme/ThemeOptionsContext";
import Iconify from "@/components/Iconify";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, themeName, toggleMode, setThemeName } = useThemeOptions();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleThemeToggle = () => {
    toggleMode();
  };

  const themeSettings = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Theme Settings
      </Typography>

      <FormControlLabel
        control={
          <Switch checked={mode === "dark"} onChange={handleThemeToggle} />
        }
        label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`}
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
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleDrawerToggle}
          aria-label="theme settings"
        >
          <Iconify icon="solar:settings-bold" width={24} />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {themeSettings}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
