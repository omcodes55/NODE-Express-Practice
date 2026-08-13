const express = require("express")
const app = express()
const path = require("path")
const multer = require("multer")
const cypto = require("crypto")
const { throws } = require("assert")


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    cypto.randomBytes(12,(err,bytes)=>{
        const fn = bytes.toString('hex') + path.extname(file.originalname)
        cb(null, fn)    
    })
  }
})
const upload = multer({ storage: storage })


app.get("/",(req,res)=>{
    res.render("multer")
})

app.post("/upload", upload.single("image"), (req, res)=>{
    
    console.log(req.file);
    res.send("File uploaded successfully!");
});



app.listen(5000,(err)=>{
    if(err) throw err
    console.log("Server is running on port 5000")
})
