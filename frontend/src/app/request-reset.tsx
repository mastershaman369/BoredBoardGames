"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useToast } from "../context/ToastContext";

export default function RequestReset() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.msg || "Check your email for reset link.");
      showToast(data.msg || "Check your email for reset link.");
    } catch {
      setStatus("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Request Password Reset</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit" disabled={loading}>Send Reset Email</Button>
      </form>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {status && <Typography sx={{ mt: 2 }}>{status}</Typography>}
    </Box>
  );
}
