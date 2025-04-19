"use client";

import PageHeader from "@/components/PageHeader";
import DataGenerationSection from "@/sections/data-generation/DataGenerationSection";
import { Container, Stack } from "@mui/material";

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack py={5} spacing={5}>
        <PageHeader title="Data Generation" />
        <DataGenerationSection />
      </Stack>
    </Container>
  );
}
