const express = require("express")
const {getAllProducts, addProduct, updateProduct, deleteProduct, clearCart} = require("../controllers/cart")
const router = express.Router()

router.route("/").get(getAllProducts).delete(clearCart)
router.route("/:productID").post(addProduct).delete(deleteProduct).patch(updateProduct)

module.exports = router
