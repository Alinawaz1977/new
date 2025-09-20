import jwt from "jsonwebtoken"
const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET)
}
export default createToken