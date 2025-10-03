import express from "express"
import { addDoctor, doctorLogin, findPatients, listDoctor } from "../controllers/doctorConctroller.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"
import { addslots } from "../controllers/addslots.js"

const doctorRouter = express.Router()

doctorRouter.post("/add", upload.single("image"), addDoctor)
doctorRouter.get("/list", listDoctor)
doctorRouter.post("/slot", addslots)
doctorRouter.post("/login", doctorLogin)
doctorRouter.post("/patient", findPatients)

export default doctorRouter