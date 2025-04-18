"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Chip, Avatar, CircularProgress } from "@mui/material";

export default function PublicProfile({ params }: { params: { user_id: string } }) {
  const { user_id } = params;
  const [profile, setProfile] = useState<any>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/profiles/${user_id}`)
      .then(res => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        return fetch(`/api/profile/badges`).then(r => r.json());
      })
      .then(badgeRes => setBadges(badgeRes.badges || []))
      .catch(() => setError("Profile not found"))
      .finally(() => setLoading(false));
  }, [user_id]);

  if (loading) return <Box sx={{ mt: 8, textAlign: "center" }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ mt: 8, textAlign: "center", color: "red" }}>{error}</Box>;

  return (
    <Box sx={{ maxWidth: 500, margin: "40px auto", p: 3, background: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={profile.avatar_url} alt={profile.display_name} sx={{ width: 64, height: 64 }} />
        <Box>
          <Typography variant="h5">{profile.display_name}</Typography>
          <Typography variant="body2" color="text.secondary">{profile.bio}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Badges</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          {badges.length ? badges.map(b => <Chip key={b} label={b} color="primary" />) : <Typography>No badges yet.</Typography>}
        </Box>
      </Box>
    </Box>
  );
}
