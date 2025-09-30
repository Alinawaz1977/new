import jwt from "jsonwebtoken"

const authUser = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            res.send({ success: false, message: "you need to login" })
        }
        const decode_Token = jwt.verify(token, process.env.SECRET)
        if (!decode_Token) {
            res.send({ success: false, message: "Invalid Credentials login again" })
        }
          req.body = req.body || {}; // ✅ Ensure it's initialized
        req.body.userid = decode_Token.id;
        next()

    } catch (error) {
        res.send({success:false,message:error.message})
    }
}

export default authUser