import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import doctormodel from "../models/doctorModel.js"

const adminUser = (req, res) => {
    try {
        const { email, password } = req.body
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.SECRET)
            return res.send({ success: true, token })
        }
        return res.send({ success: false, message: "Invalid Credentials" })

    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

// toogle availibility of a doctor 
const availableDoctor = async (req, res) => {
    try {
        const { doctorid, availibility } = req.body
        const doctor = await doctormodel.findById(doctorid)
        if (!doctor) {
            res.send({ success: false, message: "doctor does not exist" })
        }
        doctor.available = availibility
        await doctor.save()
        res.send({ success: true })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

export { adminUser, availableDoctor }