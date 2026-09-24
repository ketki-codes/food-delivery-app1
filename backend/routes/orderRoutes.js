const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

// ===============================
// FIND RESTAURANT PHONE
// ===============================
const getRestaurantPhone = async (restaurantName) => {
  if (!restaurantName) {
    return "";
  }

  const name = String(restaurantName).trim();

  const restaurant = await Restaurant.findOne({
    name: {
      $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      $options: "i",
    },
    isActive: true,
  });

  console.log(
    "RESTAURANT PHONE LOOKUP:",
    name,
    "=>",
    restaurant ? restaurant.phone : "NOT FOUND"
  );

  return restaurant?.phone
    ? String(restaurant.phone).trim()
    : "";
};

// ===============================
// CREATE NEW ORDER
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !pincode ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide all required order details.",
      });
    }

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const restaurantName =
          item.restaurant || "Unknown Restaurant";

        const restaurantPhone =
          await getRestaurantPhone(restaurantName);

        return {
          name: item.name,
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1),
          restaurant: restaurantName,
          restaurantPhone,
        };
      })
    );

    const order = new Order({
      customerName,
      phone,
      address,
      city,
      pincode,
      items: updatedItems,
      subtotal: Number(subtotal || 0),
      deliveryFee: Number(deliveryFee || 0),
      discount: Number(discount || 0),
      total: Number(total || 0),
      paymentMethod: paymentMethod || "cod",
    });

    const savedOrder = await order.save();

    return res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// ===============================
// GET ALL ORDERS
// ===============================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderObject = order.toObject();

        if (
          orderObject.items &&
          orderObject.items.length > 0
        ) {
          orderObject.items = await Promise.all(
            orderObject.items.map(async (item) => {
              const restaurantPhone =
                await getRestaurantPhone(
                  item.restaurant
                );

              return {
                ...item,
                restaurantPhone,
              };
            })
          );
        }

        return orderObject;
      })
    );

    return res.status(200).json(updatedOrders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// ===============================
// TEST STATUS ROUTE
// ===============================
router.get("/test-status-route", (req, res) => {
  return res.status(200).json({
    message: "Order status route is working",
  });
});

// ===============================
// UPDATE ORDER STATUS
// ===============================
router.put("/:id/status", async (req, res) => {
  console.log("=================================");
  console.log("STATUS UPDATE ROUTE HIT");
  console.log("Order ID:", req.params.id);
  console.log("Request Body:", req.body);
  console.log("=================================");

  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
        orderId: id,
      });
    }

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
        receivedStatus: status,
      });
    }

    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
        orderId: id,
      });
    }

    existingOrder.status = status;

    const updatedOrder = await existingOrder.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

module.exports = router;