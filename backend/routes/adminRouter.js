import express from "express"
import  {adminUser,availableDoctor } from "../controllers/adminController.js"
import adminAuth from "../middleware/adminAuth.js"

const adminRouter=express.Router()
adminRouter.post("/login",adminUser)
adminRouter.post("/available",adminAuth,availableDoctor)


export default adminRouter