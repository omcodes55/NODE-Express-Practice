const express = require("express")
const cookieparser = require("cookie-parser")
const app = express()

const bcrypt = require("bcrypt")

const PORT = 5656

app.use(cookieparser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.cookie('Name', 'Harsh')
    res.send("Cookie are set successfully")
})


app.get("/read", (req, res) => {
    console.log(req.cookies)
    res.send("read file")
})

app.get("/bcrypt", (req, res) => {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("Vadher@2004", salt, function (err, hash) {
            console.log(hash)
            res.send("orignal converted to hash")
        });
    });
})

app.get("/bcrypt-compare", (req, res) => {
    bcrypt.compare("Vadher@2004", "$2b$10$rIWpaCwGo0Y8OKVu72G7w.R4F2ySW/3Rj49poQ3LJwp8ZK3/GB3b6", function (err, result) {
        console.log(result)
        res.send(`Compared = ${result}`)
    });
})


app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server are running to port ${PORT}`)
})