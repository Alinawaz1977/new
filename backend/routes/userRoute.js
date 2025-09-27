import express from "express"
import { allPatients, bookAppointment, cancelFeature, createUser, listAllAppointments, listAppointments, loginUser } from "../controllers/userController.js"
import authUser from "../middleware/userAuth.js"
import userModel from "../models/userModel.js"

const userRouter=express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/create",createUser)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.post("/list-appointments",authUser,listAppointments)
userRouter.post("/listall-appointments",listAllAppointments)
userRouter.post("/cancel",authUser,cancelFeature)
userRouter.post("/allusers",allPatients)

export default userRouter