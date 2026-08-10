const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/miniprojectdata")
    .then(() => {
        console.log("MongoDB Connected")
    }).catch((err) => {
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email:String,
    password: String,
    date:{
        type:Date,
        default: Date.now()
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"post"
    }]
})

module.exports = mongoose.model("user", userSchema)