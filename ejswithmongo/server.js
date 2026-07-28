const express = require("express")
const app = express()
const path = require("path")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const userModel = require("./model/user")
const usermodel = require("../databasemongoose/usermodel")


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/users", async (req, res) => {

    let users = await userModel.find();
    res.render("usercard.ejs",{users})
})


app.post("/create", async (req, res) => {

    let { name, email, image } = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    })

    res.redirect("/users")

})


app.listen(3000, (err) => {
    if (err) throw err
    console.log("server running on port http://localhost:3000")
})