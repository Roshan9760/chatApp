const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDb = require('./config/db');
const router = require('./routes/index')
const cookieparser = require('cookie-parser')




dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin:process.env.Frontend_URI ,
    credentials:true
}))

// api 
app.use(express.json())
app.use(cookieparser());

app.use("/api",router)
connectDb()
app.listen(PORT,()=>{console.log("App is running on Port  :" + PORT)})