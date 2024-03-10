const mongoose=require("mongoose");

const userSchema=mongoose.Schema({

   
username:{
    type:String,
    required:[true,"Please add user name"]
},
email:{
    type:String,
    required:[true,"Please add email"]
},
password:{
    type:String,
    required:[true,"Please add email"]
}},
{
    timestamp:true
}
)

module.exports=mongoose.model("userDetails",userSchema);