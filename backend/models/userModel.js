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
    age:{
        type:Number
    },
    gender:{
        type:String
    }
})

const userModel= mongoose.models.user || mongoose.model("user",userSchema)

export default userModel