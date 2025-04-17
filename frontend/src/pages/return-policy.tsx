import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function ReturnPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Return Policy</Typography>
      <Typography variant="body1" paragraph>
        At Bored Board Games, our mission is to make sure you’re never bored! If you’re not absolutely thrilled with your purchase, don’t worry—returns are as easy as rolling a die.
      </Typography>
      <Typography variant="h5" gutterBottom>How Returns Work</Typography>
      <Typography variant="body1" paragraph>
        You have 30 days from delivery to return any game that leaves you yawning. Simply email <b>support@boredboardgames.com</b> with your order number and we’ll send you a return label faster than you can say “Uno!”
      </Typography>
      <Typography variant="h5" gutterBottom>Return Conditions</Typography>
      <Typography variant="body1" paragraph>
        • Games must be in original, un-bored condition (unopened, unused).
        <br />• Refunds processed within 3 business days of receiving your return.
        <br />• Shipping fees are non-refundable.
      </Typography>
      <Typography variant="body1" paragraph>
        Questions? Email <b>support@boredboardgames.com</b> and we’ll help you get back to the fun!
      </Typography>
    </Container>
  );
}
