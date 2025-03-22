import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  action?: React.ReactNode;
  subheader?: string | React.ReactNode;
  title: React.ReactNode | string;
};

const PageHeader = ({ action, subheader, title }: Props) => {
  return (
    <Stack
      alignItems="start"
      direction="row"
      justifyContent="space-between"
      spacing={1}
    >
      <Stack>
        <Typography variant="h4">{title}</Typography>
        {subheader && (
          <Typography color="text.secondary" variant="body2">
            {subheader}
          </Typography>
        )}
      </Stack>

      {action && action}
    </Stack>
  );
};

export default PageHeader;
