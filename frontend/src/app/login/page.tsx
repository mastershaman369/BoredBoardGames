"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "../../context/ToastContext";
import { Box, Button } from "@mui/material";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast("Logged in!");
      router.push("/admin");
    } catch (err: any) {
      showToast(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    window.location.href = `/api/auth/oauth/${provider}`;
  };

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: 10, background: "#16A085", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Button onClick={() => handleOAuth("google")}
        sx={{ mt: 2, width: "100%", background: "#DB4437", color: "#fff" }}>
        Login with Google
      </Button>
      <Button onClick={() => handleOAuth("github")}
        sx={{ mt: 1, width: "100%", background: "#333", color: "#fff" }}>
        Login with GitHub
      </Button>
      <div style={{ marginTop: 16 }}>
        <a href="/request-reset">Forgot password?</a>
      </div>
    </main>
  );
}
