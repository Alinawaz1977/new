import doctormodel from "../models/doctorModel.js"
import { v2 as cloudinary } from "cloudinary"


const addDoctor = async (req, res) => {
    try {
        const { name } = req.body
        const image = req.file
        
        console.log(image);
        

        const url = await cloudinary.uploader.upload(image.path, { resource_type: "image" })
        console.log(url);
        
        const doctor = await doctormodel.create({
            name,
            image: url.secure_url
        })
        res.send({ success: true, doctor})
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}
const listDoctor = async () => {

}


export { addDoctor, listDoctor }