import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  backButton?: React.ReactNode;
  action?: React.ReactNode;
  subheader?: string | React.ReactNode;
  title: React.ReactNode | string;
};

const PageHeader = ({ action, backButton, subheader, title }: Props) => {
  return (
    <Stack
      alignItems="start"
      direction="row"
      justifyContent="space-between"
      spacing={1}
    >
      <Stack alignItems="center" direction="row" spacing={2}>
        {backButton && backButton}

        <Stack>
          <Typography variant="h4">{title}</Typography>
          {subheader && (
            <Typography color="text.secondary" variant="body2">
              {subheader}
            </Typography>
          )}
        </Stack>
      </Stack>

      {action && action}
    </Stack>
  );
};

export default PageHeader;
