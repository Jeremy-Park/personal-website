import Iconify from "@/components/Iconify";
import { CONVERSATION_EXAMPLE } from "@/constants/data-generation/constants";
import instructions from "@/constants/data-generation/instructions";
import { downloadFile } from "@/utils/downloadFile";
import useCopyToClipboard from "@/utils/useCopyToClipboard";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { capitalCase } from "change-case";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

// ----------------------------------------------------------------------

type GeneratedFile = {
  name: string;
  content: string;
  type: string;
};

const DataGenerationSection = () => {
  const { copy } = useCopyToClipboard();

  const [conversations, setConversations] = useState<string[]>([""]);
  const [name, setName] = useState<string>("");
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);

  const handleCopyInstructions = () => {
    copy(instructions);
  };

  const handleLoadConversationExample = () => {
    setConversations([CONVERSATION_EXAMPLE]);
  };

  const handleGenerateData = () => {
    // Validate inputs
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (conversations.some((conv) => !conv.trim())) {
      alert("Please fill in all conversations");
      return;
    }

    // Parse name
    const parsedName = capitalCase(name.trim());

    // Generate date
    const date = new Date().toISOString().slice(0, 10);

    // Parse conversations
    const parsedConversations = conversations.map((conv) => {
      // Split by newlines and filter out empty lines
      return (
        conv
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line)
          // Remove quotes if they exist (from example format)
          .map((line) =>
            line.replace(/^"(.*)",$/, "$1").replace(/^"(.*)"$/, "$1")
          )
      );
    });

    // Get conversation length
    let totalConversationLength = 0;
    for (const conv of parsedConversations) {
      totalConversationLength += conv.length;
    }

    // Get turn length
    const turnLength = Math.floor(totalConversationLength / 2);

    // Generate file name
    const fileName = `${parsedName}_${date}_${turnLength}`;

    // Generate JSONL content - ensure UTF-8 compatible
    const jsonlContent = parsedConversations
      .map((conv) => JSON.stringify({ text: conv.join("\n") }))
      .join("\n");

    // Generate TXT content - ensure UTF-8 compatible
    const txtContent = parsedConversations
      .map((conv) => conv.join("\n"))
      .join("\n" + "=".repeat(80) + "\n");

    // Store generated files with UTF-8 BOM marker for text file
    setGeneratedFiles([
      {
        name: `${fileName}.jsonl`,
        content: jsonlContent,
        type: "application/jsonl",
      },
      {
        name: `${fileName}.txt`,
        content: txtContent,
        type: "text/plain",
      },
    ]);

    // Snackbar
    enqueueSnackbar("Data generated successfully with UTF-8 encoding", {
      variant: "success",
    });
  };

  const handleDownloadFile = (file: GeneratedFile) => {
    downloadFile(file.content, file.name, file.type);
  };

  const handleAddConversation = () => {
    setConversations([...conversations, ""]);
  };

  const handleRemoveConversation = (index: number) => {
    setConversations(conversations.filter((_, i) => i !== index));
  };

  const handleClearFiles = () => {
    setGeneratedFiles([]);
  };

  return (
    <Stack spacing={3}>
      {/* AI Instructions */}
      {/* <Card>
        <CardHeader
          subheader="Copy these instructions and paste to your LLM of choice."
          title="AI Instructions"
        />
        <CardContent>
          <pre>{instructions}</pre>
        </CardContent>
        <CardActions>
          <Button onClick={handleCopyInstructions} variant="contained">
            Copy
          </Button>
        </CardActions>
      </Card> */}

      {/* Parse Conversation */}
      <Card>
        <CardHeader
          subheader="Paste your conversation here."
          title="Parse Conversation"
        />
        <CardContent>
          <Stack spacing={2}>
            {/* Conversation */}
            {conversations.map((conversation, index) => (
              <Stack
                alignItems="center"
                direction="row"
                key={index}
                spacing={1}
              >
                <TextField
                  fullWidth
                  label="Conversation"
                  multiline
                  onChange={(e) =>
                    setConversations(
                      conversations.map((c, i) =>
                        i === index ? e.target.value : c
                      )
                    )
                  }
                  rows={10}
                  value={conversation}
                  error={conversation.length === 0}
                  helperText={
                    conversation.length === 0 ? "Conversation is required" : ""
                  }
                />
                <IconButton onClick={() => handleRemoveConversation(index)}>
                  <Iconify icon="mdi:close" />
                </IconButton>
              </Stack>
            ))}

            <Button onClick={handleAddConversation} variant="contained">
              Add Conversation
            </Button>

            {/* Your Name */}
            <TextField
              fullWidth
              label="Your Name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Jacob"
              value={name}
              error={name.length === 0}
              helperText={name.length === 0 ? "Name is required" : ""}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={handleLoadConversationExample} variant="contained">
            Load Example
          </Button>
          <Button onClick={handleGenerateData} variant="contained">
            Generate Data
          </Button>
        </CardActions>
      </Card>

      <Card>
        <CardHeader
          subheader="Download the generated data."
          title="Generated Files"
        />
        <CardContent>
          {generatedFiles.length > 0 ? (
            <List>
              {generatedFiles.map((file, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Button
                      onClick={() => handleDownloadFile(file)}
                      variant="contained"
                      size="small"
                    >
                      Download
                    </Button>
                  }
                >
                  <ListItemText
                    primary={file.name}
                    secondary={
                      file.type === "application/jsonl"
                        ? "JSONL Format"
                        : "Text Format"
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No files have been generated yet. Generate data first.
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={handleClearFiles} variant="contained">
            Clear Files
          </Button>
        </CardActions>
      </Card>

      {/* Preview files */}
      <Card>
        <CardHeader
          subheader="Preview the generated files."
          title="Preview Files"
        />
        <CardContent>
          {generatedFiles.length > 0 ? (
            <Stack spacing={3}>
              {generatedFiles.map((file, index) => (
                <Stack key={index} spacing={1}>
                  <Typography variant="subtitle1">{file.name}</Typography>
                  <TextField
                    multiline
                    fullWidth
                    value={file.content.split("\n").join("\n")}
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                      },
                    }}
                    rows={10}
                    variant="outlined"
                  />
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No files have been generated yet. Generate data first.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DataGenerationSection;
