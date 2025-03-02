"use client";

import Iconify from "@/components/Iconify";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import SettingsDrawer from "./SettingsDrawer";

// ----------------------------------------------------------------------

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Jeremy's App
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
      </AppBar>
      <SettingsDrawer open={drawerOpen} onClose={handleDrawerToggle} />
    </>
  );
};

export default Navbar;
