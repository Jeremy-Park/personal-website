import { Alert, Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client"; // Import Socket.IO client
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
  const socketRef = useRef<Socket | null>(null); // Use Socket type from socket.io-client

  useEffect(() => {
    // Connect to Socket.IO server
    // It's often better to use the same protocol as the http server, 
    // but ws://localhost:3001 explicitly uses WebSocket.
    socketRef.current = io("ws://localhost:3001", {
      transports: ["websocket"], // Ensure WebSocket transport is used
      // You might need to add withCredentials: true if your server uses cookies/sessions
    });
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server with ID:", socket.id);
      // Example: Send a test message upon connection if needed
      // socket.emit("test_message", { info: "Client connected" });
    });

    // Handle standard chat bot responses (full or streamed)
    const handleBotResponse = (serverData: any) => {
      if (serverData.type === 'fullBotResponse') {
        setIsBotTyping(false);
        const botMessage: Message = {
          text: serverData.text,
          isUser: false,
          timestamp: new Date(),
          listings: serverData.listings,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else if (serverData.type === 'streamChunk') {
        setIsBotTyping(true);
        setMessages((prevMessages) => {
          const lastMessage = prevMessages.length > 0 ? prevMessages[prevMessages.length - 1] : null;
          if (lastMessage && !lastMessage.isUser && !serverData.isFinalChunkOfNewStream) { // isFinalChunkOfNewStream is a hypothetical flag you might add
            const updatedMessages = [...prevMessages];
            const currentBotMessage = updatedMessages[prevMessages.length - 1];
            updatedMessages[prevMessages.length - 1] = {
              ...currentBotMessage,
              text: currentBotMessage.text + serverData.textDelta,
              listings: serverData.listings || currentBotMessage.listings,
              timestamp: new Date(),
            };
            return updatedMessages;
          } else {
            const newBotMessage: Message = {
              text: serverData.textDelta,
              isUser: false,
              timestamp: new Date(),
              listings: serverData.listings,
            };
            return [...prevMessages, newBotMessage];
          }
        });
        if (serverData.isFinal) {
          setIsBotTyping(false);
        }
      }
    };

    socket.on("bot_response", handleBotResponse); // Generic event for bot chat messages

    // Listen for specific events from your example
    socket.on("test_response", (data) => {
      console.log("Received 'test_response':", data);
      const botMessage: Message = {
        text: `Test Response: ${JSON.stringify(data)}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    });

    socket.on("weather_forecast", (data) => {
      console.log("Received 'weather_forecast':", data);
      const botMessage: Message = {
        text: `Weather Forecast: ${JSON.stringify(data)}`,
        isUser: false,
        timestamp: new Date(),
        // Assuming data might contain listings, adjust as needed
        // listings: data.listings
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    });

    socket.on("weather_error", (errorData) => {
      console.error("Received 'weather_error':", errorData);
      const errorMessage: Message = {
        text: `Weather Error: ${JSON.stringify(errorData)}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsBotTyping(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from Socket.IO server:", reason);
      const closeMessage: Message = {
        text: "Disconnected from server. Attempting to reconnect...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, closeMessage]);
      setIsBotTyping(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      const errorMessage: Message = {
        text: "Connection error. Please check the server and your connection.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsBotTyping(false);
    });

    return () => {
      if (socket) {
        console.log("Disconnecting Socket.IO client...");
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("bot_response", handleBotResponse);
        socket.off("test_response");
        socket.off("weather_forecast");
        socket.off("weather_error");
        socket.disconnect();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  const handleSelectListing = (listing: SimpleListing) => {
    setSelectedListings((prev) => [...prev, listing]);
  };

  const handleDeselectListing = (listing: SimpleListing) => {
    setSelectedListings((prev) =>
      prev.filter((l) => l.mlsNumber !== listing.mlsNumber)
    );
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);

    if (socketRef.current && socketRef.current.connected) {
      const socket = socketRef.current;
      try {
        const parsedInput = JSON.parse(text);
        if (parsedInput && typeof parsedInput.type === 'string' && typeof parsedInput.payload !== 'undefined') {
          // Emitting a custom event based on parsedInput.type
          console.log(`Emitting custom event '${parsedInput.type}' with payload:`, parsedInput.payload);
          socket.emit(parsedInput.type, parsedInput.payload); 
        } else {
          // Not a structured command, send as a generic chat input
          console.log("Emitting 'chatInput' with payload:", { text, selectedListings });
          socket.emit("chatInput", { text, selectedListings });
        }
      } catch (error) {
        // Not a valid JSON string, send as generic chat input
        console.log("Emitting 'chatInput' (input was not valid JSON) with payload:", { text, selectedListings });
        socket.emit("chatInput", { text, selectedListings });
      }
    } else {
      console.error("Socket.IO is not connected.");
      const errorMessage: Message = {
        text: "Not connected to the server. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsBotTyping(false);
    }
    // Bot response is handled by socket event listeners
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
