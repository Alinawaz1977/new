import jwt from "jsonwebtoken"

const adminAuth=(req,res,next)=>{
    const token= req.headers
    if(!token){
        res.send({success:false,message:"Invalid Credentials"})
    }
    const decodeToken= jwt.verify(token,process.env.SECRET)
    if(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD!==decodeToken){
        res.send({success:false,message:"Invalid Credentials"})
    }
    next()
}

export default adminAuth