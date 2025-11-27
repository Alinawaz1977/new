import mongoose from "mongoose";


const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("db connected ");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/doctor-app`)
    } catch (error) {
        console.log(error.message);
    }

}
export default connectDb