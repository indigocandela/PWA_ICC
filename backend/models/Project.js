const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const tasks=require('./Task');

let ProjectSchema =new Schema(
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
    task:{
        type: [mongoose.Schema.ObjectId],
        ref:'Task',
        default:[]
    },
    creationDate:{
        type: Date,
        default:Date.now
    }
}   
);
module.exports=mongoose.model("Project",ProjectSchema);