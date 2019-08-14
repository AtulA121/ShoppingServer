var express=require("express");
var controllers=require("../controllers/controller");
var jwt=require("jsonwebtoken");
var router=express.Router();

router.get("/get",controllers.getRequest);
router.post("/register",controllers.registerUser);
// router.post("/register",verifyRegister,controllers.registerUser);  //only check for middleware response hitting or not
router.post("/login",controllers.loginUser);
router.get("/events",controllers.getEvents);
router.get("/specialEvents",verifyToken,controllers.getSpecailEvents);

module.exports=router;

function verifyRegister(req,res,next)
{
    console.log("------ verifyRegister... : ",req.headers);
    return res.status(401).send("unAuthorization request");
}

function verifyToken(req,res,next)
{
    console.log("verifyToken...",req.headers);
    
    if(!req.headers.authorization)
    {
        return res.status(401).send("unAuthorized request");
    }
    let token=req.headers.authorization.split(" ")[1];
    console.log("token : "+token);
    
    if(token==="null")
    {
        return res.status(401).send("unAuthorization request");
    }
    
    let payload=jwt.verify(token,"atulpisal.ap@gmail.com");
    console.log("payload : ",payload);
    
    if(!payload)
    {
        return res.status(401).send("unAuthorization request");
    }
    res.userId=payload.subject;
    next();
}