const express = require("express")
const app = express()

const userModel = require("./model/user")
const postModel = require("./model/post")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/create", async (req, res) => {

    let user = await userModel.create({
        username: "vadherom",
        email: "vadherom@gmail.com"
    })

    res.send(user)
})

app.get("/createpost", async (req, res) => {

    let post = await postModel.create({
        postData: "Om Aadhar Card"
    })

    let user = await userModel.findOne({ _id: "6a72e08aa47097e5e47704ad" })

    user.post.push(post._id);
    user.save();
    post.userid.push(user._id);
    post.save();  

    res.send("Updated Everything")

})

app.listen(3000, (err) => {
    if (err) throw err
    console.log("Server is running on port 3000")

})