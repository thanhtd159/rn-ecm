const express = require("express");
const router = express.Router();

const variantController = require("../controllers/variant.controller");

// Get variants of product
router.get("/products/:id/variants", variantController.getVariants);

// Create variant
router.post("/products/:id/variants", variantController.createVariant);

//
