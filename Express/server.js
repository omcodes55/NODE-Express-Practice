// const express = require("express");
// const app = express();


// app.use((req, res, next) => {
//     console.log("middleware running");
//     next();
// });


// app.get("/",(req, res)=>{
//     console.log("home route running.....")
//     console.log(req.method)
//     console.log(req.url)    
//     res.send("Welcome to the Express server.");
// })

// app.get("/json",(req, res)=>{
//     res.json({
//         name: "John Doe",
//         city: "New York",
//         mobile: "7486928889" 
//     })
// })

// app.get("/status-code",(req, res)=>{
//     res.status(404).send("User not found");
    
// })

// app.get("/redirect",(req, res)=>{    
//     res.redirect("/json");
// })


// app.listen(3000,()=>{
//     console.log("Server is running on port 3000......");
// })






//Authentication Simple Example using middleware

// const express = require("express");
// const app = express();

// app.use((req, res, next) => {

//     let isLoggedIn = true;   // true અથવા false

//     if (!isLoggedIn) {
//         return res.send("Please Login First");
//     }

//     console.log("User Logged In");
//     next();
// });

// app.get("/", (req, res) => {
//     res.send("Welcome to Dashboard");
// });

// app.listen(3000);






// ERROR HANDLING IN EXPRESS

const express = require("express");
const app = express();

app.use((req,res,next)=>{
    console.log("MiddleWare Running....")
    next();
})

app.get("/profile",(req,res)=>{
    res.send("Welcome to Home Page => Done")
    
})

app.get("/about",(req,res,next)=>{
    return next(new Error("Not Implemented"));
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Somthing went wrong")

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})





