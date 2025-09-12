import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminUser = (req,res) => {
    try {
        const { email, password } = req.body
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.SECRET)
            res.send({success:true,token})
        }
        res.send({success:false,message:"Invalid Credentials"})

    } catch (error) {
        res.send({success:false,message:error.message})
    }
}

export default adminUser