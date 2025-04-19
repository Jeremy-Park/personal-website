"use client";

import { Box, Collapse, IconButton } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  MaterialDesignContent,
  SnackbarProvider as NotistackProvider,
  SnackbarKey,
} from "notistack";
import { useRef } from "react";
import Iconify from "../Iconify";
import StyledNotistack from "./styles";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  // const { themeDirection } = useSettingsContext();

  // const isRTL = themeDirection === 'rtl';
  const isRTL = false;

  //get current theme
  const theme = useTheme();

  const notistackRef = useRef<any>(null);

  const isLight = theme.palette.mode === "light";

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    "&.notistack-MuiContent-info": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    "&.notistack-MuiContent-warning": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  }));

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          info: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
        }}
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={6000}
        TransitionComponent={isRTL ? Collapse : undefined}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          info: <SnackbarIcon icon="eva:info-fill" color="info" />,
          success: (
            <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />
          ),
          warning: (
            <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />
          ),
          error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />,
        }}
        // With close as default
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon="mdi:close" />
          </IconButton>
        )}
        style={{
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {children}
      </NotistackProvider>
    </>
  );
}

// ----------------------------------------------------------------------

type SnackbarIconProps = {
  icon: any;
  color: "info" | "success" | "warning" | "error";
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Iconify icon={icon} width={24} />
    </Box>
  );
}
