import { Alert, Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import ChatInterface from "./ChatInterface";

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  // listings property removed
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", { // Using http as per guide
      transports: ["websocket"],
    });
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to MCP Weather Chatbot server with ID:", socket.id);
      // Optional: You could add a welcome message to the chat UI here
      // const welcomeMsg: Message = { text: "Connected to Weather Bot!", isUser: false, timestamp: new Date() };
      // setMessages(prev => [...prev, welcomeMsg]);
    });

    // Listener for 'test_response'
    socket.on("test_response", (data: { original_message: any; reply: string }) => {
      console.log("Received 'test_response':", data);
      const botMessage: Message = {
        text: `Test Response: ${data.reply} (Original: ${JSON.stringify(data.original_message)})`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    });

    // Listener for 'weather_forecast'
    socket.on("weather_forecast", (data: any[]) => { // Assuming data is the array of periods
      console.log("Received 'weather_forecast':", data);
      // Simple display for now, could be formatted better
      let forecastText = "Weather Forecast:\n";
      data.forEach(period => {
        forecastText += `${period.name}: ${period.temperature}°${period.temperatureUnit}, ${period.shortForecast || period.detailedForecast}\n`;
      });
      const botMessage: Message = {
        text: forecastText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    });

    // Listener for 'weather_error'
    socket.on("weather_error", (errorData: { error: string; details?: string }) => {
      console.error("Received 'weather_error':", errorData);
      const errorMessage: Message = {
        text: `Weather Error: ${errorData.error}${errorData.details ? ' (Details: ' + errorData.details + ')' : ''}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsBotTyping(false);
    });

    // Listener for 'chat_response'
    socket.on("chat_response", (data: { sender: string; message: string }) => {
      console.log("Received 'chat_response':", data.message);
      if (data.sender === "bot") {
        const botMessage: Message = {
          text: data.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => {
          // Check if the last message is a typing indicator or an incomplete stream
          // For simple chat_response, we just add it. If streaming is re-introduced, this needs adjustment.
          return [...prevMessages, botMessage];
        });
        setIsBotTyping(false);
      }
    });

    // Listener for 'chat_error'
    socket.on("chat_error", (errorData: { error: string; details?: string }) => {
      console.error("Received 'chat_error':", errorData);
      const errorMessage: Message = {
        text: `Chat Error: ${errorData.error}${errorData.details ? ' (Details: ' + errorData.details + ')' : ''}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsBotTyping(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from Socket.IO server:", reason);
      const closeMessage: Message = {
        text: "Disconnected. Attempting to reconnect...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, closeMessage]);
      setIsBotTyping(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      const errorMessage: Message = {
        text: "Connection error. Please check the server.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsBotTyping(false);
    });

    return () => {
      if (socket) {
        console.log("Disconnecting Socket.IO client from MCP Weather Bot...");
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("test_response");
        socket.off("weather_forecast");
        socket.off("weather_error");
        socket.off("chat_response");
        socket.off("chat_error");
        socket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true); // Assume bot will reply

    if (socketRef.current && socketRef.current.connected) {
      const socket = socketRef.current;
      // Always send as a chat message, backend will handle natural language processing
      console.log("Emitting 'send_chat_message' with message:", text);
      socket.emit("send_chat_message", { message: text, history: [] });
      
      // The previous logic for parsing JSON for specific commands (test_message, get_weather_forecast)
      // has been removed as per the new requirement for natural language input.
      // If you still need a way to send those specific commands, you might consider dedicated UI elements
      // or a special prefix/syntax that this function could detect, but for now, all input is natural language chat.

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
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        minHeight: "600px",
      }}
    >
      <Stack
        sx={{
          flex: 1,
          minHeight: 0,
        }}
      >
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isBotTyping={isBotTyping}
        />
      </Stack>
    </Stack>
  );
}
