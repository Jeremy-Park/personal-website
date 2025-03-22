"use client";

import Iconify from "@/components/Iconify";
import NavDrawer from "@/components/nav/NavDrawer";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { DRAWER_WIDTH } from "../../../config/navigation";
import SettingsDrawer from "./SettingsDrawer";

// ----------------------------------------------------------------------

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleMobileNavToggle = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          {/* Mobile Navigation Menu Button */}
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMobileNavToggle}
              sx={{ mr: 2 }}
            >
              <Iconify icon="mdi:menu" width={24} />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Jeremy's App
          </Typography>

          {/* Settings Button */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleSettingsToggle}
            aria-label="theme settings"
          >
            <Iconify icon="solar:settings-bold" width={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Settings Drawer */}
      <SettingsDrawer open={settingsOpen} onClose={handleSettingsToggle} />

      <Box display="flex" sx={{ pt: 10 }}>
        <NavDrawer
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />

        {children}
      </Box>
    </>
  );
};

export default Navbar;
