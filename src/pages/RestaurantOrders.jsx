import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

    const text = await response.text();

console.log("STATUS RESPONSE:", response.status, text);

let data;

try {
  data = JSON.parse(text);
} catch (parseError) {
  console.error("INVALID JSON RESPONSE:", text);
  throw new Error(
    `Server returned invalid response (${response.status})`
  );
}

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data);
    } catch (error) {
      console.error("Restaurant Orders Error:", error);
      alert("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const updateStatus = async (orderId, status) => {
  try {
    setUpdating(orderId);

    console.log("Updating:", orderId, status);

    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const text = await response.text();

    console.log("STATUS UPDATE:", response.status, text);

    if (!response.ok) {
      throw new Error(
        `Status update failed: ${response.status}`
      );
    }

    const data = JSON.parse(text);

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order._id === orderId
          ? data.order
          : order
      )
    );

  } catch (error) {
    console.error("Status Update Error:", error);
    alert(error.message);
  } finally {
    setUpdating("");
  }
};

 

  const getStatusColor = (status) => {
    if (status === "Delivered") {
      return {
        background: "#ecfdf5",
        color: "#059669",
      };
    }

    if (status === "Cancelled") {
      return {
        background: "#fef2f2",
        color: "#dc2626",
      };
    }

    if (status === "Out for Delivery") {
      return {
        background: "#eff6ff",
        color: "#2563eb",
      };
    }

    if (status === "Preparing") {
      return {
        background: "#fff7ed",
        color: "#ea580c",
      };
    }

    if (status === "Confirmed") {
      return {
        background: "#f5f3ff",
        color: "#7c3aed",
      };
    }

    return {
      background: "#fefce8",
      color: "#ca8a04",
    };
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#f97316" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: "#fffaf5",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          fontSize={{ xs: 26, md: 32 }}
          fontWeight={800}
          color="#111827"
        >
          Restaurant Orders
        </Typography>

        <Typography
          color="#6b7280"
          sx={{ mt: 0.5 }}
        >
          Manage customer orders and update their status
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ py: 6, textAlign: "center" }}>
            <ReceiptLongOutlinedIcon
              sx={{
                fontSize: 55,
                color: "#f97316",
                mb: 2,
              }}
            />

            <Typography
              fontSize={22}
              fontWeight={800}
            >
              No Orders Yet
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          {orders.map((order) => {
            const status = order.status || "Pending";

            return (
              <Card
                key={order._id}
                sx={{
                  borderRadius: 4,
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.06)",
                }}
              >
                <CardContent
                  sx={{ p: { xs: 2, md: 3 } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: 2,
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        fontSize={18}
                        fontWeight={800}
                      >
                        Order #
                        {order._id
                          ?.slice(-6)
                          .toUpperCase()}
                      </Typography>

                      <Typography
                        fontSize={14}
                        color="#6b7280"
                        sx={{ mt: 0.5 }}
                      >
                        Customer:{" "}
                        {order.customerName}
                      </Typography>

                      <Typography
                        fontSize={13}
                        color="#9ca3af"
                        sx={{ mt: 0.5 }}
                      >
                        {order.phone}
                      </Typography>
                    </Box>

                    <Chip
                      label={status}
                      sx={{
                        ...getStatusColor(status),
                        fontWeight: 700,
                        alignSelf: {
                          xs: "flex-start",
                          sm: "center",
                        },
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    fontSize={14}
                    fontWeight={700}
                  >
                    Ordered Items
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    {order.items?.map(
                      (item, index) => (
                        <Typography
                          key={index}
                          fontSize={13}
                          color="#6b7280"
                          sx={{ mb: 0.5 }}
                        >
                          {item.name} ×{" "}
                          {item.quantity || 1}
                        </Typography>
                      )
                    )}
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },
                      gap: 2,
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        fontSize={12}
                        color="#9ca3af"
                      >
                        Total Amount
                      </Typography>

                      <Typography
                        fontSize={20}
                        fontWeight={800}
                        color="#f97316"
                      >
                        ₹
                        {Number(
                          order.total || 0
                        )}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Select
                        size="small"
                        value={status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        disabled={
                          updating === order._id
                        }
                        sx={{
                          minWidth: 190,
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="Pending">
                          Pending
                        </MenuItem>

                        <MenuItem value="Confirmed">
                          Confirmed
                        </MenuItem>

                        <MenuItem value="Preparing">
                          Preparing
                        </MenuItem>

                        <MenuItem value="Out for Delivery">
                          Out for Delivery
                        </MenuItem>

                        <MenuItem value="Delivered">
                          Delivered
                        </MenuItem>

                        <MenuItem value="Cancelled">
                          Cancelled
                        </MenuItem>
                      </Select>

                      {updating ===
                        order._id && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: "#f97316",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default RestaurantOrders;