const mongoose=require("mongoose");
const bcrypt =require('bcrypt')
const Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let UserSchema =new Schema(
{
    name:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
   email:{
        type: String,
       // required: true,
        min: 1,
        max: 255
    },
    username:{
        type: String,
        required: true,
        unique:true,
        min: 1,
        max: 255
    },
    phonenumber:{
        type: String,
        required: true,
        min: 8,
        max: 8
    },
    password:{  
        type: String,
        required: true,
    },
    projectId:[{
        type: mongoose.Schema.ObjectId,
        ref:'Project',
        default:[]
    }],
    admin:{
        type: Boolean,
        default:false
    }
    
}
);
UserSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports=mongoose.model("User",UserSchema);