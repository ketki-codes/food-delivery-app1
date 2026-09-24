const express = require("express");
const mongoose = require("mongoose");
const Address = require("../models/Address");

const router = express.Router();

// ===============================
// GET ALL ADDRESSES OF A USER
// ===============================
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const addresses = await Address.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({ addresses });
  } catch (error) {
    console.error("Get addresses error:", error);

    res.status(500).json({
      message: "Failed to load addresses",
    });
  }
});

// ===============================
// ADD NEW ADDRESS
// ===============================
router.post("/", async (req, res) => {
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
        message: "Please fill all required fields",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    // If this is the first/default address,
    // remove default status from existing addresses
    if (isDefault) {
      await Address.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const newAddress = await Address.create({
      userId,
      type,
      name,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault: isDefault || false,
    });

    res.status(201).json({
      message: "Address saved successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Add address error:", error);

    res.status(500).json({
      message: "Failed to save address",
      error: error.message,
    });
  }
});

// ===============================
// UPDATE ADDRESS
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid address ID",
      });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
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

    res.json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Update address error:", error);

    res.status(500).json({
      message: "Failed to update address",
    });
  }
});

// ===============================
// DELETE ADDRESS
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid address ID",
      });
    }

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    res.status(500).json({
      message: "Failed to delete address",
    });
  }
});

// ===============================
// SET DEFAULT ADDRESS
// ===============================
router.put("/:id/default", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid address ID",
      });
    }

    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // Remove default from user's other addresses
    await Address.updateMany(
      { userId: address.userId },
      { $set: { isDefault: false } }
    );

    // Make selected address default
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    );

    res.json({
      message: "Default address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Default address error:", error);

    res.status(500).json({
      message: "Failed to set default address",
    });
  }
});

module.exports = router;