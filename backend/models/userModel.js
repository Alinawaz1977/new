import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
        require:true,
        type:String,
    },
    image:{
        type:String
    },
    email:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    },
    dob:{
        type:Number
    },
    gender:{
        type:String
    },
    phone:{
        type:Number
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    }
})

const userModel= mongoose.models.user || mongoose.model("user",userSchema)

export default userModel