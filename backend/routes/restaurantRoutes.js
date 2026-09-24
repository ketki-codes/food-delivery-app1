const express = require("express");
const router = express.Router();

const Restaurant = require("../models/Restaurant");

// Get all restaurants
router.get("/", async (req, res) => {
try {
const restaurants = await Restaurant.find({
isActive: true,
}).sort({ createdAt: -1 });

res.status(200).json(restaurants);

} catch (error) {
console.error("Get Restaurants Error:", error);

res.status(500).json({  
  message: "Failed to fetch restaurants",  
  error: error.message,  
});

}
});

// Get restaurant by ID
router.get("/:id", async (req, res) => {
try {
const restaurant = await Restaurant.findById(req.params.id);

if (!restaurant) {  
  return res.status(404).json({  
    message: "Restaurant not found",  
  });  
}  

res.status(200).json(restaurant);

} catch (error) {
console.error("Get Restaurant Error:", error);

res.status(500).json({  
  message: "Failed to fetch restaurant",  
  error: error.message,  
});

}
});

// Add restaurant
router.post("/", async (req, res) => {
try {
const {
name,
phone,
email,
address,
city,
image,
cuisine,
rating,
} = req.body;

if (!name) {  
  return res.status(400).json({  
    message: "Restaurant name is required",  
  });  
}  

const restaurant = new Restaurant({  
  name,  
  phone,  
  email,  
  address,  
  city,  
  image,  
  cuisine,  
  rating,  
});  

const savedRestaurant = await restaurant.save();  

res.status(201).json({  
  message: "Restaurant added successfully!",  
  restaurant: savedRestaurant,  
});

} catch (error) {
console.error("Add Restaurant Error:", error);

res.status(500).json({  
  message: "Failed to add restaurant",  
  error: error.message,  
});

}
});

module.exports = router;