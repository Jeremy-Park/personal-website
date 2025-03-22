import { Box, Paper, keyframes } from "@mui/material";

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
`;

export default function TypingIndicator() {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "70%",
          backgroundColor: "background.neutral",
          color: "text.primary",
        }}
      >
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "text.secondary",
                  animation: `${bounce} 1s infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
