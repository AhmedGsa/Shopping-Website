require("express-async-errors")
const express = require('express')
const connectDB = require("./db/connect")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const authRouter = require("./routes/auth")
const productsRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const viewsRouter = require("./routes/views")
const notFound = require('./middlewares/not-found')
const authMiddleware = require("./middlewares/authentication")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()

app.use(express.static("./public"))
app.use(express.json())
app.use(cookieParser())
// routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/products",productsRouter)
app.use("/api/v1/cart",authMiddleware,cartRouter)
app.use("/",viewsRouter)

// errors
app.use(errorHandlerMiddleware)
app.use(notFound)


const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,console.log(`server is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
    
}
start()
