"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function NavBarMui() {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Bored Board Games
          </Typography>
          <Button component={Link} href="/" color="inherit">
            Home
          </Button>
          <Button component={Link} href="/collections/all" color="inherit">
            Shop All
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button component={Link} href="/cart" color="inherit">
            <Badge badgeContent={cart.length} color="secondary">
              Cart
            </Badge>
          </Button>
          {isAuthenticated ? (
            <>
              <Button component={Link} href="/admin" color="inherit">
                Admin
              </Button>
              <Button onClick={logout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} href="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} href="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
