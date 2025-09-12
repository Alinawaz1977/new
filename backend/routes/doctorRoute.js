import express from "express"
import { addDoctor, listDoctor } from "../controllers/doctorConctroller.js"
import upload from "../middleware/multer.js"

const doctorRouter = express.Router()

doctorRouter.post("/add", upload.single("image"), addDoctor)
doctorRouter.post("/list", listDoctor)

export default doctorRouter