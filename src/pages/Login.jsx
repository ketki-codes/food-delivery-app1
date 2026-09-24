import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
       "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      // ==========================================
      // SAVE LOGGED-IN USER
      // ==========================================

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        if (data.user.id) {
          localStorage.setItem(
            "userId",
            data.user.id
          );
        }

        if (data.user.name) {
          localStorage.setItem(
            "userName",
            data.user.name
          );
        }

        if (data.user.email) {
          localStorage.setItem(
            "userEmail",
            data.user.email
          );
        }

        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 2,
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f97316",
              fontSize: 35,
              boxShadow:
                "0 8px 20px rgba(249,115,22,0.3)",
            }}
          >
            🍔
          </Box>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#1f2937",
              fontSize: {
                xs: "28px",
                sm: "34px",
              },
            }}
          >
            Welcome Back!
          </Typography>

          <Typography
            sx={{
              mt: 1,
              mb: 3,
              color: "#6b7280",
            }}
          >
            Login to continue ordering delicious food 🍕
          </Typography>

          {/* Error */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                textAlign: "left",
              }}
            >
              {error}
            </Alert>
          )}

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type={
              showPassword ? "text" : "password"
            }
            margin="normal"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "🙈"
                        : "👁️"}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Login */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              background: "#f97316",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                background: "#ea580c",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                }}
              />
            ) : (
              "Login"
            )}
          </Button>

          {/* Signup */}
          <Typography
            sx={{
              mt: 3,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() =>
                navigate("/signup")
              }
              sx={{
                color: "#f97316",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create Account
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;