import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function Contact() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        Got a question, suggestion, or just want to say hello? Don’t let boredom win—reach out to us!
      </Typography>
      <Typography variant="body1" paragraph>
        <b>General:</b> hello@boredboardgames.com
        <br /><b>Support:</b> support@boredboardgames.com
        <br /><b>Press:</b> press@boredboardgames.com
      </Typography>
      <Typography variant="body1" paragraph>
        We love hearing from fellow board game fans. Let’s make boredom a thing of the past!
      </Typography>
    </Container>
  );
}
