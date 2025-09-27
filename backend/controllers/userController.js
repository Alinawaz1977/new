import userModel from "../models/userModel.js"
import bcrypt, { hash } from "bcrypt"
import createtoken from "../utils/userToken.js"
import doctormodel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            return res.send({ success: false, message: "Invalid Credentials" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword,
        })
        const token = createtoken(newUser._id)
        res.send({ success: true, token })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.send({ success: false, message: "Invalid Credentials" })
        }
        const verifyUser = await bcrypt.compare(password, user.password)
        if (!verifyUser) {
            return res.send({ success: false, message: "Invalid Credentials" })
        }
        const token = createtoken(user._id)
        res.send({ success: true, token, user })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }

}

const bookAppointment = async (req, res) => {
    try {
        const { userid, doctorid, slotDate, slotTime } = req.body
        const docData = await doctormodel.findById(doctorid).select("-password")
        if (!docData.available) {
            res.send({ success: false, message: "doctor not available" })
        }
        const slots_Booked = docData.slots_Booked
        if (slots_Booked[slotDate]) {
            if (slots_Booked[slotDate].includes(slotTime)) {
                res.send({ success: false, message: "Slot already booked" })
            }
            else {
                slots_Booked[slotDate].push(slotTime)
            }
        }
        else {
            slots_Booked[slotDate] = []
            slots_Booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userid).select("-password")
        delete docData.slots_Booked
        const appointmentData = {
            userid,
            docid: doctorid,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fee,
            date: new Date()
        }
        const newAppointment = await appointmentModel.create(appointmentData)
        await doctormodel.findByIdAndUpdate(doctorid, { slots_Booked })
        res.send({ success: true, message: "appointment booked" })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

const listAppointments = async (req, res) => {
    const { userid } = req.body
    const appointments = await appointmentModel.find({ userid })
    res.send({ success: true, appointments })
}
// for admin pannel
const listAllAppointments = async (req, res) => {
    const appointments = await appointmentModel.find()
    res.send({ success: true, appointments })
}
const allPatients = async (req, res) => {
    try {
        const patients = await userModel.find()
        res.send({ success: true, patients })
    } catch (error) {
        res.send({success:false,message:error.message})
    }
}

const cancelFeature = async (req, res) => {
    try {
        
        const { appointmentid } = req.body
        const appointment = await appointmentModel.findById(appointmentid)
        if(!appointment){
            res.send({success:false,message:"Doctor not found"})
        }
        appointment.cancelled = true;
        await appointment.save()
        res.send({ success: true, message: "Appointment cancelled successfully", appointment });
    } catch (error) {
        res.send({success:false,message:"Appointment cancelled successfully"})
    }
    }

export { createUser, loginUser, bookAppointment,allPatients, listAppointments,cancelFeature,listAllAppointments}