const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    fs.readdir("./files", function (err, files) {
        if (err) return res.send(err);
        res.render("index", { files });
    });

});


app.post("/create", (req, res) => {

    fs.writeFile(

        `./files/${req.body.title}.txt`,

        req.body.description,

        function (err) {

            if (err) return res.send(err);
            res.redirect("/");

        }

    );

});

app.get("/file/:filename", function (req, res) {

    fs.readFile(
        `./files/${req.params.filename}`,
        "utf-8",
        function (err, data) {

            if (err) return res.send(err);

            res.render("show", {
                filename: req.params.filename,
                content: data
            });

        }
    );

});

app.post("/edit",(req,res)=>{
    fs.rename(
        `./files/${req.params.filename}`,

        `./files/${req.query.newname}`,

        function(err){

            res.redirect("/");

        }
)
})


app.get("/edit/:filename", function (req, res) {

    fs.readFile(
        `./files/${req.params.filename}`,
        "utf-8",
        function (err, data) {

            if (err) return res.send(err);

            res.render("edit", {
                filename: req.params.filename,
                content: data
            });

        }
    );

});

app.post("/edit/:filename", function (req, res) {

    const oldFilename = req.params.filename;
    const newFilename = req.body.title + ".txt";

    // First rename the file
    fs.rename(
        `./files/${oldFilename}`,
        `./files/${newFilename}`,
        function (err) {

            if (err) return res.send(err);

            // Then update the content
            fs.writeFile(
                `./files/${newFilename}`,
                req.body.description,
                function (err) {

                    if (err) return res.send(err);

                    res.redirect("/");

                }
            );

        }
    );

});

// DELETE PAGE
app.get("/delete/:filename", function (req, res) {

    res.render("delete", {
        filename: req.params.filename
    });

});


// DELETE FILE
app.post("/delete/:filename", function (req, res) {

    fs.unlink(
        `./files/${req.params.filename}`,
        function (err) {

            if (err) return res.send(err);

            res.redirect("/");
 
        }
    );

});

app.listen(5001, () => {
    console.log("Server Running http://localhost:5001");
});