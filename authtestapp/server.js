const express = require("express")
const app = express()
const path = require("path")
const userModel = require("./model/user")
const user = require("./model/user")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.send("Something went wrong")

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email }, "password")
            res.cookie("token", token)
            res.redirect("/dashboard")
        }
        else {
            res.send("Something went wrong")
        }
    })



})

app.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs")
})


app.post("/create", (req, res) => {

    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
                username,
                email,
                password: hash,
                age
            })

            let token = jwt.sign({ email }, "password")
            res.cookie("token", token)
            res.redirect("/login")

        });
    });

})

app.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
})

app.listen(5000, (err) => {
    if (err) throw err;

    console.log("server is running on port 5000")
})