const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())





//Router api
const playerRoute = require('./routes/player.route')
app.use('/player',playerRoute)






//MONGO CONNECT
const connect = require('./config/database')

connect().then(()=>{
    console.log('db connect');
    app.listen(process.env.PORT,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(`PORT : ${process.env.PORT}`);
        }   
    })
}).catch((error)=>{
    console.log(error);
})