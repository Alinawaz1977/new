import express from "express"
import { addDoctor, cancellAppointment, complteAppointment, doctorLogin, findPatients, listDoctor } from "../controllers/doctorConctroller.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

import docAuth from "../middleware/doctoAuth.js"

const doctorRouter = express.Router()

doctorRouter.post("/add", upload.single("image"), addDoctor)
doctorRouter.get("/list", listDoctor)
doctorRouter.post("/login", doctorLogin)
doctorRouter.post("/patient", docAuth, findPatients)
doctorRouter.post("/cancell", docAuth, cancellAppointment)
doctorRouter.post("/complete", docAuth, complteAppointment)

export default doctorRouter
