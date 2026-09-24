const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Address = require("./models/Address");

// ✅ ORDER ROUTES
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api/restaurants",restaurantRoutes);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Food Delivery Backend is running!",
  });
});

// ===============================
// SIGNUP API
// ===============================

app.post("/api/signup", async (req, res) => {
  console.log("========== SIGNUP REQUEST ==========");
  console.log("Body:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    await user.save();

    console.log("User created:", user.email);

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ===============================
// LOGIN API
// ===============================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// ADD ADDRESS API
// ===============================

app.post("/api/addresses", async (req, res) => {
  try {
    const {
      userId,
      type,
      name,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    if (
      !userId ||
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const newAddress = new Address({
      userId,
      type: type || "Home",
      name,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault: isDefault || false,
    });

    await newAddress.save();

    return res.status(201).json({
      message: "Address saved successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ===============================
// GET ADDRESSES
// ===============================

app.get("/api/addresses/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      addresses,
    });
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ===============================
// DELETE ADDRESS
// ===============================

app.delete("/api/addresses/:id", async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(
      req.params.id
    );

    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    return res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ===============================
// UPDATE ADDRESS
// ===============================

app.put("/api/addresses/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    return res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
app.put("/api/test-status", (req, res) => {
  console.log("🔥 TEST STATUS PUT HIT");
  console.log("BODY:", req.body);

  res.status(200).json({
    message: "PUT route is working",
    body: req.body,
  });
});



// ===============================
// ORDER API
// ===============================

// Create Order
app.use("/api/orders", orderRoutes);
console.log("ORDER ROUTES LOADED");

// ===============================
// SERVER ERROR HANDLERS
// ===============================

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED REJECTION:", error);
});

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

// ===============================
// START SERVER
// ===============================

app.listen(PORT, "0.0.0.0", () => {
  console.log("=================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`http://127.0.0.1:${PORT}`);
  console.log("=================================");
});