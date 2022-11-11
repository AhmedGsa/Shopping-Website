const { StatusCodes } = require("http-status-codes")
const { BadRequest } = require("../errors/index")
const Product = require("../models/Product")

const getProducts = async (req,res) => {
    const products = await Product.find({}).select("_id name price img")
    res.status(StatusCodes.OK).json(products)
}

const createProduct = async (req,res) => {
    const {name, price, img} = req.body
    if(!name || !price) {
        throw new BadRequest("Please provide the required information")
    }
    const product = await Product.create({name, price, img})
    res.status(StatusCodes.OK).json(product)
}

const getProduct = async (req,res) => {
    const {productID} = req.params
    const product = await Product.findOne({_id: productID}).select("name price img")
    res.status(StatusCodes.OK).json(product)
}

module.exports = {getProducts, createProduct, getProduct}