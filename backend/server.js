import express from "express"
const app = express()
const port = 3000
import dotenv from 'dotenv'
import cors from "cors"
import { connect } from "mongoose"
import connectDb from "./config/mongodb.js"
import doctorRouter from "./routes/doctorRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRouter.js"
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDb()
connectCloudinary()


app.use("/api/doctor",doctorRouter)
app.use("/api/admin",adminRouter)
app.get("/",(req,res)=>{
  res.send("app is running")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
