const express = require("express");
const app = express();

const usermodel = require("./usermodel")

app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h1> go to users route </h1>");
});



app.post("/create", async (req, res) => {

    const createduser = await usermodel.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    });
    res.send("User created Successfully");
});


app.post("/update", async (req, res) => {   //update user using unique _id 
    const updateUser = await usermodel.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, email: req.body.email }, { new: true })
    res.send("User Updated Successfully");
})



app.post("/delete", async (req,res) => {
    const deleteuser= await usermodel.findOneAndDelete({_id: req.body._id})

    res.send(`${deleteuser.username} deleted successfully`)
    
})


app.get("/users", async (req, res) => {
    const users = await usermodel.find()  //find all users
    res.send(users)
})




app.listen(3000, () => {
    console.log("Server are running on PORT 3000")
});