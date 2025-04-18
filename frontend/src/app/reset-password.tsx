"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useToast } from "../context/ToastContext";

export default function ResetPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const token = params?.get("token");
    if (!token) {
      setStatus("Invalid or missing reset token.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });
      const data = await res.json();
      setStatus(data.msg || "Password reset complete.");
      showToast(data.msg || "Password reset complete.");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setStatus("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="New Password" type="password" fullWidth required value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit" disabled={loading}>Reset Password</Button>
      </form>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {status && <Typography sx={{ mt: 2 }}>{status}</Typography>}
    </Box>
  );
}
