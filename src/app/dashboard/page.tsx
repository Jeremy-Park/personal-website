"use client";
import PageHeader from "@/components/PageHeader";
import MuiComponentShowcase from "@/sections/MuiComponentShowcase";
import { Container, Stack } from "@mui/material";

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <Container>
      <Stack py={5} spacing={5}>
        <PageHeader title="Dashboard" />
        <MuiComponentShowcase />
      </Stack>
    </Container>
  );
}
