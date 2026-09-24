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

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
       "http://localhost:5000/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      const savedUserName =
        data.user?.name || name.trim();

      const savedUserEmail =
        data.user?.email || email.trim();

      localStorage.setItem(
        "userName",
        savedUserName
      );

      localStorage.setItem(
        "userEmail",
        savedUserEmail
      );

      if (data.user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );
      } else {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: savedUserName,
            email: savedUserEmail,
          })
        );
      }

      setSuccess(
        "Account created successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);

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
            Create Account
          </Typography>

          <Typography
            sx={{
              mt: 1,
              mb: 3,
              color: "#6b7280",
            }}
          >
            Join us and order your favourite food 🍕
          </Typography>

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

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                textAlign: "left",
              }}
            >
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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

          <TextField
            fullWidth
            label="Password"
            type={
              showPassword ? "text" : "password"
            }
            margin="normal"
            placeholder="Create a password"
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
                      edge="end"
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

          <TextField
            fullWidth
            label="Confirm Password"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            margin="normal"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      edge="end"
                    >
                      {showConfirmPassword
                        ? "🙈"
                        : "👁️"}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSignup}
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
              "Create Account"
            )}
          </Button>

          <Typography
            sx={{
              mt: 3,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() =>
                navigate("/login")
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
              Login
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;