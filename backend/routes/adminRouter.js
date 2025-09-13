import express from "express"
import adminUser from "../controllers/adminController.js"
import adminAuth from "../middleware/adminAuth.js"

const adminRouter=express.Router()

adminRouter.post("/login",adminUser)

export default adminRouter