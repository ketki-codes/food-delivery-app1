import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const restaurants = [
  {
    name: "Spice Garden",
    category: "Indian • North Indian",
    rating: "4.8",
    time: "25-30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "The Food Hub",
    category: "Fast Food • Burgers",
    rating: "4.6",
    time: "20-25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Urban Tadka",
    category: "Indian • Chinese",
    rating: "4.7",
    time: "30-35 min",
    price: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pizza Palace",
    category: "Pizza • Italian",
    rating: "4.5",
    time: "25-30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Royal Biryani",
    category: "Biryani • Mughlai",
    rating: "4.9",
    time: "30-40 min",
    price: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fresh Bowl",
    category: "Healthy • Salads",
    rating: "4.6",
    time: "20-25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
];

function Restaurants() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    `${restaurant.name} ${restaurant.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            fontSize={{ xs: 26, md: 32 }}
            fontWeight="800"
            color="#111827"
          >
            Restaurants
          </Typography>

          <Typography color="#6b7280" sx={{ mt: 0.5 }}>
            Discover the best restaurants near you
          </Typography>
        </Box>

        {/* SEARCH */}
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search restaurants..."
          size="small"
          sx={{
            width: { xs: "100%", md: 300 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "#fff",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* RESTAURANT CARDS */}
      <Grid container spacing={3}>
        {filteredRestaurants.map((restaurant) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={restaurant.name}
          >
            <Card
              onClick={() =>
                navigate(
                  `/restaurant/${encodeURIComponent(
                    restaurant.name
                  )}`
                )
              }
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #f3f4f6",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "0.3s",
                cursor: "pointer",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.10)",
                },
              }}
            >
              {/* IMAGE */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="190"
                  image={restaurant.image}
                  alt={restaurant.name}
                  sx={{
                    objectFit: "cover",
                  }}
                />

                {/* FAVORITE */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#ffffff",
                    "&:hover": {
                      background: "#ffffff",
                    },
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                {/* OFFER */}
                <Chip
                  label="20% OFF"
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    background: "#f97316",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                />
              </Box>

              {/* CONTENT */}
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  fontSize={19}
                  fontWeight="800"
                  color="#111827"
                >
                  {restaurant.name}
                </Typography>

                <Typography
                  fontSize={13}
                  color="#6b7280"
                  sx={{ mt: 0.5 }}
                >
                  {restaurant.category}
                </Typography>

                {/* DETAILS */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mt: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {/* RATING */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <StarIcon
                      sx={{
                        fontSize: 18,
                        color: "#f59e0b",
                      }}
                    />

                    <Typography
                      fontSize={13}
                      fontWeight={700}
                    >
                      {restaurant.rating}
                    </Typography>
                  </Box>

                  <Typography color="#d1d5db">
                    •
                  </Typography>

                  {/* TIME */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <AccessTimeIcon
                      sx={{
                        fontSize: 17,
                        color: "#6b7280",
                      }}
                    />

                    <Typography
                      fontSize={13}
                      color="#6b7280"
                    >
                      {restaurant.time}
                    </Typography>
                  </Box>

                  {/* PRICE */}
                  <Typography
                    fontSize={13}
                    color="#6b7280"
                    fontWeight={600}
                  >
                    {restaurant.price}
                  </Typography>
                </Box>

                {/* VIEW MENU */}
                <Box
                  sx={{
                    mt: 2,
                    py: 1,
                    textAlign: "center",
                    borderRadius: 2,
                    background: "#fff7ed",
                    color: "#f97316",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  View Menu →
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* NO RESULT */}
      {filteredRestaurants.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
          }}
        >
          <Typography
            fontSize={20}
            fontWeight={700}
          >
            No restaurants found
          </Typography>

          <Typography color="#6b7280">
            Try searching for another restaurant.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Restaurants;