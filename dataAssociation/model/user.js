const mongoose = require("mongoose")



//configuration of database
mongoose.connect("mongodb://localhost:27017/dataasso").then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log(err)
})



const userSchema = mongoose.Schema({
    username: String,
    email: String,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]

})

module.exports = mongoose.model("user", userSchema)