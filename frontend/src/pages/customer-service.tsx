import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function CustomerService() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Customer Service</Typography>
      <Typography variant="body1" paragraph>
        Our Customer Service Wizards are here to make sure you’re never bored or frustrated! Whether you have questions about games, orders, or how to win at Monopoly, we’re here to help.
      </Typography>
      <Typography variant="h5" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        • Email: <b>support@boredboardgames.com</b>
        <br />• Press: <b>press@boredboardgames.com</b>
        <br />• General: <b>hello@boredboardgames.com</b>
      </Typography>
      <Typography variant="body1" paragraph>
        We answer most emails within 1 business day—because we know the only thing worse than being bored is waiting for a reply!
      </Typography>
    </Container>
  );
}
