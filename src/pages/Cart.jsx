import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Cart loading error:", error);
      setCart([]);
    }
  }, []);

  // Save cart
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Number(item.quantity || 1) + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 1) - 1,
            }
          : item
      )
      .filter((item) => Number(item.quantity || 0) > 0);

    saveCart(updatedCart);
  };

  // Delete ONLY selected item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  // Clear entire cart
  const clearCart = () => {
    saveCart([]);
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const discount = subtotal >= 500 ? 50 : 0;
  const total = subtotal + deliveryFee - discount;

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
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={() => navigate("/dashboard")}
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            background: "#fff",
            border: "1px solid #f3f4f6",
            color: "#374151",
            "&:hover": {
              background: "#fff7ed",
              color: "#f97316",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Typography
            fontSize={{ xs: 26, md: 32 }}
            fontWeight={800}
            color="#111827"
          >
            My Cart
          </Typography>

          <Typography
            color="#6b7280"
            fontSize={14}
            sx={{ mt: 0.5 }}
          >
            Review your items before placing your order
          </Typography>
        </Box>
      </Box>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <Card
          sx={{
            borderRadius: 4,
            border: "1px solid #f3f4f6",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
            py: 8,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 40,
                color: "#f97316",
              }}
            />
          </Box>

          <Typography fontSize={24} fontWeight={800}>
            Your cart is empty
          </Typography>

          <Typography
            color="#6b7280"
            sx={{ mt: 1, mb: 3 }}
          >
            Looks like you haven't added anything yet.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/restaurants")}
            sx={{
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
              px: 4,
              background:
                "linear-gradient(135deg,#f97316,#ea580c)",
              "&:hover": {
                background:
                  "linear-gradient(135deg,#ea580c,#c2410c)",
              },
            }}
          >
            Explore Restaurants
          </Button>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.6fr 1fr",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* CART ITEMS */}
          <Box>
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid #f3f4f6",
                boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography fontSize={19} fontWeight={800}>
                    Cart Items
                  </Typography>

                  <Typography fontSize={13} color="#6b7280">
                    {cart.length} items
                  </Typography>
                </Box>

                {cart.map((item, index) => (
                  <Box key={item.id}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        py: 2,
                        alignItems: "center",
                      }}
                    >
                      {/* FOOD ICON */}
                      <Box
                        sx={{
                          width: { xs: 65, sm: 90 },
                          height: { xs: 65, sm: 90 },
                          flexShrink: 0,
                          borderRadius: 3,
                          background: "#fff7ed",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: { xs: 30, sm: 40 },
                        }}
                      >
                        {item.emoji ||
                          (item.category === "Biryani"
                            ? "🍛"
                            : item.category === "Starters"
                            ? "🍢"
                            : item.category === "Main Course"
                            ? "🍲"
                            : "🥤")}
                      </Box>

                      {/* DETAILS */}
                      <Box
                        sx={{
                          flexGrow: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          fontWeight={800}
                          fontSize={16}
                          noWrap
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          fontSize={12}
                          color="#9ca3af"
                          sx={{ mt: 0.4 }}
                        >
                          {item.restaurant || "Restaurant"}
                        </Typography>

                        <Typography
                          fontSize={16}
                          fontWeight={800}
                          color="#f97316"
                          sx={{ mt: 1 }}
                        >
                          ₹{item.price}
                        </Typography>
                      </Box>

                      {/* QUANTITY */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          border: "1px solid #e5e7eb",
                          borderRadius: 2,
                          p: 0.3,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          sx={{
                            width: 30,
                            height: 30,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          fontSize={14}
                          fontWeight={800}
                          sx={{
                            minWidth: 22,
                            textAlign: "center",
                          }}
                        >
                          {item.quantity || 1}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          sx={{
                            width: 30,
                            height: 30,
                            color: "#f97316",
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* DELETE */}
                      <IconButton
                        onClick={() => removeItem(item.id)}
                        sx={{
                          color: "#9ca3af",
                          "&:hover": {
                            color: "#ef4444",
                            background: "#fef2f2",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    {index !== cart.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* CONTINUE SHOPPING */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/restaurants")}
              sx={{
                mt: 2,
                color: "#f97316",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Continue Shopping
            </Button>

            {/* CLEAR CART */}
            {cart.length > 1 && (
              <Button
                onClick={clearCart}
                sx={{
                  mt: 2,
                  ml: 2,
                  color: "#ef4444",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Clear Cart
              </Button>
            )}
          </Box>

          {/* ORDER SUMMARY */}
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #f3f4f6",
              boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
              position: { lg: "sticky" },
              top: 95,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                fontSize={20}
                fontWeight={800}
                sx={{ mb: 3 }}
              >
                Order Summary
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="#6b7280" fontSize={14}>
                  Subtotal
                </Typography>

                <Typography fontWeight={700}>
                  ₹{subtotal}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="#6b7280" fontSize={14}>
                  Delivery Fee
                </Typography>

                <Typography fontWeight={700}>
                  ₹{deliveryFee}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="#6b7280" fontSize={14}>
                  Discount
                </Typography>

                <Typography
                  fontWeight={700}
                  color="#10b981"
                >
                  - ₹{discount}
                </Typography>
              </Box>

              <Divider sx={{ my: 2.5 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={16} fontWeight={700}>
                  Total
                </Typography>

                <Typography
                  fontSize={25}
                  fontWeight={900}
                  color="#f97316"
                >
                  ₹{total}
                </Typography>
              </Box>

              {/* OFFER */}
              {subtotal < 500 && (
                <Box
                  sx={{
                    mt: 2.5,
                    p: 1.5,
                    borderRadius: 2.5,
                    background: "#fff7ed",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <LocalOfferOutlinedIcon
                    sx={{
                      color: "#f97316",
                      fontSize: 19,
                    }}
                  />

                  <Typography
                    fontSize={11}
                    color="#9a3412"
                  >
                    Add ₹{500 - subtotal} more to get ₹50 OFF!
                  </Typography>
                </Box>
              )}

              {/* CHECKOUT */}
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/checkout")}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg,#f97316,#ea580c)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#ea580c,#c2410c)",
                  },
                }}
              >
                Proceed to Checkout
              </Button>

              <Typography
                fontSize={11}
                color="#9ca3af"
                textAlign="center"
                sx={{ mt: 1.5 }}
              >
                Secure checkout • Fast delivery
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default Cart;