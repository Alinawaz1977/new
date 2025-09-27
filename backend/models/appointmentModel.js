import mongoose from "mongoose";

const appointmentSchema= new mongoose.Schema({
    userid:{
        type:String,require:true
    },
    doctid:{
        type:String,require:true
    },
    slotDate:{
        type:String,require:true
    },
    slotTime:{
        type:String,require:true
    },
    userData:{
        type:Object,require:true
    },
    docData:{
        type:Object,require:true
    },
    amount:{
        type:Number,require:true
    },
    isCompleted:{
        type:String,default:false
    },
    cancelled:{
        type:Boolean,default:false
    },
    payment:{
        type:Boolean,default:false
    },
    date:{
        type:Number,require:true
    }

})

const appointmentModel= mongoose.models.appointments || mongoose.model("appointment",appointmentSchema)
export default appointmentModel