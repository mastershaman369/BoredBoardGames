"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useToast } from "../context/ToastContext";

export default function VerifyEmail() {
  const router = useRouter();
  const params = useSearchParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const token = params?.get("token");
    if (!token) {
      setStatus("Invalid verification link.");
      setLoading(false);
      return;
    }
    fetch(`/api/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.msg || "Verification complete.");
        showToast(data.msg || "Verification complete.");
        setTimeout(() => router.push("/login"), 2000);
      })
      .catch(() => setStatus("Verification failed."))
      .finally(() => setLoading(false));
  }, [params, router, showToast]);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 3, background: "#fff", borderRadius: 2, boxShadow: 1, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Email Verification</Typography>
      {loading ? <CircularProgress /> : <Typography>{status}</Typography>}
    </Box>
  );
}
