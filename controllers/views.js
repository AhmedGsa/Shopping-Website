const {StatusCodes} = require("http-status-codes")

const login = async (req,res) => {
    res.render("login.ejs")
}

const register = (req,res) => {
    res.render("register.ejs")
}

const home = (req,res) => {
    res.render("home.ejs")
}

const success = (req,res) => {
    res.redirect("/")
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 1
    })
    res.redirect("/login")
}

module.exports = {login, register, home, success, logout}