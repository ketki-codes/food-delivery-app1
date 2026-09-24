const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
},

price: {  
  type: Number,  
  required: true,  
},  

quantity: {  
  type: Number,  
  default: 1,  
},  

restaurant: {  
  type: String,  
  default: "Unknown Restaurant",  
},  

restaurantPhone: {  
  type: String,  
  default: "",  
},

},
{ _id: false }
);

const orderSchema = new mongoose.Schema(
{
customerName: {
type: String,
required: true,
},

phone: {  
  type: String,  
  required: true,  
},  

address: {  
  type: String,  
  required: true,  
},  

city: {  
  type: String,  
  required: true,  
},  

pincode: {  
  type: String,  
  required: true,  
},  

items: {  
  type: [orderItemSchema],  
  required: true,  
},  

subtotal: {  
  type: Number,  
  required: true,  
},  

deliveryFee: {  
  type: Number,  
  default: 40,  
},  

discount: {  
  type: Number,  
  default: 0,  
},  

total: {  
  type: Number,  
  required: true,  
},  

paymentMethod: {  
  type: String,  
  enum: ["cod", "online"],  
  default: "cod",  
},  

status: {  
  type: String, 
  enum: [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ],
  default: "Pending",  
},

},
{
timestamps: true,
}
);

module.exports = mongoose.model("Order", orderSchema);