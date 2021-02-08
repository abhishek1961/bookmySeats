const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const path=require('path')
const bodyParser=require('body-parser')
const cors=require('cors')
const router=express.Router()
const config=require('./config')

//
const db=process.env.DATABASE || config.db
mongoose.connect(db,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
}).then(()=>{
    console.log('db conected')
}).catch((e)=>{
    console.log(e)
})


app.use(bodyParser.json())
app.use(cors({
    origin:'*',
    optionsSuccessStatus:200
}
    
))
const bookingRoutes=require('./routes/booking')(router)
// const sendOTPRoutes=require('./routes/send-otp')(router)

app.use('/api',bookingRoutes)




app.use(express.static(__dirname+'/public'))




// app.get('*',(req,res,next)=>{
//     res.sendFile(path.join(__dirname+'/public/index.html'));
    
// })


app.get('*',(req,res,next)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
    // res.send('First Angular 6 Application');
})


const port=process.env.PORT ||8080
app.listen(port,()=>{
    console.log('app is running on '+port)
})