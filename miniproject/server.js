
// // EJS Example

// const express = require('express')
// const app = express();
// const path = require('path');

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname, 'public')))
// app.set('view engine', 'ejs')


// app.get('/', (req, res)=>{
//     res.render("index")
// })


// app.listen(3001,()=>{
//     console.log("Server is Running http://localhost:3001")
// })






// __dirname AND __filename

const path = require('path');
console.log(path.join(__dirname,'public'))
console.log(__dirname+'\\public') 
console.log(__filename)




// //Dynamic routing
const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/profile/:name', (req, res)=>{
    res.send(`Hello ${req.params.name}`)
    // console.log(req.params.name)

})

app.get('/login/:username/:pass', (req, res)=>{
    res.send(`username: ${req.params.username} <br> password: ${req.params.pass}`)
    // console.log(req.params.username)
    // console.log(req.params.pass)
})


app.listen(3001,()=>{
    console.log("Server is Running on http://localhost:3001")
})




 


