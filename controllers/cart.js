const Cart = require("../models/Cart")
const {StatusCodes} = require("http-status-codes")
const Product = require("../models/Product")
const { BadRequest } = require("../errors")

const getAllProducts = async (req,res) => {
    const cart = await Cart.findOne({owner: req.user.userID})
    const products = cart.products
    res.send({products})
}

const addProduct = async (req,res) => {
    const {productID} = req.params
    const testingProduct = await Product.findOne({_id: productID})
    if(!testingProduct) {
        throw new BadRequest("Product with provided id does not exist")
    }
    const cart = await Cart.findOne({owner: req.user.userID})
    let products = cart.products
    const exist = products.find((item) => item.productID === productID )
    if(exist) {
        throw new BadRequest("Product already in cart!")
    }
    const product = {productID: productID, quantity: 1}
    products.push(product)
    await Cart.findOneAndUpdate({owner: req.user.userID},{products: products})
    res.status(StatusCodes.OK).send("product added!")
}

const updateProduct = async (req,res) => {
    const {productID} = req.params
    const {quantity} = req.body
    const cart = await Cart.findOne({owner: req.user.userID})
    const products = cart.products
    const index = products.findIndex((item) => item.productID===productID)
    products[index].quantity = quantity
    await Cart.findOneAndUpdate({owner: req.user.userID},{products: products})
    res.status(StatusCodes.OK).send("product updated")
}

const deleteProduct = async (req,res) => {
    const {productID} = req.params
    const cart = await Cart.findOne({owner: req.user.userID})
    let products = cart.products
    products = products.filter((item) => item.productID !== productID)
    await Cart.findOneAndUpdate({owner: req.user.userID},{products: products})
    res.status(StatusCodes.OK).send("product deleted")
}

const clearCart = async (req,res) => {
    const products = []
    const cart = await Cart.findOneAndUpdate({owner: req.user.userID}, {products: products})
    res.status(StatusCodes.OK).send(cart)
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    clearCart
}