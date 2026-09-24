import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function RestaurantDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const restaurant = location.state?.restaurant;

  const [favorite, setFavorite] = useState(false);

  if (!restaurant) {
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Restaurant not found
        </Typography>

        <Button
          onClick={() => navigate("/restaurants")}
          sx={{
            mt: 2,
            color: "#f97316",
            textTransform: "none",
          }}
        >
          Back to Restaurants
        </Button>
      </Container>
    );
  }

  // Restaurant phone
  const restaurantPhone =
    restaurant.phone ||
    restaurant.restaurantPhone ||
    "";

  // VEG MENU
  const menuItems = [
    {
      name: "Veg Biryani",
      description:
        "Aromatic basmati rice cooked with fresh vegetables and Indian spices.",
      price: 179,
      rating: 4.6,
      category: "Biryani",
    },
    {
      name: "Paneer Tikka",
      description:
        "Soft paneer cubes grilled with capsicum and aromatic spices.",
      price: 199,
      rating: 4.6,
      category: "Starters",
    },
    {
      name: "Hara Bhara Kebab",
      description:
        "Crispy vegetable kebabs made with spinach, peas and Indian spices.",
      price: 159,
      rating: 4.5,
      category: "Starters",
    },
    {
      name: "Shahi Paneer",
      description:
        "Soft paneer cooked in a rich, creamy and mildly spiced gravy.",
      price: 229,
      rating: 4.7,
      category: "Main Course",
    },
    {
      name: "Kadhai Paneer",
      description:
        "Paneer cooked with capsicum, onion and aromatic Indian spices.",
      price: 219,
      rating: 4.7,
      category: "Main Course",
    },
    {
      name: "Dal Makhani",
      description:
        "Creamy slow-cooked black lentils prepared with traditional spices.",
      price: 189,
      rating: 4.6,
      category: "Main Course",
    },
    {
      name: "Butter Naan",
      description:
        "Soft and freshly baked naan topped with delicious butter.",
      price: 49,
      rating: 4.5,
      category: "Breads",
    },
    {
      name: "Masala Coke",
      description:
        "Refreshing chilled soft drink with a spicy Indian twist.",
      price: 79,
      rating: 4.4,
      category: "Drinks",
    },
  ];

  // ADD TO CART
  const addToCart = (item) => {
    const oldCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = oldCart.find(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.restaurant === restaurant.name
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = oldCart.map((cartItem) =>
        cartItem.name === item.name &&
        cartItem.restaurant === restaurant.name
          ? {
              ...cartItem,
              quantity: (cartItem.quantity || 1) + 1,
              restaurantPhone: restaurantPhone,
            }
          : cartItem
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...item,
          quantity: 1,
          restaurant: restaurant.name,
          restaurantPhone: restaurantPhone,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${item.name} added to cart successfully!`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fffaf5",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">

        {/* BACK */}
        <Button
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            color: "#f97316",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          ← Back
        </Button>

        {/* RESTAURANT HEADER */}
        <Card
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={restaurant.image}
              alt={restaurant.name}
              sx={{
                width: "100%",
                height: { xs: 220, md: 350 },
                objectFit: "cover",
                display: "block",
              }}
            />

            <IconButton
              onClick={() => setFavorite(!favorite)}
              sx={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "white",
                "&:hover": {
                  background: "#fff7ed",
                },
              }}
            >
              {favorite ? (
                <FavoriteIcon sx={{ color: "#ef4444" }} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "#f97316" }}
                />
              )}
            </IconButton>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 4 } }}>

            {/* NAME */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#111827"
                >
                  {restaurant.name}
                </Typography>

                <Typography
                  color="#6b7280"
                  sx={{ mt: 1 }}
                >
                  {restaurant.food ||
                    restaurant.category ||
                    "Indian Food"}
                </Typography>
              </Box>

              <Chip
                label="20% OFF"
                sx={{
                  background: "#fff7ed",
                  color: "#ea580c",
                  fontWeight: "bold",
                }}
              />
            </Box>

            {/* BASIC DETAILS */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 3,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={`⭐ ${restaurant.rating}`}
                sx={{ fontWeight: "bold" }}
              />

              <Chip
                label={`🕒 ${restaurant.time}`}
                sx={{ fontWeight: "bold" }}
              />

              <Chip
                label={`💰 ${restaurant.price}`}
                sx={{ fontWeight: "bold" }}
              />

              <Chip
                label="🟢 Open Now"
                sx={{
                  color: "#15803d",
                  background: "#f0fdf4",
                  fontWeight: "bold",
                }}
              />
            </Box>

            {/* RESTAURANT INFORMATION */}
            <Grid container spacing={2} sx={{ mt: 2 }}>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 2,
                    background: "#fff7ed",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{ color: "#f97316" }}
                  />

                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    Location
                  </Typography>

                  <Typography
                    color="#6b7280"
                    variant="body2"
                  >
                    Hazratganj, Lucknow, Uttar Pradesh
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 2,
                    background: "#fff7ed",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <AccessTimeOutlinedIcon
                    sx={{ color: "#f97316" }}
                  />

                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    Opening Hours
                  </Typography>

                  <Typography
                    color="#6b7280"
                    variant="body2"
                  >
                    10:00 AM - 11:00 PM
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 2,
                    background: "#fff7ed",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <LocalShippingOutlinedIcon
                    sx={{ color: "#f97316" }}
                  />

                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    Delivery
                  </Typography>

                  <Typography
                    color="#6b7280"
                    variant="body2"
                  >
                    Fast delivery at your doorstep
                  </Typography>
                </Box>
              </Grid>

            </Grid>

            {/* ABOUT */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mt: 4 }}
            >
              About Restaurant
            </Typography>

            <Typography
              color="#6b7280"
              sx={{
                mt: 1,
                lineHeight: 1.8,
              }}
            >
              {restaurant.name} serves delicious and freshly
              prepared vegetarian food made with quality
              ingredients. Enjoy authentic Indian flavours,
              quick delivery and a great dining experience.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* POPULAR MENU */}
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#111827"
            >
              Popular Menu
            </Typography>

            <Typography
              color="#6b7280"
              sx={{ mt: 0.5, mb: 3 }}
            >
              Choose your favourite vegetarian dishes and add
              them to your cart.
            </Typography>

            <Grid container spacing={3}>
              {menuItems.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid #f3f4f6",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.06)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow:
                          "0 10px 25px rgba(249,115,22,0.15)",
                      },
                    }}
                  >
                    {/* FOOD ICON */}
                    <Box
                      sx={{
                        height: 150,
                        background:
                          "linear-gradient(135deg, #fff7ed, #ffedd5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 65,
                      }}
                    >
                      {item.category === "Biryani"
                        ? "🍛"
                        : item.category === "Starters"
                        ? "🥗"
                        : item.category === "Main Course"
                        ? "🍲"
                        : item.category === "Breads"
                        ? "🫓"
                        : "🥤"}
                    </Box>

                    <CardContent>
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{
                          color: "#ea580c",
                          background: "#fff7ed",
                          mb: 1,
                        }}
                      />

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="#6b7280"
                        sx={{
                          mt: 1,
                          minHeight: 42,
                        }}
                      >
                        {item.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <Rating
                          value={item.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />

                        <Typography variant="body2">
                          {item.rating}
                        </Typography>
                      </Box>

                      {/* PRICE + ADD */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "space-between",
                          mt: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="#111827"
                        >
                          ₹{item.price}
                        </Typography>

                        <Button
                          variant="contained"
                          startIcon={
                            <AddShoppingCartIcon />
                          }
                          onClick={() =>
                            addToCart(item)
                          }
                          sx={{
                            background: "#f97316",
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": {
                              background: "#ea580c",
                            },
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* CONTACT RESTAURANT */}
            <Box
              sx={{
                mt: 5,
                p: 3,
                borderRadius: 3,
                background: "#111827",
                color: "white",
              }}
            >
              <Grid
                container
                spacing={3}
                alignItems="center"
              >
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Need help with your order?
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#d1d5db",
                    }}
                  >
                    Contact the restaurant directly for
                    help with your food order.
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    component="a"
                    href={`tel:${restaurantPhone}`}
                    startIcon={
                      <PhoneOutlinedIcon />
                    }
                    sx={{
                      background: "#f97316",
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: "bold",
                      "&:hover": {
                        background: "#ea580c",
                      },
                    }}
                  >
                    Contact Restaurant
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* GO TO CART */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/cart")}
                sx={{
                  px: 5,
                  py: 1.4,
                  background: "#f97316",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#ea580c",
                  },
                }}
              >
                🛒 Go to Cart
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default RestaurantDetails;