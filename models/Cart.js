const {Schema, model, default: mongoose} = require('mongoose')

const CartSchema = new Schema({
    products: {
        type: Array,
        default: []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user's id"]
    }
})

module.exports = mongoose.model("Cart", CartSchema)