import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

function RestaurantAdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    // Temporary admin login
    if (
      email === "admin@foodgo.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "restaurantAdmin",
        JSON.stringify({
          email: "admin@foodgo.com",
          name: "FoodGo Restaurant Admin",
          role: "restaurant-admin",
        })
      );

      navigate("/restaurant-dashboard");
    } else {
      setError("Invalid restaurant admin credentials.");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background:
          "linear-gradient(135deg,#fff7ed,#ffedd5,#fed7aa)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          boxShadow:
            "0 12px 35px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: "center",
          }}
        >
          {/* ICON */}
          <Box
            sx={{
              width: 75,
              height: 75,
              mx: "auto",
              mb: 2,
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg,#f97316,#ea580c)",
              color: "white",
              boxShadow:
                "0 8px 20px rgba(249,115,22,0.3)",
            }}
          >
            <RestaurantOutlinedIcon
              sx={{ fontSize: 40 }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight={800}
            color="#111827"
          >
            Restaurant Admin
          </Typography>

          <Typography
            sx={{
              mt: 1,
              mb: 3,
              color: "#6b7280",
            }}
          >
            Login to manage restaurant orders
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

          {/* EMAIL */}
          <TextField
            fullWidth
            label="Admin Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter admin email"
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            label="Password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      sx={{
                        color: "#9ca3af",
                      }}
                    />
                  </InputAdornment>
                ),

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

          {/* LOGIN */}
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
              fontWeight: 700,
              fontSize: 16,
              textTransform: "none",
              "&:hover": {
                background: "#ea580c",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{ color: "white" }}
              />
            ) : (
              "Login as Restaurant Admin"
            )}
          </Button>

          <Typography
            sx={{
              mt: 3,
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            FoodGo Restaurant Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 11,
              color: "#9ca3af",
            }}
          >
            Developed by Ketki Shukla
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RestaurantAdminLogin;