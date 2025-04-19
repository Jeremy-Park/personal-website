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
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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

    if (conversations.some(conv => !conv.trim())) {
      alert("Please fill in all conversations");
      return;
    }

    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${name}_${date}`;
    
    // Parse conversations
    const parsedConversations = conversations.map(conv => {
      // Split by newlines and filter out empty lines
      return conv.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        // Remove quotes if they exist (from example format)
        .map(line => line.replace(/^"(.*)",$/, '$1').replace(/^"(.*)"$/, '$1'));
    });
    
    // Generate JSONL content
    const jsonlContent = parsedConversations
      .map(conv => JSON.stringify({ text: conv.join('\n') }))
      .join('\n');
    
    // Generate TXT content
    const txtContent = parsedConversations
      .map(conv => conv.join('\n'))
      .join('\n' + '='.repeat(80) + '\n');
    
    // Store generated files
    setGeneratedFiles([
      {
        name: `${fileName}.jsonl`,
        content: jsonlContent,
        type: 'application/jsonl'
      },
      {
        name: `${fileName}.txt`,
        content: txtContent,
        type: 'text/plain'
      }
    ]);
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

  return (
    <Stack spacing={3}>
      {/* AI Instructions */}
      <Card>
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
      </Card>

      {/* Parse Conversation */}
      <Card>
        <CardHeader
          subheader="Paste your conversation here."
          title="Parse Conversation"
        />
        <CardContent>
          <Stack spacing={1}>
            {/* Conversation */}
            {conversations.map((conversation, index) => (
              <Stack key={index} spacing={1}>
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
                    conversation.length === 0
                      ? "Conversation is required"
                      : ""
                  }
                />
                <Button
                  onClick={() => handleRemoveConversation(index)}
                  variant="contained"
                >
                  Remove
                </Button>
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
                    secondary={file.type === 'application/jsonl' ? 'JSONL Format' : 'Text Format'} 
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
      </Card>
    </Stack>
  );
};

export default DataGenerationSection;
