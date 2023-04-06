const express = require('express')
const app = express()
const port = process.env.PORT||3000

//morgan
const morgan = require('morgan')
app.use(morgan('dev'))

//cors
const cors= require('cors')
app.use(cors())

//body parser
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//dot env
require('dotenv').config()

//session
const session= require('express-session')
app.use(session({secret:process.env.sessiosecret,resave:true, saveUninitialized:true,cookie:{
    expires:2678400000
}}))

//fileupload
const fileupload=require('express-fileupload')
app.use(fileupload({useTempFiles:true}))

//cloudinary
const cloudinary= require('cloudinary')
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})


//ejs
app.set('view engine','ejs')
//static files
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.mongolink,{useNewUrlParser:true, useUnifiedTopology:true}).then(res=>{
    if (res) {
        console.log('db connected');
        app.listen(port, () => console.log(`ruuning`))
    } else {
        console.log('db not connected');
    }
}).catch(err=>console.log(err))



app.use('/', require('./router/home'))//home

app.use('/register', require('./router/register'))//register

app.use('/login', require('./router/login'))//login

app.use('/addreciept', require('./router/addreciept'))//addrecieot

app.use('/reciept', require('./router/recieptpage'))//addrecieot

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

app.use((req,res)=>{
    res.status(404).render('404')
})