"use client";

import { Box, Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Icon } from "@iconify/react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter } from "next/navigation";
import { DRAWER_WIDTH, navConfig } from "../../../config/navigation";

interface NavDrawerProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function NavDrawer({
  mobileOpen = false,
  onMobileClose,
}: NavDrawerProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const router = useRouter();

  const handleDrawerToggle = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const content = (
    <Box>
      <List sx={{ mt: 2 }}>
        {navConfig.map((item) => {
          const active = pathname === item.path;

          return (
            <ListItem key={item.title} disablePadding sx={{ px: 2 }}>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  if (!isDesktop) {
                    handleDrawerToggle();
                  }
                }}
                sx={{
                  borderRadius: 1,
                  color: active ? "primary.main" : "text.secondary",
                  bgcolor: active ? "action.selected" : "transparent",
                }}
              >
                <ListItemIcon>
                  <Icon icon={item.icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
        },
      }}
    >
      {content}
    </Drawer>
  );
}
