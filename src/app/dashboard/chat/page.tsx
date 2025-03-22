"use client";

import PageHeader from "@/components/PageHeader";
import ChatSection from "@/sections/chat/ChatSection";
import { Container, Stack } from "@mui/material";

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
        <PageHeader title="Chat" />
        <ChatSection />
      </Stack>
    </Container>
  );
}
