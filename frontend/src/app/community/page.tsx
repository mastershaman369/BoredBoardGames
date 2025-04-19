"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { exampleCommunityPosts } from "../../data/exampleCommunityPosts";

export default function CommunityPage() {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>Community</Typography>
      {exampleCommunityPosts.map(post => (
        <Paper key={post.id} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            By {post.user.name} on {post.createdAt}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>{post.content}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
