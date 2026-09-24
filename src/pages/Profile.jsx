import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Profile = () => {
  const navigate = useNavigate();

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================
  const savedUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(localStorage.getItem("user")) ||
    {};

  const savedName =
    localStorage.getItem("userName") ||
    savedUser.name ||
    "User";

  const savedEmail =
    localStorage.getItem("userEmail") ||
    savedUser.email ||
    "";

  const [profile, setProfile] = useState({
    name: savedName,
    email: savedEmail,
    phone: savedUser.phone || "",
    city: savedUser.city || "",
    address: savedUser.address || "",
  });

  const [editMode, setEditMode] = useState(false);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================
  const handleSave = () => {
    localStorage.setItem(
      "userName",
      profile.name
    );

    localStorage.setItem(
      "userEmail",
      profile.email
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(profile)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(profile)
    );

    setEditMode(false);
  };

  // ==========================================
  // AVATAR LETTER
  // ==========================================
  const avatarLetter =
    profile.name?.trim()?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Back to Dashboard */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard")}
        sx={{
          textTransform: "none",
          mb: 2,
          fontWeight: 600,
        }}
      >
        Back to Dashboard
      </Button>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1e293b",
            mb: 0.5,
          }}
        >
          My Profile
        </Typography>

        <Typography color="text.secondary">
          Manage your personal information
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 4,
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 5 },
          }}
        >
          {/* Profile Top */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 4,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              textAlign: {
                xs: "center",
                sm: "left",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  background:
                    "linear-gradient(135deg, #f97316, #ea580c)",
                  fontSize: 42,
                  fontWeight: 700,
                  boxShadow:
                    "0 8px 20px rgba(249,115,22,0.25)",
                }}
              >
                {avatarLetter}
              </Avatar>

              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "white",
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                }}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
              >
                {profile.name}
              </Typography>

              <Typography color="text.secondary">
                Food Delivery Customer
              </Typography>

              {profile.email && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {profile.email}
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Personal Information */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PersonIcon color="primary" />

              <Typography
                variant="h6"
                fontWeight={700}
              >
                Personal Information
              </Typography>
            </Box>

            {!editMode && (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() =>
                  setEditMode(true)
                }
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          {/* Form */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            {/* Name */}
            <TextField
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <PersonIcon
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                      }}
                    />
                  ),
                },
              }}
            />

            {/* Email */}
            <TextField
              label="Email Address"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <EmailIcon
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                      }}
                    />
                  ),
                },
              }}
            />

            {/* Phone */}
            <TextField
              label="Phone Number"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <PhoneIcon
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                      }}
                    />
                  ),
                },
              }}
            />

            {/* City */}
            <TextField
              label="City"
              name="city"
              value={profile.city}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <LocationOnIcon
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                      }}
                    />
                  ),
                },
              }}
            />

            {/* Address */}
            <TextField
              label="Address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              multiline
              rows={2}
              sx={{
                gridColumn: {
                  md: "1 / -1",
                },
              }}
            />
          </Box>

          {/* Buttons */}
          {editMode && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  setEditMode(false)
                }
                sx={{
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  px: 4,
                  background: "#f97316",
                  "&:hover": {
                    background: "#ea580c",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          )}

          {/* Developer */}
          <Divider sx={{ mt: 5, mb: 3 }} />

          <Box
            sx={{
              textAlign: "center",
              py: 1,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Developed By
            </Typography>

            <Typography
              fontWeight={700}
              sx={{
                mt: 0.5,
                color: "#f97316",
              }}
            >
              Ketki Shukla
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Food Delivery Application
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;