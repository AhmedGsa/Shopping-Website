const express = require('express')
const {getProducts, createProduct, getProduct} = require("../controllers/products")
const router = express.Router()

router.route("/").get(getProducts).post(createProduct)
router.route("/:productID").get(getProduct)

module.exports = router