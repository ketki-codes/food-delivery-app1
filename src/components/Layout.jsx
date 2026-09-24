import { useEffect, useState } from "react";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:900px)");

  const [mobileOpen, setMobileOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("foodgoDarkMode") === "true"
  );

  const [notificationAnchor, setNotificationAnchor] =
    useState(null);

  const [profileAnchor, setProfileAnchor] =
    useState(null);

  const notificationOpen = Boolean(notificationAnchor);
  const profileOpen = Boolean(profileAnchor);
  const [notifications, setNotifications] = useState([]);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const orders = await response.json();

      if (!response.ok) return;

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const userEmail = user.email;

      const userOrders = orders.filter(
        (order) =>
          !userEmail ||
          order.email === userEmail ||
          order.customerEmail === userEmail
      );

      const latestNotifications = userOrders
        .slice(0, 5)
        .map((order) => {
          const status = order.status || "Pending";

          let title = "Order placed successfully";
          let message =
            "Your order has been placed successfully.";

          if (status === "Preparing") {
            title = "Order is being prepared";
            message =
              "Your restaurant is preparing your food.";
          } else if (status === "Out for Delivery") {
            title = "Order is on the way";
            message =
              "Your food is on the way.";
          } else if (status === "Delivered") {
            title = "Order delivered";
            message =
              "Your order has been delivered successfully.";
          } else if (status === "Cancelled") {
            title = "Order cancelled";
            message =
              "Your order has been cancelled.";
          }

          return {
            id: order._id,
            title,
            message,
          };
        });

      setNotifications(latestNotifications);
    } catch (error) {
      console.error(
        "Notification Error:",
        error
      );
    }
  };

  fetchNotifications();
}, []);
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const userName = user.name || "User";

