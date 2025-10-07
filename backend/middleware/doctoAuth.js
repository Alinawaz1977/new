import jwt from "jsonwebtoken"
const docAuth = (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
           return res.send({ success: false, message: "Invalid credentials" })
        }
        const decodeToken = jwt.verify(token, process.env.SECRET)
        req.body=req.body || {}
        req.body.docid=decodeToken.id
        next()
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

export default docAuth