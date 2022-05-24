const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let TaskSchema =new Schema(
{
    name:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    description:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    creatorId:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: true,
    },
    projectId:{
        type: mongoose.Schema.ObjectId,
        ref:'Project',
        required: true
    },
    creationDate:{
        type: Date,
        default:Date.now
    },
    endDate:{
        type: Date
    }
}   
);
module.exports=mongoose.model("Task",TaskSchema);