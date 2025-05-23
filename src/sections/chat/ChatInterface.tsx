import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Message } from "./ChatSection";
import TypingIndicator from "./TypingIndicator";

// ----------------------------------------------------------------------

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isBotTyping: boolean;
}

// ----------------------------------------------------------------------

export default function ChatInterface({
  messages,
  onSendMessage,
  isBotTyping,
}: ChatInterfaceProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSend = () => {
    if (inputText.trim() === "") return;
    onSendMessage(inputText);
    setInputText("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* Messages area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxHeight: "500px",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.isUser ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: "70%",
                backgroundColor: message.isUser
                  ? "primary.main"
                  : "background.neutral",
                color: message.isUser ? "white" : "text.primary",
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  opacity: 0.8,
                }}
              >
                {message.timestamp.toLocaleTimeString()}
              </Typography>

              {/* Listings - REMOVED */}
              {/* {message.listings && (
                <Stack direction="row" spacing={1}>
                  {message.listings.map((listing) => (
                    <ChatListingCard
                      isSelected={selectedListings.includes(listing)}
                      onSelectListing={onSelectListing}
                      onDeselectListing={onDeselectListing}
                      key={`chat-listing-card-${listing.mlsNumber}`}
                      listing={listing}
                    />
                  ))}
                </Stack>
              )} */}
            </Paper>
          </Box>
        ))}
        {isBotTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            variant="contained"
            endIcon={<Icon icon="material-symbols:send" />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
