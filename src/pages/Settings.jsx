import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  const [privacyOpen, setPrivacyOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const [password, setPassword] = useState("");

  const showMessage = (message) => {
    setSnackbar({
      open: true,
      message,
    });
  };

  const handleNotificationChange = (e) => {
    const value = e.target.checked;
    setNotifications(value);

    showMessage(
      value
        ? language === "Hindi"
          ? "नोटिफिकेशन चालू हो गए हैं"
          : "Notifications enabled"
        : language === "Hindi"
        ? "नोटिफिकेशन बंद हो गए हैं"
        : "Notifications disabled"
    );
  };

  const handleDarkModeChange = (e) => {
    const value = e.target.checked;

    setDarkMode(value);
    localStorage.setItem("darkMode", value);

    showMessage(
      value
        ? language === "Hindi"
          ? "डार्क मोड चालू हो गया"
          : "Dark Mode enabled"
        : language === "Hindi"
        ? "डार्क मोड बंद हो गया"
        : "Dark Mode disabled"
    );
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;

    setLanguage(value);
    localStorage.setItem("language", value);

    showMessage(
      value === "Hindi"
        ? "भाषा हिंदी में बदल दी गई"
        : "Language changed to English"
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const text = {
    English: {
      back: "Back to Dashboard",
      settings: "Settings",
      subtitle: "Manage your application preferences",
      notifications: "Notifications",
      notificationText: "Receive updates about your orders",
      darkMode: "Dark Mode",
      darkText: "Use dark theme throughout the app",
      language: "Language",
      languageText: "Select your preferred language",
      privacy: "Privacy & Security",
      privacyText: "Manage your password and privacy settings",
      logout: "Logout",
    },

    Hindi: {
      back: "डैशबोर्ड पर वापस जाएँ",
      settings: "सेटिंग्स",
      subtitle: "अपनी एप्लिकेशन सेटिंग्स को मैनेज करें",
      notifications: "नोटिफिकेशन",
      notificationText: "अपने ऑर्डर के अपडेट प्राप्त करें",
      darkMode: "डार्क मोड",
      darkText: "पूरे ऐप में डार्क थीम का उपयोग करें",
      language: "भाषा",
      languageText: "अपनी पसंदीदा भाषा चुनें",
      privacy: "प्राइवेसी और सिक्योरिटी",
      privacyText: "पासवर्ड और प्राइवेसी सेटिंग्स मैनेज करें",
      logout: "लॉगआउट",
    },
  };

  const t = text[language];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#fff" : "#1e293b",
        p: { xs: 2, md: 4 },
        transition: "0.3s",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard")}
        sx={{
          mb: 2,
          textTransform: "none",
          fontWeight: 600,
          color: darkMode ? "#fff" : "#1e293b",
        }}
      >
        {t.back}
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            color: darkMode ? "#fff" : "#1e293b",
          }}
        >
          {t.settings}
        </Typography>

        <Typography
          color={darkMode ? "grey.400" : "text.secondary"}
        >
          {t.subtitle}
        </Typography>
      </Box>

      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          borderRadius: 4,
          backgroundColor: darkMode ? "#1e293b" : "#fff",
          color: darkMode ? "#fff" : "#1e293b",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {/* Notifications */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <NotificationsIcon color="primary" />

              <Box>
                <Typography fontWeight={600}>
                  {t.notifications}
                </Typography>

                <Typography
                  variant="body2"
                  color={darkMode ? "grey.400" : "text.secondary"}
                >
                  {t.notificationText}
                </Typography>
              </Box>
            </Box>

            <Switch
              checked={notifications}
              onChange={handleNotificationChange}
            />
          </Box>

          <Divider />

          {/* Dark Mode */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <DarkModeIcon color="primary" />

              <Box>
                <Typography fontWeight={600}>
                  {t.darkMode}
                </Typography>

                <Typography
                  variant="body2"
                  color={darkMode ? "grey.400" : "text.secondary"}
                >
                  {t.darkText}
                </Typography>
              </Box>
            </Box>

            <Switch
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
          </Box>

          <Divider />

          {/* Language */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <LanguageIcon color="primary" />

              <Box>
                <Typography fontWeight={600}>
                  {t.language}
                </Typography>

                <Typography
                  variant="body2"
                  color={darkMode ? "grey.400" : "text.secondary"}
                >
                  {t.languageText}
                </Typography>
              </Box>
            </Box>

            <FormControl
              size="small"
              sx={{
                minWidth: 130,
                "& .MuiInputLabel-root": {
                  color: darkMode ? "#cbd5e1" : undefined,
                },
                "& .MuiSelect-select": {
                  color: darkMode ? "#fff" : undefined,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#64748b" : undefined,
                },
              }}
            >
              <InputLabel>Language</InputLabel>

              <Select
                value={language}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Hindi">हिंदी</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider />

          {/* Privacy & Security */}
          <Box
            onClick={() => setPrivacyOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 2,
              cursor: "pointer",
              borderRadius: 2,
              px: 1,
              "&:hover": {
                backgroundColor: darkMode
                  ? "#334155"
                  : "#f8fafc",
              },
            }}
          >
            <LockIcon color="primary" />

            <Box>
              <Typography fontWeight={600}>
                {t.privacy}
              </Typography>

              <Typography
                variant="body2"
                color={darkMode ? "grey.400" : "text.secondary"}
              >
                {t.privacyText}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Logout */}
          <Box sx={{ pt: 3 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
              }}
            >
              {t.logout}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Privacy Dialog */}
      <Dialog
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {language === "Hindi"
            ? "प्राइवेसी और सिक्योरिटी"
            : "Privacy & Security"}
        </DialogTitle>

        <DialogContent>
          <Typography
            color={darkMode ? "text.secondary" : "text.secondary"}
            sx={{ mb: 2 }}
          >
            {language === "Hindi"
              ? "यहाँ आप अपना पासवर्ड अपडेट कर सकते हैं।"
              : "You can manage your account password here."}
          </Typography>

          <TextField
            fullWidth
            type="password"
            label={
              language === "Hindi"
                ? "नया पासवर्ड"
                : "New Password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setPrivacyOpen(false)}
            sx={{
              textTransform: "none",
              color: "#6b7280",
            }}
          >
            {language === "Hindi" ? "बंद करें" : "Close"}
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              if (!password.trim()) {
                showMessage(
                  language === "Hindi"
                    ? "पासवर्ड दर्ज करें"
                    : "Please enter a password"
                );
                return;
              }

              showMessage(
                language === "Hindi"
                  ? "पासवर्ड अपडेट हो गया"
                  : "Password updated successfully"
              );

              setPassword("");
              setPrivacyOpen(false);
            }}
            sx={{
              background: "#f97316",
              textTransform: "none",
              "&:hover": {
                background: "#ea580c",
              },
            }}
          >
            {language === "Hindi"
              ? "सेव करें"
              : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar({
            open: false,
            message: "",
          })
        }
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() =>
            setSnackbar({
              open: false,
              message: "",
            })
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
        