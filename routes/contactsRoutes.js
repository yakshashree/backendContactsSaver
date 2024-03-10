const express=require("express");
const router=express.Router();
const validateToken=require("../middleware/validateTokenHandler");

const {getContacts,getContactWithId,createContact,deleteContact,putContacts}=require("../controller/contactsController");

//using middleware to validate opn all CRUD 
router.use(validateToken);

//get 
router.route("/").get(getContacts).post(createContact);

//get id contact
router.route("/:id").get(getContactWithId).delete(deleteContact).put(putContacts);




module.exports=router;
