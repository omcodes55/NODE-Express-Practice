const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
const userModel = require("./model/user");
const postModel = require("./model/post")

const PORT = 5151; //.env
const JWT_SECRET = "secretkey"; //.env


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

        const userExists = await userModel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (userExists) {
            return res.status(409).send("User already registered");
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
            {
                id: createdUser._id,
                email: createdUser.email
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token);

        console.log(createdUser);

        res.status(201).send("User Registered Successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(401).send("Invalid Credentials");
        }

        const result = await bcrypt.compare(
            password,
            user.password
        );

        if (!result) {
            return res.status(401).send("Invalid Credentials");
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token);

        res.status(200).redirect("/profile");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).redirect("/login")
});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("<h1>You must be login</h1>");
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send("Invalid or expired token");
    }
}

app.get("/profile", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate("posts");

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("profile", { user });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body

    let post = await postModel.create({
        content,
        user: user._id
    })

    user.posts.push(post._id);
    await user.save();
    res.status(201).redirect("/profile")
})

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});



