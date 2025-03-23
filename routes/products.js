const express = require("express");
const { getProducts, getProductStatic } = require("../controllers/products");
const router = express.Router();

router.route("/").get(getProducts);
router.route("/static").get(getProductStatic);

module.exports = router;
