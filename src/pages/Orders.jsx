import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [contactRestaurant, setContactRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        console.error("Fetch Orders Error:", error);
        alert("Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRestaurantName = (order) => {
    if (
      order?.items &&
      order.items.length > 0 &&
      order.items[0]?.restaurant
    ) {
      return order.items[0].restaurant;
    }

    return "Restaurant";
  };

  // IMPORTANT: phone is inside items[0]
  const getRestaurantPhone = (order) => {
    return order?.items?.[0]?.restaurantPhone || "";
  };

  const getItemsText = (order) => {
    if (!order.items || order.items.length === 0) {
      return "No items";
    }

    return order.items
      .map(
        (item) =>
          `${item.name} × ${item.quantity || 1}`
      )
      .join(", ");
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          fontSize={{ xs: 26, md: 32 }}
          fontWeight="800"
          color="#111827"
        >
          My Orders
        </Typography>

        <Typography
          color="#6b7280"
          sx={{ mt: 0.5 }}
        >
          Track and manage your food orders
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#f97316" }} />
        </Box>
      ) : orders.length === 0 ? (
        <Card
          sx={{
            borderRadius: 4,
            textAlign: "center",
            py: 7,
            boxShadow:
              "0 4px 18px rgba(0,0,0,0.05)",
          }}
        >
          <ReceiptLongOutlinedIcon
            sx={{
              fontSize: 60,
              color: "#f97316",
              mb: 2,
            }}
          />

          <Typography
            fontSize={24}
            fontWeight={800}
          >
            No Orders Yet
          </Typography>

          <Typography
            color="#6b7280"
            sx={{ mt: 1 }}
          >
            Your placed orders will appear here.
          </Typography>
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
            const restaurant =
              getRestaurantName(order);

            const items =
              getItemsText(order);

            const status =
              order.status || "Pending";

            return (
              <Card
                key={order._id}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #f3f4f6",
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, md: 3 },
                  }}
                >
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
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2.5,
                          background: "#fff7ed",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ReceiptLongOutlinedIcon
                          sx={{ color: "#f97316" }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          fontSize={18}
                          fontWeight={800}
                        >
                          {restaurant}
                        </Typography>

                        <Typography
                          fontSize={13}
                          color="#9ca3af"
                        >
                          Order #
                          {order._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={status}
                      sx={{
                        fontWeight: 700,
                        background:
                          status === "Delivered"
                            ? "#ecfdf5"
                            : "#fff7ed",
                        color:
                          status === "Delivered"
                            ? "#059669"
                            : "#f97316",
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2.5 }} />

                  <Typography
                    fontSize={14}
                    color="#6b7280"
                  >
                    {items}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <AccessTimeOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: "#9ca3af",
                      }}
                    />

                    <Typography
                      fontSize={13}
                      color="#6b7280"
                    >
                      {formatDate(order.createdAt)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 2.5,
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
                    }}
                  >
                    <Box>
                      <Typography
                        fontSize={12}
                        color="#9ca3af"
                      >
                        Total amount
                      </Typography>

                      <Typography
                        fontSize={19}
                        fontWeight={800}
                        color="#111827"
                      >
                        ₹{Number(order.total || 0)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={
                          <PhoneOutlinedIcon />
                        }
                        onClick={() =>
                          setContactRestaurant(order)
                        }
                        sx={{
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 700,
                          color: "#16a34a",
                          borderColor: "#bbf7d0",
                        }}
                      >
                        Contact Restaurant
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        sx={{
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 700,
                          color: "#f97316",
                          borderColor: "#fed7aa",
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
      {/* ORDER DETAILS POPUP */}
      <Dialog
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: 22,
          }}
        >
          Order Details
        </DialogTitle>

        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Typography
                fontSize={21}
                fontWeight={800}
                color="#111827"
              >
                {getRestaurantName(selectedOrder)}
              </Typography>

              <Typography
                fontSize={13}
                color="#9ca3af"
                sx={{ mt: 0.5 }}
              >
                Order ID: {selectedOrder._id}
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Typography
                fontSize={15}
                fontWeight={700}
              >
                Ordered Items
              </Typography>

              {selectedOrder.items?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1.2,
                    gap: 2,
                  }}
                >
                  <Typography
                    fontSize={14}
                    color="#6b7280"
                  >
                    {item.name} × {item.quantity || 1}
                  </Typography>

                  <Typography
                    fontSize={14}
                    fontWeight={700}
                  >
                    ₹
                    {Number(item.price || 0) *
                      Number(item.quantity || 1)}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 2.5 }}>
                <Typography
                  fontSize={15}
                  fontWeight={700}
                >
                  Order Status
                </Typography>

                <Chip
                  label={
                    selectedOrder.status || "Pending"
                  }
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    background:
                      selectedOrder.status === "Delivered"
                        ? "#ecfdf5"
                        : "#fff7ed",
                    color:
                      selectedOrder.status === "Delivered"
                        ? "#059669"
                        : "#f97316",
                  }}
                />
              </Box>

              <Box sx={{ mt: 2.5 }}>
                <Typography
                  fontSize={15}
                  fontWeight={700}
                >
                  Ordered At
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.7,
                  }}
                >
                  <AccessTimeOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: "#9ca3af",
                    }}
                  />

                  <Typography
                    fontSize={14}
                    color="#6b7280"
                  >
                    {formatDate(
                      selectedOrder.createdAt
                    )}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2.5 }}>
                <Typography
                  fontSize={15}
                  fontWeight={700}
                >
                  Payment Method
                </Typography>

                <Typography
                  fontSize={14}
                  color="#6b7280"
                  sx={{ mt: 0.7 }}
                >
                  {selectedOrder.paymentMethod === "online"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 2.5,
                  p: 2,
                  borderRadius: 3,
                  background: "#fff7ed",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  color="#6b7280"
                >
                  Total Amount
                </Typography>

                <Typography
                  fontSize={24}
                  fontWeight={800}
                  color="#f97316"
                >
                  ₹{Number(selectedOrder.total || 0)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setSelectedOrder(null)}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              color: "#f97316",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* CONTACT RESTAURANT POPUP */}
      <Dialog
        open={Boolean(contactRestaurant)}
        onClose={() => setContactRestaurant(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: 21,
          }}
        >
          Contact Restaurant
        </DialogTitle>

        <DialogContent dividers>
          {contactRestaurant && (
            <Box>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 3,
                  background: "#ecfdf5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <PhoneOutlinedIcon
                  sx={{
                    color: "#16a34a",
                    fontSize: 30,
                  }}
                />
              </Box>

              <Typography
                fontSize={20}
                fontWeight={800}
                color="#111827"
              >
                {getRestaurantName(contactRestaurant)}
              </Typography>

              <Typography
                fontSize={14}
                color="#6b7280"
                sx={{ mt: 0.5 }}
              >
                Need help with your order? Contact the
                restaurant directly.
              </Typography>

              {/* PHONE */}
              <Box
                sx={{
                  mt: 2.5,
                  p: 2,
                  borderRadius: 3,
                  background: "#f9fafb",
                }}
              >
                <Typography
                  fontSize={12}
                  color="#9ca3af"
                >
                  Restaurant Phone
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight={700}
                  sx={{ mt: 0.5 }}
                >
                  {getRestaurantPhone(
                    contactRestaurant
                  ) ||
                    "Restaurant phone number is not available."}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={() => setContactRestaurant(null)}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              color: "#6b7280",
            }}
          >
            Close
          </Button>

          {/* CALL RESTAURANT */}
          {getRestaurantPhone(contactRestaurant) && (
            <Button
              variant="contained"
              startIcon={<PhoneOutlinedIcon />}
              component="a"
              href={`tel:${getRestaurantPhone(
                contactRestaurant
              )}`}
              sx={{
                background: "#16a34a",
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  background: "#15803d",
                },
              }}
            >
              Call Restaurant
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Orders;