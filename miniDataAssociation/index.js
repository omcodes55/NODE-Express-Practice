const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const userModel = require("./model/user");

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/create-user", async (req, res) => {
    try {
        const { username, name, age, email, password } = req.body;
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).send("User already registered");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const createdUser = await userModel.create({
            username,
            name,
            age,
            email,
            password: hash
        });

        const token = jwt.sign(
            { id: createdUser._id, email: createdUser.email },
            "secretkey"
        );

        console.log(createdUser);

        res.cookie("token", token);
        res.status(201).send("User Registered Successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {

    let { username, password } = req.body
    let user = await userModel.findOne({ username })
    if (!user) return res.send("Invalid Credentials")

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email }, "secretkey")
            res.cookie("token", token)
            res.send("Login")
        }
        else {
            res.send("Invalid Credentials")
        }
    })

})


app.listen(3000, () => {
    console.log("Server Running on http://localhost:3000");
});