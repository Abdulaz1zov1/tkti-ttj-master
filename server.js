const express = require('express')
const app = express()

const db=require("./db")

const session = require("express-session");

const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require("method-override");
app.use(cors())
app.use(bodyParser.json({limit: '5mb'}))
const mongoose = require('mongoose')

// // const MongoURI = "mongodb://localhost:27017/asaaaaaaaaaaaaaaaaaaaaaaaaa"
// mongoose
//     .connect(MongoURI, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     })
//     .then((res) => {
//         console.log(`MongoDB Connected`);
//     })
    
app.locals.moment = require('moment')
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));


app.use(session({
    secret: process.env.SESSION || "0sxdsxs@!#$%^cscs",
    resave: false,
    saveUninitialized: false,
   
    cookie: { maxAge: 3600000, secure: false, httpOnly: false }
}))




// EJS Static
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/svgs', express.static(__dirname + 'public/svgs'))

// Set Views 
app.set('views', './views')
app.set('view engine', 'ejs')



app.get('/' , (req , res)=>{
   res.render('main',{
       msg:""
   })
})


app.get('/admin/login' , (req , res)=>{
    res.render('login',{
        msg:""
    })
 })

// app.get('/admin' , (req , res)=>{
//     res.render('admin')
//  })

//  app.get('/adminPanel' , (req , res)=>{
//     res.render('adminPanel')
//  })








app.use('/admin', require('./routes/user'))
app.use('/moderator', require('./routes/moderator'))
app.use('/student', require('./routes/student'))








app.listen(3000, ()=>{
    console.log(`Server is running on 3000`)
})