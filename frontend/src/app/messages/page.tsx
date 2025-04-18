"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(setMessages)
      .catch(() => setError("Failed to load messages"))
      .finally(() => setLoading(false));
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiver_id: receiverId, content }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSuccess("Message sent!");
      setContent("");
      setReceiverId("");
    } catch {
      setError("Failed to send message");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Inbox</Typography>
      {loading ? <Typography>Loading...</Typography> : (
        <List>
          {messages.length ? messages.map((msg, idx) => (
            <React.Fragment key={msg.id || idx}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={msg.content}
                  secondary={`From: User ${msg.sender_id} | ${new Date(msg.timestamp).toLocaleString()}`}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          )) : <Typography>No messages.</Typography>}
        </List>
      )}
      <Box component="form" onSubmit={handleSend} sx={{ mt: 4 }}>
        <Typography variant="h6">Send a Message</Typography>
        <TextField label="Receiver User ID" value={receiverId} onChange={e => setReceiverId(e.target.value)} fullWidth sx={{ mb: 2 }} required />
        <TextField label="Message" value={content} onChange={e => setContent(e.target.value)} fullWidth required multiline rows={2} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit">Send</Button>
        {success && <Typography color="success.main" sx={{ mt: 1 }}>{success}</Typography>}
        {error && <Typography color="error.main" sx={{ mt: 1 }}>{error}</Typography>}
      </Box>
    </Box>
  );
}
