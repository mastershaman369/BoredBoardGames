"use client";
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, CircularProgress, Button, TextField } from "@mui/material";
import useAnalytics from "../../../../hooks/useAnalytics";

export default function ProductReviews({ productId }: { productId: string }) {
  const { track } = useAnalytics();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [success, setSuccess] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      track("page_view", { page: "product_reviews", productId });
      isFirstLoad.current = false;
    }
    fetch(`/api/products/${productId}/reviews?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(prev => offset === 0 ? data : [...prev, ...data]);
          setHasMore(data.length === limit);
        } else {
          setError("Failed to load reviews.");
        }
      })
      .catch(() => setError("Failed to load reviews"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [offset, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, rating }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setSuccess("Review submitted!");
      setText("");
      setRating(5);
      setOffset(0);
      track("review_submit", { productId });
    } catch {
      setError("Failed to submit review");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Reviews</Typography>
      {loading && offset === 0 ? <CircularProgress /> : (
        <Box>
          {reviews.length ? reviews.map((r, i) => (
            <Box key={i} sx={{ mb: 2, p: 2, border: "1px solid #eee", borderRadius: 1 }}>
              <Typography variant="subtitle2">Rating: {r.rating} / 5</Typography>
              <Typography>{r.text}</Typography>
              <Typography variant="caption">by User {r.user_id} at {new Date(r.created_at).toLocaleString()}</Typography>
            </Box>
          )) : <Typography>No reviews yet.</Typography>}
        </Box>
      )}
      {hasMore && (
        <Button variant="outlined" onClick={() => setOffset(offset + limit)} sx={{ mt: 2 }}>Load More</Button>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField label="Review" value={text} onChange={e => setText(e.target.value)} fullWidth required sx={{ mb: 1 }} />
        <TextField label="Rating (1-5)" type="number" value={rating} onChange={e => setRating(Number(e.target.value))} inputProps={{ min: 1, max: 5 }} sx={{ mb: 1 }} required />
        <Button type="submit" variant="contained">Submit Review</Button>
        {success && <Typography color="success.main" sx={{ mt: 1 }}>{success}</Typography>}
        {error && <Typography color="error.main" sx={{ mt: 1 }}>{error}</Typography>}
      </Box>
    </Box>
  );
}
