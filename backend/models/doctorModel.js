import mongoose from "mongoose";

const doctorschema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    // email: {
    //     type: String,
    //     require: true
    // },
    // password: {
    //     type: String,
    //     require: true
    // },
    // fee: {
    //     type: Number,
    //     require: true
    // },
    // experience: {
    //     require: true,
    //     type: String,
    // },
    // description: {
    //     require: true,
    //     type: String
    // },
    // speciality: {
    //     require: true,
    //     type: String
    // },
    // degree: {
    //     type: String,
    //     require: true
    // },
    image: {
        type: String,
        require: true
    },
    // address1: {
    //     type: String,
    //     require: true
    // },
    // address2: {
    //     type: String,
    //     require: true
    // }
})

const doctormodel = mongoose.models.doctor || mongoose.model("doctor", doctorschema)

export default doctormodel