import userModel from "../models/userModel.js"
import bcrypt, { hash } from "bcrypt"
import createtoken from "../utils/userToken.js"
import doctormodel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import env, { configDotenv } from "dotenv"
configDotenv()
import Stripe from "stripe"
import { v2 as cloudinary } from "cloudinary"
const currency = "$"
const deliveryCharges = "10"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)




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
           return res.send({ success: false, message: "doctor not available" })
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
        res.send({ success: false, message: error.message })
    }
}

const cancelFeature = async (req, res) => {
    try {
        const { appointmentid, slotDate, slotTime } = req.body;

        const appointment = await appointmentModel.findById(appointmentid);
        if (!appointment) {
            return res.status(404).send({ success: false, message: "Appointment not found" });
        }

        const doctor = await doctormodel.findById(appointment.docData._id);
        if (!doctor) {
            return res.status(404).send({ success: false, message: "Doctor not found" });
        }

        // Remove the slot
        if (doctor.slots_Booked && doctor.slots_Booked[slotDate]) {
            doctor.slots_Booked[slotDate] = doctor.slots_Booked[slotDate].filter(
                (time) => time !== slotTime
            );
            if (doctor.slots_Booked[slotDate].length === 0) {
                delete doctor.slots_Booked[slotDate];
            }

            // ✅ Mark as modified so Mongoose knows it changed
            doctor.markModified('slots_Booked');
        }
        // Mark appointment as cancelled
        appointment.cancelled = true;

        // Save both
        await doctor.save();
        await appointment.save();

        res.send({ success: true, appointment, message: "Appointment cancelled" });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

// for user profile editing

const updateProfile = async (req, res) => {
    try {
        const { userid, address1, address2, gender, dob, phone } = req.body
        const user = await userModel.findById(userid)
        const image = req.file
        if (image) {
            const imageUrl = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
            user.image = imageUrl.secure_url
        }
        const birthDate = new Date(dob)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        console.log(age);
        user.address1 = address1
        user.address2 = address2
        user.gender = gender
        user.dob = age
        user.phone = phone
        await user.save()
        res.send({ success: true, message: "profile Updated" })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

const findUser = async (req, res) => {
    try {
        const { userid } = req.body
        const user = await userModel.findById(userid)
        res.send({ success: true, user })
    } catch (error) {
        res.send({ success: false, message: error.message })

    }
}


// completing online payment through stripe 
const onlinePayment = async (req, res) => {
    try {
        const { appointmentid } = req.body
        const { origin } = req.headers
        const appointment = await appointmentModel.findById(appointmentid)


        const line_items = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: appointment.docData?.name
                },
                unit_amount: appointment.amount * 100 // Stripe uses cents
            },
            quantity: 1
        }];

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "delievery charges"
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&docid=${appointment._id}`,
            cancel_url: `${origin}/verify?success=false&docid=${appointment._id}`,
            line_items,
            mode: "payment",
        })
        console.log("session:", session);

        res.send({ success: true, session_url: session.url })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { docid, success } = req.body
        if (success === "true") {
            const appointment = await appointmentModel.findById(docid)
            appointment.payment = true
            await appointment.save()
            res.send({ success: true, message: "payment successfully" })
        }
        res.send({ success: false, message: "payment failed" })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

export { createUser, loginUser, verifyPayment, bookAppointment, findUser, updateProfile, allPatients, listAppointments, onlinePayment, cancelFeature, listAllAppointments }