const userInitial = userName
  .trim()
  .charAt(0)
  .toUpperCase();

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(
      "foodgoDarkMode",
      newMode
    );
  };

  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon />,
      path: "/dashboard",
    },
    {
      text: "Restaurants",
      icon: <RestaurantOutlinedIcon />,
      path: "/restaurants",
    },
    {
      text: "My Orders",
      icon: <ReceiptLongOutlinedIcon />,
      path: "/orders",
    },
    {
      text: "Cart",
      icon: <ShoppingCartOutlinedIcon />,
      path: "/cart",
    },
    {
      text: "Favorites",
      icon: <FavoriteBorderOutlinedIcon />,
      path: "/favorites",
    },
    {
      text: "Addresses",
      icon: <LocationOnOutlinedIcon />,
      path: "/addresses",
    },
    {
  text: "Restaurant Orders",
  icon: <ReceiptLongOutlinedIcon />,
  path: "/restaurant-orders",
},
  ];

  const bottomItems = [
    {
      text: "Profile",
      icon: <PersonIcon />,
      path: "/profile",
    },
    {
      text: "Settings",
      icon: <SettingsOutlinedIcon />,
      path: "/settings",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);

    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const colors = {
    background: darkMode
      ? "#0f172a"
      : "#fffaf5",

    sidebar: darkMode
      ? "#111827"
      : "#ffffff",

    navbar: darkMode
      ? "#111827"
      : "#ffffff",

    text: darkMode
      ? "#f8fafc"
      : "#111827",

    secondaryText: darkMode
      ? "#94a3b8"
      : "#64748b",

    border: darkMode
      ? "#1f2937"
      : "#f3f4f6",

    hover: darkMode
      ? "#1f2937"
      : "#fff1e6",

    active: darkMode
      ? "#2a211b"
      : "#fff1e6",
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: colors.sidebar,
        color: colors.text,
      }}
    >

      {/* LOGO */}

      <Box
        sx={{
          height: 78,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          borderBottom:
            `1px solid ${colors.border}`,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "14px",
            background:
              "linear-gradient(135deg,#f97316,#ea580c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 23,
            boxShadow:
              "0 6px 15px rgba(249,115,22,0.25)",
          }}
        >
          🍔
        </Box>

        <Box>
          <Typography
            fontWeight="900"
            fontSize={22}
            color={colors.text}
            lineHeight={1}
          >
            Food
            <span style={{ color: "#f97316" }}>
              Go
            </span>
          </Typography>

          <Typography
            fontSize={10}
            color={colors.secondaryText}
            fontWeight={600}
            sx={{ mt: 0.5 }}
          >
            FOOD DELIVERY
          </Typography>
        </Box>
      </Box>

      {/* MENU */}

      <List sx={{ px: 2, pt: 3 }}>

        <Typography
          sx={{
            px: 2,
            mb: 1.2,
            fontSize: 10,
            fontWeight: 800,
            color: "#94a3b8",
            letterSpacing: 1.4,
          }}
        >
          MENU
        </Typography>

        {menuItems.map((item) => {

          const active =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() =>
                handleNavigation(item.path)
              }
              sx={{
                position: "relative",
                borderRadius: 2.5,
                mb: 0.8,
                minHeight: 46,

                color: active
                  ? "#f97316"
                  : colors.secondaryText,

                background: active
                  ? colors.active
                  : "transparent",

                "&:hover": {
                  background: colors.hover,
                  color: "#f97316",
                  transform:
                    "translateX(3px)",
                },

                transition:
                  "all 0.2s ease",

                ...(active && {
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 4,
                    borderRadius:
                      "0 5px 5px 0",
                    background: "#f97316",
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active
                    ? 700
                    : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* ACCOUNT */}

      <List sx={{ px: 2, mt: 1 }}>

        <Typography
          sx={{
            px: 2,
            mb: 1.2,
            fontSize: 10,
            fontWeight: 800,
            color: "#94a3b8",
            letterSpacing: 1.4,
          }}
        >
          ACCOUNT
        </Typography>

        {bottomItems.map((item) => {

          const active =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() =>
                handleNavigation(item.path)
              }
              sx={{
                borderRadius: 2.5,
                mb: 0.8,
                minHeight: 46,

                color: active
                  ? "#f97316"
                  : colors.secondaryText,

                background: active
                  ? colors.active
                  : "transparent",

                "&:hover": {
                  background: colors.hover,
                  color: "#f97316",
                  transform:
                    "translateX(3px)",
                },

                transition:
                  "all 0.2s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active
                    ? 700
                    : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* SPECIAL OFFER */}

      <Box
        sx={{
          mx: 2,
          mt: 2,
          p: 2,
          borderRadius: 3,

          background: darkMode
            ? "#2a211b"
            : "linear-gradient(135deg,#fff1e6,#ffedd5)",

          border: darkMode
            ? "1px solid #4b3020"
            : "1px solid #fed7aa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 0.7,
          }}
        >
          <LocalOfferOutlinedIcon
            sx={{
              color: "#f97316",
              fontSize: 19,
            }}
          />

          <Typography
            fontSize={13}
            fontWeight={800}
            color="#f97316"
          >
            Special Offer
          </Typography>
        </Box>

        <Typography
          fontSize={11}
          color={
            darkMode
              ? "#fdba74"
              : "#9a3412"
          }
          lineHeight={1.5}
        >
          Get up to 20% OFF on your next order!
        </Typography>
      </Box>

      {/* LOGOUT */}

      <Box sx={{ mt: "auto", p: 2 }}>

        <ListItemButton
          onClick={() => navigate("/login")}
          sx={{
            borderRadius: 2.5,
            minHeight: 46,
            color: "#ef4444",

            "&:hover": {
              background: darkMode
                ? "#2a1717"
                : "#fef2f2",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
              color: "#ef4444",
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 650,
            }}
          />
        </ListItemButton>

      </Box>
    </Box>
  );
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: colors.background,
        transition: "background 0.3s ease",
      }}
    >

      {/* SIDEBAR */}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight:
              `1px solid ${colors.border}`,
            background: colors.sidebar,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* MAIN CONTENT */}

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          ml: isMobile
            ? 0
            : `${drawerWidth}px`,
        }}
      >

        {/* NAVBAR */}

        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: colors.navbar,
            color: colors.text,
            borderBottom:
              `1px solid ${colors.border}`,
            transition:
              "all 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              minHeight: 76,
              px: {
                xs: 2,
                sm: 3,
                md: 4,
              },
            }}
          >

            {/* MOBILE MENU */}

            {isMobile && (
              <IconButton
                onClick={() =>
                  setMobileOpen(true)
                }
                sx={{
                  mr: 1,
                  color: colors.text,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* WELCOME */}

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                fontSize={{
                  xs: 18,
                  sm: 21,
                }}
                fontWeight={800}
                color={colors.text}
              >
                Welcome back! 👋
              </Typography>

              <Typography
                fontSize={12}
                color={colors.secondaryText}
                sx={{ mt: 0.3 }}
              >
                What would you like to eat today?
              </Typography>
            </Box>

            {/* NOTIFICATION */}

            <IconButton
              onClick={(event) =>
                setNotificationAnchor(
                  event.currentTarget
                )
              }
              sx={{
                mr: {
                  xs: 1,
                  sm: 2,
                },
                width: 42,
                height: 42,
                borderRadius: 2.5,
                color: colors.text,
                background: darkMode
                  ? "#1f2937"
                  : "#fff7ed",

                "&:hover": {
                  background: darkMode
                    ? "#374151"
                    : "#ffedd5",
                },
              }}
            >
              <Badge
                badgeContent={3}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 9,
                    minWidth: 17,
                    height: 17,
                  },
                }}
              >
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

{/* NOTIFICATION MENU */}
<Menu
  anchorEl={notificationAnchor}
  open={notificationOpen}
  onClose={() => setNotificationAnchor(null)}
  PaperProps={{
    sx: {
      width: 330,
      mt: 1.5,
      borderRadius: 3,
      background: colors.navbar,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      boxShadow:
        "0 12px 35px rgba(0,0,0,0.12)",
    },
  }}
>
  <Box sx={{ px: 2, py: 1.5 }}>
    <Typography
      fontWeight={800}
      fontSize={16}
    >
      Notifications
    </Typography>

    <Typography
      fontSize={12}
      color={colors.secondaryText}
    >
      Your latest order updates
    </Typography>
  </Box>

  <Divider
    sx={{
      borderColor: colors.border,
    }}
  />

  {notifications.length === 0 ? (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography
        fontSize={13}
        color={colors.secondaryText}
        textAlign="center"
      >
        No notifications yet.
      </Typography>
    </Box>
  ) : (
    notifications.map((notification) => (
      <MenuItem
        key={notification.id}
        sx={{
          py: 1.5,
          gap: 1.5,
          whiteSpace: "normal",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: "#fff7ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          🍔
        </Box>

        <Box>
          <Typography
            fontSize={13}
            fontWeight={700}
          >
            {notification.title}
          </Typography>

          <Typography
            fontSize={11}
            color={colors.secondaryText}
          >
            {notification.message}
          </Typography>
        </Box>
      </MenuItem>
    ))
  )}
</Menu>


            {/* PROFILE AVATAR */}

            <IconButton
              onClick={(event) =>
                setProfileAnchor(
                  event.currentTarget
                )
              }
              sx={{
                p: 0,
                borderRadius: "50%",
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  background:
                    "linear-gradient(135deg,#f97316,#ea580c)",
                  fontWeight: 800,
                  boxShadow:
                    "0 4px 12px rgba(249,115,22,0.3)",
                }}
              >
                {userInitial}
              </Avatar>
            </IconButton>

            {/* PROFILE MENU */}

            <Menu
              anchorEl={profileAnchor}
              open={profileOpen}
              onClose={() =>
                setProfileAnchor(null)
              }
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 220,
                  borderRadius: 3,
                  background:
                    colors.navbar,
                  color: colors.text,
                  border:
                    `1px solid ${colors.border}`,
                  boxShadow:
                    "0 12px 35px rgba(0,0,0,0.12)",
                },
              }}
            >

              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <Typography
                  fontWeight={800}
                >
                  user
                </Typography>

                <Typography
                  fontSize={11}
                  color={
                    colors.secondaryText
                  }
                >
                  FoodGo Customer
                </Typography>
              </Box>

              <Divider
                sx={{
                  borderColor:
                    colors.border,
                }}
              />

              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  navigate("/profile");
                }}
              >
                👤 &nbsp; Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  navigate("/settings");
                }}
              >
                ⚙️ &nbsp; Settings
              </MenuItem>

              <MenuItem
                onClick={toggleDarkMode}
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>
                  {darkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
                </span>

                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  size="small"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                />
              </MenuItem>

              <Divider
                sx={{
                  borderColor:
                    colors.border,
                }}
              />

              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  navigate("/login");
                }}
                sx={{
                  color: "#ef4444",
                  fontWeight: 600,
                }}
              >
                <LogoutOutlinedIcon
                  sx={{
                    mr: 1.5,
                    fontSize: 20,
                  }}
                />

                Logout
              </MenuItem>

            </Menu>

          </Toolbar>
        </AppBar>

        {/* PAGE CONTENT */}

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            minHeight:
              "calc(100vh - 76px)",
            background:
              colors.background,
            transition:
              "background 0.3s ease",
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
}

export default Layout;