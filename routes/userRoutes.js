const express=require("express");
const router=express.Router();
const validateWebToken=require("../middleware/validateTokenHandler")

const {registerUser,loginUser,getCurrentUser}=require("../controller/userController")


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/current",validateWebToken,getCurrentUser);



module.exports=router;