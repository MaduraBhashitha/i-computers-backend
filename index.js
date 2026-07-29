import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routes/productRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'
import dns from "node:dns";
import orderRouter from './routes/orderRouter.js'

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config()

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    ()=>{
        console.log("Error Connecting to MongoDB")
    }
)


const app = express()

app.use(cors())

app.use( express.json() )


//Authentication Part
app.use(authenticateUser)

app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)
 
app.listen( 3000 ,
    ()=>{
      console.log("Server is running!")  
    }
)
