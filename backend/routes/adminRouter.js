import express from "express"
import  {adminUser,availableDoctor, cancelAppointment, completeAppointment } from "../controllers/adminController.js"
import adminAuth from "../middleware/adminAuth.js"

const adminRouter=express.Router()
adminRouter.post("/login",adminUser)
adminRouter.post("/available",adminAuth,availableDoctor)
adminRouter.post("/cancel",adminAuth,cancelAppointment)
adminRouter.post("/complete",adminAuth,completeAppointment)


export default adminRouter