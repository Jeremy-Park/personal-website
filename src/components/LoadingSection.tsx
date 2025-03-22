import { Box, CircularProgress } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

const LoadingSection = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={300}
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSection;
