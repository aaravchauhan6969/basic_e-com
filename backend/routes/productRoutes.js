const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.get("/", async (req, res) => {

    const products = await Product.find();

    res.json(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

router.post("/", async (req, res) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        stock: req.body.stock
    });

    const savedProduct = await product.save();

    res.json(savedProduct);
});
router.delete("/:id", async(req, res) => {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: "Product Deleted"
    });
});
router.put("/:id", async(req, res) => {

    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
});
module.exports = router;