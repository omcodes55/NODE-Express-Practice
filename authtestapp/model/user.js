const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/authtestapp").then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log(err)
})

const userSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String,
    age: Number
})

module.exports = mongoose.model("user", userSchema)