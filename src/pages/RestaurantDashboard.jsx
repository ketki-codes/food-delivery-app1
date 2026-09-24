import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LogoutlinnedIcon from "@mui/icons-material/LogoutOutlined";

function RestaurantDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data);
    } catch (error) {
      console.error("Restaurant Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getCount = (status) => {
    return orders.filter(
      (order) =>
        (order.status || "Pending") === status
    ).length;
  };

  const totalOrders = orders.length;
  const pendingOrders = getCount("Pending");
  const confirmedOrders = getCount("Confirmed");
  const preparingOrders = getCount("Preparing");
  const deliveryOrders = getCount("Out for Delivery");
  const deliveredOrders = getCount("Delivered");

  const handleLogout = () => {
    localStorage.removeItem("restaurantAdmin");
    navigate("/restaurant-admin-login");
  };

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ReceiptLongOutlinedIcon />,
      background: "#fff7ed",
      iconColor: "#f97316",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: <PendingActionsOutlinedIcon />,
      background: "#fff7ed",
      iconColor: "#ea580c",
    },
    {
      title: "Confirmed",
      value: confirmedOrders,
      icon: <CheckCircleOutlineIcon />,
      background: "#eff6ff",
      iconColor: "#2563eb",
    },
    {
      title: "Preparing",
      value: preparingOrders,
      icon: <RestaurantOutlinedIcon />,
      background: "#fefce8",
      iconColor: "#ca8a04",
    },
    {
      title: "Out for Delivery",
      value: deliveryOrders,
      icon: <LocalShippingOutlinedIcon />,
      background: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: <CheckCircleOutlineIcon />,
      background: "#ecfdf5",
      iconColor: "#059669",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            fontSize={{ xs: 26, md: 34 }}
            fontWeight={800}
            color="#111827"
          >
            Restaurant Dashboard
          </Typography>

          <Typography
            color="#6b7280"
            sx={{ mt: 0.5 }}
          >
            Manage your restaurant orders
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            borderRadius: 2.5,
            fontWeight: 700,
          }}
        >
          Logout
        </Button>
      </Box>

      {/* LOADING */}

      {loading ? (
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{ color: "#f97316" }}
          />
        </Box>
      ) : (
        <>
          {/* STATS */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {stats.map((stat) => (
              <Card
                key={stat.title}
                sx={{
                  borderRadius: 4,
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        background:
                          stat.background,
                        color: stat.iconColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {stat.icon}
                    </Box>

                    <Box>
                      <Typography
                        fontSize={13}
                        color="#6b7280"
                      >
                        {stat.title}
                      </Typography>

                      <Typography
                        fontSize={28}
                        fontWeight={800}
                        color="#111827"
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* RECENT ORDERS */}

          <Card
            sx={{
              mt: 4,
              borderRadius: 4,
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    fontSize={20}
                    fontWeight={800}
                  >
                    Recent Orders
                  </Typography>

                  <Typography
                    fontSize={13}
                    color="#6b7280"
                  >
                    Latest customer orders
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() =>
                    navigate("/restaurant-orders")
                  }
                  sx={{
                    background: "#f97316",
                    textTransform: "none",
                    borderRadius: 2.5,
                    fontWeight: 700,
                    "&:hover": {
                      background: "#ea580c",
                    },
                  }}
                >
                  View All Orders
                </Button>
              </Box>

              <Divider />

              {orders.length === 0 ? (
                <Typography
                  sx={{
                    py: 5,
                    textAlign: "center",
                  }}
                  color="#6b7280"
                >
                  No orders available.
                </Typography>
              ) : (
                orders
                  .slice(0, 5)
                  .map((order) => (
                    <Box
                      key={order._id}
                      sx={{
                        py: 2,
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: {
                          xs: "flex-start",
                          sm: "center",
                        },
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        gap: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          fontWeight={700}
                        >
                          Order #
                          {order._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </Typography>

                        <Typography
                          fontSize={13}
                          color="#6b7280"
                        >
                          {order.customerName}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          textAlign: {
                            xs: "left",
                            sm: "right",
                          },
                        }}
                      >
                        <Typography
                          fontWeight={800}
                        >
                          ₹
                          {Number(
                            order.total || 0
                          )}
                        </Typography>

                        <Typography
                          fontSize={12}
                          fontWeight={700}
                          color="#f97316"
                        >
                          {order.status ||
                            "Pending"}
                        </Typography>
                      </Box>
                    </Box>
                  ))
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}

export default RestaurantDashboard;