const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { products, totalPrice } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = new Order({
    user: req.user.id,
    products: products.map((item) => ({
      product: item.id,
      quantity: item.quantity
    })),
    totalPrice
  });

  const savedOrder = await order.save();

  res.json(savedOrder);
});

router.get("/myorders", authMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("products.product");

  res.json(orders);
});

module.exports = router;
