import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>About Bored Board Games</Typography>
      <Typography variant="body1" paragraph>
        Bored Board Games was founded to defeat boredom everywhere, one game night at a time! We believe that laughter, strategy, and a little friendly competition are the best cures for a dull day.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you’re a seasoned gamer or just looking for a fun way to spend a rainy afternoon, our curated selection of games is sure to keep you entertained. We’re here to help you discover your next favorite game and connect with friends and family—because life’s too short to be bored!
      </Typography>
      <Typography variant="body1" paragraph>
        Join us in making boredom extinct—one board game at a time!
      </Typography>
    </Container>
  );
}
