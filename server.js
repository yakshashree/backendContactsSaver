const express=require("express");
const dotenv=require("dotenv").config();
const app=express();
const connectDB=require("./config/dbConnection")

const errorHandler=require("./middleware/errorHandler")

const port=process.env.PORT || 5000;
//These are middlewares
app.use(express.json())//used for converting web data to json format dasta




app.use("/api/contacts",require("./routes/contactsRoutes"))//used for controller

app.use("/api/users",require("./routes/userRoutes"))//used for controller

app.use(errorHandler);//used for custom error handling


//connection to DB
connectDB();



app.listen(port,()=>{
    console.log(`i am listening in ${port} port`);
})