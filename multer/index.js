const express = require("express")
const app = express()
const path = require("path")

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));


app.get("/",(req,res)=>{
    res.render("multer")
})


app.listen(5000,(err)=>{
    if(err) throw err
    console.log("Server is running on port 5000")
})
