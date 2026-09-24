import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // LOAD CART
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // ADDRESS CHANGE
  const handleChange = (e) => {
    setAddress((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  // SUBTOTAL
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // DELIVERY FEE
  const deliveryFee = cart.length > 0 ? 40 : 0;

  // DISCOUNT
  const discount = subtotal >= 500 ? 50 : 0;

  // TOTAL
  const total = subtotal + deliveryFee - discount;

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    if (placingOrder) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/restaurants");
      return;
    }

    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.address.trim() ||
      !address.city.trim() ||
      !address.pincode.trim()
    ) {
      alert("Please fill all delivery details.");
      return;
    }

    if (!/^\d{10}$/.test(address.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setPlacingOrder(true);

      // KEEP RESTAURANT INFORMATION FROM CART
      const orderItems = cart.map((item) => ({
        name: item.name,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),

        restaurant:
          item.restaurant || "Unknown Restaurant",

        restaurantPhone:
          item.restaurantPhone || "",
      }));

      const orderData = {
        customerName: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        pincode: address.pincode,

        items: orderItems,

        subtotal,
        deliveryFee,
        discount,
        total,

        paymentMethod,
      };

      console.log("ORDER DATA:", orderData);

      // PUBLIC BACKEND URL
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      localStorage.removeItem("cart");

      setCart([]);

      alert("Order placed successfully! 🎉");

      navigate("/orders");
    } catch (error) {
      console.error("Place Order Error:", error);

      alert(
        error.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

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
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cart")}
          sx={{
            color: "#f97316",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Back to Cart
        </Button>

        <Box>
          <Typography
            fontSize={{ xs: 26, md: 32 }}
            fontWeight={800}
            color="#111827"
          >
            Checkout
          </Typography>

          <Typography
            color="#6b7280"
            fontSize={14}
          >
            Complete your order securely
          </Typography>
        </Box>
      </Box>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            borderRadius: 4,
            textAlign: "center",
            py: 7,
          }}
        >
          <ShoppingBagOutlinedIcon
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
            Your cart is empty
          </Typography>

          <Typography
            color="#6b7280"
            sx={{ mt: 1, mb: 3 }}
          >
            Add some delicious food before checkout.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/restaurants")}
            sx={{
              background: "#f97316",
              textTransform: "none",
              borderRadius: 2.5,
              fontWeight: 700,
              px: 4,
            }}
          >
            Explore Restaurants
          </Button>
        </Card>
      ) : (
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.5fr 0.8fr",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <Box>
            {/* DELIVERY */}
            <Card
              sx={{
                borderRadius: 4,
                mb: 3,
              }}
            >
              <CardContent
                sx={{ p: { xs: 2, md: 3 } }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{
                      color: "#f97316",
                      fontSize: 28,
                    }}
                  />

                  <Typography
                    fontSize={20}
                    fontWeight={800}
                  >
                    Delivery Details
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Full Name"
                    name="name"
                    value={address.name}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{
                      maxLength: 10,
                    }}
                  />

                  <TextField
                    label="Complete Address"
                    name="address"
                    value={address.address}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      gridColumn: {
                        sm: "1 / -1",
                      },
                    }}
                  />

                  <TextField
                    label="City"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Pincode"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{
                      maxLength: 6,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* PAYMENT */}
            <Card sx={{ borderRadius: 4 }}>
              <CardContent
                sx={{ p: { xs: 2, md: 3 } }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <PaymentOutlinedIcon
                    sx={{
                      color: "#f97316",
                      fontSize: 28,
                    }}
                  />

                  <Typography
                    fontSize={20}
                    fontWeight={800}
                  >
                    Payment Method
                  </Typography>
                </Box>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />

                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online Payment"
                  />
                </RadioGroup>
              </CardContent>
            </Card>
          </Box>

          {/* ORDER SUMMARY */}
          <Card
            sx={{
              borderRadius: 4,
              position: { lg: "sticky" },
              top: 90,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 3,
                }}
              >
                <ShoppingBagOutlinedIcon
                  sx={{ color: "#f97316" }}
                />

                <Typography
                  fontSize={20}
                  fontWeight={800}
                >
                  Order Summary
                </Typography>
              </Box>

              {cart.map((item) => (
                <Box
                  key={`${item.restaurant}-${item.name}`}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography fontSize={13}>
                      {item.name} ×{" "}
                      {item.quantity || 1}
                    </Typography>

                    <Typography
                      fontSize={11}
                      color="#9ca3af"
                    >
                      {item.restaurant || "Restaurant"}
                    </Typography>
                  </Box>

                  <Typography
                    fontSize={13}
                    fontWeight={700}
                  >
                    ₹
                    {Number(item.price || 0) *
                      Number(item.quantity || 1)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2.5 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="#6b7280">
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
                <Typography color="#6b7280">
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
                <Typography color="#6b7280">
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
                }}
              >
                <Typography fontWeight={800}>
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

              <Button
                fullWidth
                variant="contained"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 800,
                  background: "#f97316",
                }}
              >
                {placingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${total}`}
              </Button>

              <Typography
                fontSize={11}
                color="#9ca3af"
                textAlign="center"
                sx={{ mt: 1.5 }}
              >
                🔒 Secure checkout • Fast delivery
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default Checkout;