const express = require("express");
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
