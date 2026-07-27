const express = require("express");
const app = express();

const usermodel = require("./usermodel")

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("<h1> go to create route </h1>");
});



app.post("/create", async (req, res) => {

    const createduser = await usermodel.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    });

    res.send(createduser);
});



app.get("/users",async (req,res)=>{
    const users = await usermodel.find()  //find all users

    res.send(users)
})




app.listen(3000,()=>{
    console.log("Server are running on PORT 3000")
});