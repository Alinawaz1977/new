import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
        require:true,
        type:String,
    },
    image:{
        require:true,
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
    age:{
        require:true,
        type:Number
    },
    gender:{
        require:true,
        type:String
    }
})

const userModel= mongoose.models || mongoose.model("user",userSchema)

export default userModel