import React from "react";
import {
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
const MuiComponentShowcase = () => {
  return (
    <Stack spacing={3}>
      <Button variant="contained">hello</Button>

      <Card>
        <CardContent>
          <Typography variant="h5">hello</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">hello</Button>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default MuiComponentShowcase;
