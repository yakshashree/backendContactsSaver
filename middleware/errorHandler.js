
const {errorCode}=require("../constants");
const errorHandler=(err,req,res,next)=>{

    const statusCode=res.statusCode?res.statusCode:500;

    // BAD_REQUEST: 400,
    // UNAUTHORIZED: 401,
    // PAYMENT_REQUIRED: 402,
    // FORBIDDEN: 403,
    // NOT_FOUND: 404

    switch(statusCode)
    {
        case errorCode.BAD_REQUEST:
            res.json({
                title:"errorCode.BAD_REQUEST",
                message:err.message,
                stackTrace:err.stack});
                break; 
        case errorCode.UNAUTHORIZED:
            res.json({title:"errorCode.UNAUTHORIZED",
                message:err.message,
                stackTrace:err.stack});
                break;
        case errorCode.PAYMENT_REQUIRED:
            res.json({title:"errorCode.PAYMENT_REQUIRED",
                message:err.message,
                stackTrace:err.stack});
                break;
        case errorCode.FORBIDDEN:
            res.json({title:"errorCode.FORBIDDEN",
                message:err.message,
                stackTrace:err.stack});
                break;
        case errorCode.NOT_FOUND:
            res.json({title:"errorCode.NOT_FOUND",
                message:err.message,
                stackTrace:err.stack});
                break;
        default:
            console.log("All good going great!");
            break;
    }

}

module.exports=errorHandler;