const mongoose=require("mongoose");
const constants=require("../constants")



const connectDB=async ()=>{
    try{
        console.log("printing the connection string"+process.env.CONNECTION_STRING);

        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Established Db connection with : "+connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB;