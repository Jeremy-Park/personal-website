import { Alert, Box, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ChatInterface from "./ChatInterface";
import { useListings } from "@/hooks/repliers";
import { SimpleListing } from "@/types/repliers";
import ChatListingCard from "./ChatListingCard";

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  listings?: SimpleListing[];
}

export default function ChatSection() {
  const listings = useListings();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [selectedListings, setSelectedListings] = useState<SimpleListing[]>([]);

  const handleSelectListing = (listing: SimpleListing) => {
    setSelectedListings((prev) => [...prev, listing]);
  };

  const handleDeselectListing = (listing: SimpleListing) => {
    setSelectedListings((prev) =>
      prev.filter((l) => l.mlsNumber !== listing.mlsNumber)
    );
  };

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsBotTyping(true);

    // Simulate bot response after random delay between 2-4 seconds
    const delay = Math.random() * 2000 + 2000; // Random delay between 2-4 seconds
    setTimeout(() => {
      const botMessage: Message = {
        text: "Here are some properties that might interest you.",
        isUser: false,
        timestamp: new Date(),
      };
      setIsBotTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, delay);

    // Show typing indicator
    setIsBotTyping(true);

    // Simulate listings
    const delay2 = Math.random() * 2000 + 2000; // Random delay between 2-4 seconds
    setTimeout(() => {
      const botMessage: Message = {
        text: "Here are some properties that might interest you.",
        isUser: false,
        timestamp: new Date(),
        listings: listings.data?.listings.slice(
          selectedListings.length,
          selectedListings.length + 2
        ),
      };
      setIsBotTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, delay2);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        minHeight: "600px", // Important for nested flex containers
      }}
    >
      {/* Left side - Chat */}
      <Stack
        sx={{
          flex: { xs: 1, md: 0.67 },
          minHeight: 0, // Important for nested flex containers
        }}
      >
        <ChatInterface
          selectedListings={selectedListings}
          messages={messages}
          onSendMessage={handleSendMessage}
          isBotTyping={isBotTyping}
          onSelectListing={handleSelectListing}
          onDeselectListing={handleDeselectListing}
        />
      </Stack>

      {/* Right side - Empty for now */}
      <Stack
        sx={{
          flexGrow: 1,
          flexShrink: 0,
          flex: { xs: 1, md: 0.33 },
          minHeight: 0, // Important for nested flex containers
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6">Selected Listings</Typography>
            {selectedListings.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Your selected listings will appear here.
              </Typography>
            )}
            <Box sx={{ overflow: "auto", maxHeight: "600px" }}>
              <Stack spacing={1}>
                {selectedListings.map((listing) => (
                  <ChatListingCard
                    key={listing.mlsNumber}
                    listing={listing}
                    isSelected={selectedListings.includes(listing)}
                    onSelectListing={handleSelectListing}
                    onDeselectListing={handleDeselectListing}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
