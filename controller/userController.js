const asyncHandler=require("express-async-handler");
const UserDetails=require("../models/userModels")
const bCrypt=require("bcrypt")
const jwt=require("jsonwebtoken");


const registerUser=asyncHandler(async (req,res)=>{

const {username,email,password}=req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new error("Missing required details")
    }

    const userExists=await UserDetails.findOne({
        email
    })

    if(userExists)
    {
        res.status(400);
        throw new Error("Email already exists!")
    }

    //hash the password
const hashedPassword = await bCrypt.hash(password,10);

console.log("password is hashed : ",hashedPassword);


    const user=await UserDetails.create({
        username,
        email,
        password:hashedPassword
    })

    const userSavedDetails={
        username:user.username,
        email:user.email,
    }
    res.json(userSavedDetails)
}
);


const loginUser=asyncHandler(async (req,res)=>{

    const {email,password}=req.body;
console.log("email is",email);
console.log("password is",password);
    if(!email|| !password){
        res.status(401);
        throw new Error("Mandatory fields are empty")
    }

    const user=await UserDetails.findOne({email});

    if(!(user && await bCrypt.compare(password,user.password)))
    {
        res.status(401);
        throw new Error("Incorrect username and password ,please try again!")
    }


    const accessToken=jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        }
        ,
        process.env.ACCESS_TOKEN_KEY,
        {expiresIn:"15m"}
    )
    res.json({accessToken})
}
);

//private
const getCurrentUser=asyncHandler(async (req,res)=>{
    res.json(req.user)
}
);


module.exports={registerUser,loginUser,getCurrentUser}