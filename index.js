import express from 'express'
import mongoose from 'mongoose'

import userRouter from './routes/userRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routes/productRouter.js'

const mongoUri = "mongodb+srv://admin:1234@cluster0.amjxnj9.mongodb.net/?appName=Cluster0"

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

app.use( express.json() )


//Authentication Part
app.use(authenticateUser)

app.use("/users", userRouter)
app.use("/products", productRouter)
 
app.listen( 3000 ,
    ()=>{
      console.log("Server is running!")  
    }
)
