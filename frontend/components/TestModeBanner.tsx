"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export default function TestModeBanner() {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") return null;
  return (
    <Box sx={{ width: "100%", bgcolor: "#ffeb3b", py: 1, textAlign: "center", zIndex: 2000, position: "fixed", top: 0, left: 0 }}>
      <Typography variant="body2" fontWeight={700} color="#222">
        TEST MODE — This is a preview/staging environment
      </Typography>
    </Box>
  );
}
