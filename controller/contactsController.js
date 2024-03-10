const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModels")

//@desc:get contacts
//@endpoint:/api/contacts
//@access:public
const getContacts=asyncHandler(async (req,res)=>{
    console.log("your user id is ",req.user.id);
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
});


//@desc:get single contact
//@endpoint:/api/contacts/:id
//@access:public
const getContactWithId=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    res.status(200).json(contact)
});

//@desc:post contact contents
//@endpoint:/api/contacts/:id
//@access:public
const createContact=asyncHandler(async (req,res)=>{
    console.log(`we have received the following Body ${req.body}`);
    const {name,email,phno}=req.body;
    if(!name || !email || !phno){
        res.status(400);
        throw new Error("All fields are mandotory!")
    }

    const contact=await Contact.create({
        user_id:req.user.id,
        name,
        email,
        phno
    });

    if(!contact){
        res.status(400);
        throw new Error("Encountered error while creating data in DB")
    }
    res.status(201).json(contact)
});


//@desc:put contacts
//@endpoint:/api/contacts/:id
//@access:public
const putContacts=asyncHandler(async (req,res)=>{

    const contact=await Contact.findById(req.params.id);

    if(!contact){
        res.status(400);
        throw new Error("Contact to Update not found")
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permissions")  
      }


    const updateContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateContact)
});


//@desc:Delete contact
//@endpoint:/api/contacts/:id
//@access:public
const deleteContact=asyncHandler(async (req,res)=>{

    console.log("the user Id is ",req.params.id);
    const contact=await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permissions")  
      }


   await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact)
});




module.exports={getContacts,getContactWithId,createContact,putContacts,deleteContact};