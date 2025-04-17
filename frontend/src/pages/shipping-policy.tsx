import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function ShippingPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Shipping Policy</Typography>
      <Typography variant="body1" paragraph>
        We ship fun straight to your door! All orders ship within 2 business days—because boredom waits for no one.
      </Typography>
      <Typography variant="h5" gutterBottom>Shipping Methods</Typography>
      <Typography variant="body1" paragraph>
        • Standard Shipping: 3-5 business days (for when you can’t wait to play)
        <br />• Expedited Shipping: 1-2 business days (for the truly impatient)
      </Typography>
      <Typography variant="h5" gutterBottom>Tracking</Typography>
      <Typography variant="body1" paragraph>
        You’ll get a tracking number as soon as your order ships. Watch your games travel from us to you—no dice rolling required!
      </Typography>
      <Typography variant="body1" paragraph>
        Still waiting? Email <b>support@boredboardgames.com</b> and we’ll chase down your boredom-busting games.
      </Typography>
    </Container>
  );
}
