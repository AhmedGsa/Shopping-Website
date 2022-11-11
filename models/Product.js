const {Schema, default: mongoose} = require("mongoose")

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        maxlength: 50
    },
    price: {
        type: Number,
        required: [true, "please provide a price"]
    },
    img: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Product", ProductSchema)