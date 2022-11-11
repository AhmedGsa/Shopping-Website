const express = require("express")
const router = express.Router()
const {login, register, home, success, logout} = require("../controllers/views")
const authMiddleware = require("../middlewares/authentication")
const checkLoggedIn = require("../middlewares/check-logged-in")
const notLoggedInTest = require("../middlewares/not-logged-in")

router.get("/login",checkLoggedIn, login)
router.get("/register",checkLoggedIn, register)
router.get("/", notLoggedInTest, home)
router.get("/success",authMiddleware , success)
router.get("/logout", logout)

module.exports = router