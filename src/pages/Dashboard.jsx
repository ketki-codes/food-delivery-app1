import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { name: "Pizza", emoji: "🍕" },
    { name: "Burger", emoji: "🍔" },
    { name: "Biryani", emoji: "🍛" },
    { name: "Chinese", emoji: "🥡" },
    { name: "Desserts", emoji: "🍰" },
    { name: "Drinks", emoji: "🥤" },
  ];
const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    phone: "9876543210",
    food: "Indian • North Indian",
    rating: "4.8",
    time: "25-30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "The Food Hub",
    phone: "9876543211",
    food: "Fast Food • Burgers",
    rating: "4.6",
    time: "20-25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Urban Tadka",
    phone: "9876543212",
    food: "Indian • Chinese",
    rating: "4.7",
    time: "30-35 min",
    price: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Pizza Palace",
    phone: "9876543213",
    food: "Pizza • Italian",
    rating: "4.5",
    time: "25-30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Royal Biryani",
    phone: "9876543214",
    food: "Biryani • Mughlai",
    rating: "4.9",
    time: "30-40 min",
    price: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Fresh Bowl",
    phone: "9876543215",
    food: "Healthy • Salads",
    rating: "4.6",
    time: "20-25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
];
  
      
      

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const value = search.toLowerCase();

    return (
      restaurant.name.toLowerCase().includes(value) ||
      restaurant.food.toLowerCase().includes(value)
    );
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const openRestaurant = (restaurant) => {
    navigate("/restaurant-details", {
      state: { restaurant },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fffaf5",
        pb: 6,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          background: "#ffffff",
          borderBottom: "1px solid #f1f1f1",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              minHeight: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* LOGO */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "13px",
                  background: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                🍔
              </Box>

              <Typography
                fontWeight="bold"
                sx={{
                  color: "#111827",
                  fontSize: { xs: 18, sm: 22 },
                }}
              >
                Food<span style={{ color: "#f97316" }}>Go</span>
              </Typography>
            </Box>

            {/* LOCATION */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flexGrow: 1,
                ml: 4,
              }}
            >
              <Typography fontSize={12} color="#9ca3af">
                Deliver to
              </Typography>

              <Typography fontWeight="bold" color="#374151">
                📍 Lucknow, Uttar Pradesh
              </Typography>
            </Box>

            {/* CART + PROFILE */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{
                  background: "#fff7ed",
                  "&:hover": {
                    background: "#ffedd5",
                  },
                }}
              >
                🛒
              </IconButton>

              <IconButton
                onClick={() => navigate("/profile")}
                sx={{
                  width: 42,
                  height: 42,
                  background: "#f97316",
                  color: "white",
                  fontSize: 18,
                  "&:hover": {
                    background: "#ea580c",
                  },
                }}
              >
                👤
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* HERO */}
      <Container maxWidth="xl">
        <Box
          sx={{
            mt: { xs: 3, md: 5 },
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background:
              "linear-gradient(135deg, #fff0df 0%, #ffe1c2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              sx={{
                color: "#f97316",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              DELICIOUS FOOD, DELIVERED FAST
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                color: "#111827",
                fontSize: { xs: 30, sm: 42, md: 50 },
                lineHeight: 1.1,
              }}
            >
              Good food.
              <br />
              Good mood. 😋
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",
                mt: 2,
                mb: 3,
                fontSize: { xs: 14, sm: 16 },
              }}
            >
              Discover delicious meals from your favourite restaurants
              and get them delivered to your doorstep.
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                document
                  .getElementById("restaurants-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              sx={{
                background: "#f97316",
                borderRadius: 3,
                px: 3,
                py: 1.3,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "#ea580c",
                },
              }}
            >
              Explore Food
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              fontSize: 150,
              alignItems: "center",
              justifyContent: "center",
              width: 280,
            }}
          >
            🍕
          </Box>
        </Box>

        {/* SEARCH */}
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants, dishes or cuisines..."
            sx={{
              background: "#ffffff",
              borderRadius: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    🔎
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* CATEGORIES */}
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#111827", mb: 2 }}
          >
            What are you craving? 🤤
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {categories.map((category) => (
              <Card
                key={category.name}
                onClick={() => setSearch(category.name)}
                sx={{
                  minWidth: 105,
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 2 }}>
                  <Typography fontSize={35}>
                    {category.emoji}
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    fontSize={14}
                    sx={{ mt: 1 }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* RESTAURANTS */}
        <Box
          id="restaurants-section"
          sx={{ mt: 5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="#111827"
              >
                Popular Restaurants
              </Typography>

              <Typography color="#9ca3af" fontSize={14}>
                {search
                  ? `Search results for "${search}"`
                  : "Top places near you"}
              </Typography>
            </Box>

            <Button
  onClick={() => navigate("/restaurants")}
  sx={{
    color: "#f97316",
    fontWeight: "bold",
    textTransform: "none",
  }}
>
  View All
</Button>
          </Box>

          {filteredRestaurants.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                background: "#ffffff",
                borderRadius: 4,
              }}
            >
              <Typography fontSize={55}>🔍</Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1 }}
              >
                No restaurants found
              </Typography>

              <Typography color="#9ca3af">
                Try searching another restaurant or cuisine.
              </Typography>

              <Button
                onClick={() => setSearch("")}
                sx={{
                  mt: 2,
                  color: "#f97316",
                  textTransform: "none",
                }}
              >
                Clear Search
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredRestaurants.map((restaurant) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  key={restaurant.id}
                >
                  <Card
                    onClick={() => openRestaurant(restaurant)}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      height: "100%",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.07)",
                      transition: "0.25s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow:
                          "0 12px 30px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {/* IMAGE */}
                    <Box
                      sx={{
                        height: 190,
                        position: "relative",
                        overflow: "hidden",
                        background: "#fff0df",
                      }}
                    >
                      <Box
                        component="img"
                        src={restaurant.image}
                        alt={restaurant.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {/* OFFER */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          background: "#f97316",
                          color: "white",
                          px: 1.5,
                          py: 0.6,
                          borderRadius: 2,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        20% OFF
                      </Box>

                      {/* FAVORITE */}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(restaurant.id);
                        }}
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "white",
                          width: 42,
                          height: 42,
                          "&:hover": {
                            background: "#fff7ed",
                          },
                        }}
                      >
                        {favorites.includes(restaurant.id) ? (
                          <FavoriteIcon
                            sx={{ color: "#f97316" }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            sx={{ color: "#374151" }}
                          />
                        )}
                      </IconButton>
                    </Box>

                    {/* CONTENT */}
                    <CardContent>
                      <Typography
                        fontWeight="bold"
                        fontSize={18}
                        color="#111827"
                      >
                        {restaurant.name}
                      </Typography>

                      <Typography
                        color="#9ca3af"
                        fontSize={13}
                        sx={{ mt: 0.5 }}
                      >
                        {restaurant.food}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#16a34a",
                            color: "white",
                            px: 1,
                            py: 0.3,
                            borderRadius: 1.5,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          ★ {restaurant.rating}
                        </Box>

                        <Typography
                          color="#6b7280"
                          fontSize={13}
                        >
                          • {restaurant.time}
                        </Typography>

                        <Typography
                          color="#6b7280"
                          fontSize={13}
                        >
                          • {restaurant.price}
                        </Typography>
                      </Box>

                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          openRestaurant(restaurant);
                        }}
                        sx={{
                          mt: 2,
                          borderColor: "#f97316",
                          color: "#f97316",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#ea580c",
                            background: "#fff7ed",
                          },
                        }}
                      >
                        View Menu
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;