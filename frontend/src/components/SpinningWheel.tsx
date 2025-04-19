import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const rewards = ["5% off", "10% off", "15% off", "20% off", "Free Shipping"];

export default function SpinningWheel() {
  const [reward, setReward] = useState<string>("");

  const handleSpin = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Spin & Win</Typography>
      <Button variant="contained" color="primary" onClick={handleSpin}>Spin the Wheel</Button>
      {reward && (
        <Typography variant="h6" sx={{ mt: 2 }}>You won: {reward}!</Typography>
      )}
    </Box>
  );
}
