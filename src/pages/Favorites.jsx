import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

import { useNavigate } from "react-router-dom";

const initialFavorites = [
  {
    id: 1,
    name: "Butter Paneer",
    restaurant: "Spice Garden",
    price: 220,
    rating: 4.8,
    emoji: "🍛",
  },
  {
    id: 2,
    name: "Farmhouse Pizza",
    restaurant: "Pizza Palace",
    price: 320,
    rating: 4.7,
    emoji: "🍕",
  },
  {
    id: 3,
    name: "Veg Biryani",
    restaurant: "Royal Biryani",
    price: 180,
    rating: 4.6,
    emoji: "🍚",
  },
  {
    id: 4,
    name: "Masala Dosa",
    restaurant: "South Indian Hub",
    price: 140,
    rating: 4.9,
    emoji: "🥞",
  },
];

function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] =
    useState(initialFavorites);

  // REMOVE FAVORITE
  const removeFavorite = (id) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (item) => item.id !== id
      )
    );
  };

  // ADD TO CART
  const addToCart = (item) => {
    alert(`${item.name} added to cart 🛒`);
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
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
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
              background: "#fff1f2",
              color: "#ef4444",
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
            My Favorites ❤️
          </Typography>

          <Typography
            color="#6b7280"
            fontSize={14}
            sx={{ mt: 0.5 }}
          >
            Your favorite food items in one place
          </Typography>
        </Box>
      </Box>

      {/* EMPTY FAVORITES */}

      {favorites.length === 0 ? (
        <Card
          sx={{
            maxWidth: 700,
            mx: "auto",
            borderRadius: 4,
            textAlign: "center",
            py: 8,
            px: 3,
            border: "1px solid #f3f4f6",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              width: 85,
              height: 85,
              borderRadius: "50%",
              background: "#fff1f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <FavoriteBorderIcon
              sx={{
                fontSize: 45,
                color: "#ef4444",
              }}
            />
          </Box>

          <Typography
            fontSize={24}
            fontWeight={800}
          >
            No Favorites Yet
          </Typography>

          <Typography
            color="#6b7280"
            sx={{
              mt: 1,
              mb: 3,
            }}
          >
            Save your favorite dishes here
            and order them anytime.
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/restaurants")
            }
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
        <>
          {/* COUNT */}

          <Box
            sx={{
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FavoriteIcon
              sx={{
                color: "#ef4444",
                fontSize: 20,
              }}
            />

            <Typography
              fontWeight={700}
              color="#374151"
            >
              {favorites.length} Favorite Items
            </Typography>
          </Box>

          {/* FAVORITE GRID */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {favorites.map((item) => (
              <Card
                key={item.id}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  border:
                    "1px solid #f3f4f6",
                  boxShadow:
                    "0 6px 25px rgba(0,0,0,0.05)",
                  transition:
                    "all 0.25s ease",

                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                    boxShadow:
                      "0 12px 30px rgba(0,0,0,0.10)",
                  },
                }}
              >
                {/* FOOD IMAGE */}

                <Box
                  sx={{
                    height: 190,
                    background:
                      "linear-gradient(135deg,#fff7ed,#ffedd5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    fontSize: 85,
                  }}
                >
                  {item.emoji}

                  {/* FAVORITE BUTTON */}

                  <IconButton
                    onClick={() =>
                      removeFavorite(item.id)
                    }
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 42,
                      height: 42,
                      background: "#fff",
                      color: "#ef4444",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.12)",

                      "&:hover": {
                        background: "#fff1f2",
                      },
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>

                {/* DETAILS */}

                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    fontSize={18}
                    fontWeight={800}
                    color="#111827"
                    noWrap
                  >
                    {item.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.7,
                      mt: 0.7,
                    }}
                  >
                    <RestaurantOutlinedIcon
                      sx={{
                        fontSize: 16,
                        color: "#9ca3af",
                      }}
                    />

                    <Typography
                      fontSize={13}
                      color="#6b7280"
                      noWrap
                    >
                      {item.restaurant}
                    </Typography>
                  </Box>

                  {/* RATING */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        px: 1,
                        py: 0.3,
                        borderRadius: 1.5,
                        background: "#ecfdf5",
                      }}
                    >
                      <Typography
                        fontSize={12}
                        fontWeight={800}
                        color="#059669"
                      >
                        ★ {item.rating}
                      </Typography>
                    </Box>

                    <Typography
                      fontSize={12}
                      color="#9ca3af"
                    >
                      Highly rated
                    </Typography>
                  </Box>

                  {/* PRICE + CART */}

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
                      fontSize={20}
                      fontWeight={900}
                      color="#f97316"
                    >
                      ₹{item.price}
                    </Typography>

                    <Button
                      variant="contained"
                      startIcon={
                        <ShoppingCartOutlinedIcon />
                      }
                      onClick={() =>
                        addToCart(item)
                      }
                      sx={{
                        borderRadius: 2,
                        textTransform:
                          "none",
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg,#f97316,#ea580c)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#ea580c,#c2410c)",
                        },
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Favorites;