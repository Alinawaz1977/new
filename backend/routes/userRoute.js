import express from "express"
import { allPatients, bookAppointment, cancelFeature, createUser, findUser, listAllAppointments, listAppointments, loginUser, onlinePayment, updateProfile, verifyPayment } from "../controllers/userController.js"
import authUser from "../middleware/userAuth.js"
import userModel from "../models/userModel.js"
import multer from "multer"
import upload from "../middleware/multer.js"

const userRouter=express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/create",createUser)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.post("/list-appointments",authUser,listAppointments)
userRouter.post("/listall-appointments",listAllAppointments)
userRouter.post("/cancel",authUser,cancelFeature)
userRouter.post("/update",upload.single("image"),authUser,updateProfile)
userRouter.post("/allusers",allPatients)
userRouter.post("/find",authUser,findUser)
userRouter.post("/payment",authUser,onlinePayment)
userRouter.post("/verify",authUser,verifyPayment)

export default userRouter