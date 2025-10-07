import appointmentModel from "../models/appointmentModel.js"
import doctormodel from "../models/doctorModel.js"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcrypt"
import createToken from "../utils/userToken.js"
import mongoose from "mongoose"


const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, address1, address2, fee, description, experience } = req.body
        const image = req.file

        const url = await cloudinary.uploader.upload(image.path, { resource_type: "image" })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const doctor = await doctormodel.create({
            name,
            image: url.secure_url,
            email,
            password: hashPassword,
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
    const doctor = await doctormodel.findOne({ email })
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

const findPatients = async (req, res) => {
    try {
        const { docid } = req.body
        const patients = await appointmentModel.find({ "docData._id": new mongoose.Types.ObjectId(docid) })
        const stats = await appointmentModel.aggregate([
            {
                $match: {
                    "docData._id": new mongoose.Types.ObjectId(docid),
                    payment: false,
                    cancelled: false
                }
            },
            {
                $group: {
                    _id: "docData._id",
                    totalEarnings: { $sum: "$amount" },
                    uniqueUsers: { $addToSet: "$userid" },
                }
            },
            {
                $project: {
                    _id: 0,
                    totalEarnings: 1,
                    uniqueUserCount: { $size: "$uniqueUsers" }
                }
            }
        ]);
        res.send({ success: true, stats, patients })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}
// for cancelling appointment from doctor
const cancellAppointment = async (req, res) => {
    try {
        const { appointmentid } = req.body
        const appointment = await appointmentModel.findOne({ _id: appointmentid })
        appointment.cancelled=true;
        appointment.isCompleted=false
        await appointment.save()
        res.send({success:true,message:"appointment cancelled"})
    } catch (error) {
        res.send({success:true,message:error.message})
    }
}
const complteAppointment = async (req, res) => {
    try {
        const { appointmentid } = req.body
        const appointment = await appointmentModel.findOne({ _id: appointmentid })
        appointment.cancelled=false;
        appointment.isCompleted=true
        await appointment.save()
        res.send({success:true,message:"appointment completed"})
    } catch (error) {
        res.send({success:true,message:error.message})
    }
}

export { addDoctor, listDoctor, doctorLogin, findPatients,cancellAppointment,complteAppointment }