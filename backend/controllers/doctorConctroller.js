import doctormodel from "../models/doctorModel.js"
import { v2 as cloudinary } from "cloudinary"


const addDoctor = async (req, res) => {
    try {
        const { name,email,password,speciality,degree,address1,address2,fee,description,experience } = req.body
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
        res.send({ success: true, doctor})
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}
const listDoctor = async () => {

}


export { addDoctor, listDoctor }