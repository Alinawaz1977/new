import jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        res.send({ success: false, message: "Invalid token wrong" })
    }
    const decodeToken = jwt.verify(token, process.env.SECRET)
    console.log(decodeToken);

    if (process.env.ADMIN_EMAIL !== decodeToken.email && process.env.ADMIN_PASSWORD !== decodeToken) {
       return res.send({ success: false, message: "Invalid Credentials" })
    }
    next()
}

export default adminAuth