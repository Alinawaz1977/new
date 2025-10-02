import appointmentModel from "../models/appointmentModel.js"
import doctormodel from "../models/doctorModel.js"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcrypt"
import createToken from "../utils/userToken.js"


const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, address1, address2, fee, description, experience } = req.body
        const image = req.file

        const url = await cloudinary.uploader.upload(image.path, { resource_type: "image" })

        const doctor = await doctormodel.create({
            name,
            image: url.secure_url,
            email,
            password,
            speciality,
            degree,
            address1,
            address2,
            fee,
            description,
            experience
        })
        res.send({ success: true, message: "Doctor added" })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}
const listDoctor = async (req, res) => {
    try {
        const doctors = await doctormodel.find()
        res.send({ success: true, doctors })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

const doctorLogin = async (req, res) => {
    const { email, password } = req.body
    const doctor = await doctormodel.find({ email })
    if (!doctor) {
        res.send({ success: false, message: "Invalid Credentials" })
    }
    const verify = await bcrypt.compare(password, doctor.password)
    if (!verify) {
        res.send({ success: false, message: "Invalid Credentials" })
    }
    const token = createToken(doctor._id)
    res.send({ success: true, token })
}

export { addDoctor, listDoctor, doctorLogin }