import userModel from "../models/userModel.js"
import bcrypt, { hash } from "bcrypt"
import createtoken from "../utils/userToken.js"

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
        res.send({ success: true, message: "user created" })
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
        res.send({ success: true, token,user})
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }

}

export { createUser, loginUser }