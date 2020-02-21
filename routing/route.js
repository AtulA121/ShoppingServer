var express=require("express");
var controllers=require("../controllers/controller");
var jwt=require("jsonwebtoken");
var router=express.Router();
var constants=require("../service/constants");

router.get("/get",controllers.getRequest);
router.get("/getData",controllers.getRequestData);
router.post("/register",controllers.registerUser);
// router.post("/register",verifyRegister,controllers.registerUser);  //only check for middleware response hitting or not
router.post("/login",controllers.loginUser);
router.get("/events",controllers.getEvents);
router.get("/specialEvents",verifyToken,controllers.getSpecailEvents);

module.exports=router;

function verifyRegister(req,res,next){
    console.log("------ verifyRegister... : ",req.headers);
    return res.status(401).send("unAuthorization request");
}

function verifyToken(req,res,next){    
    if(!req.headers.authorization){
        return res.status(401).send("unAuthorized request");
    }
    let token=req.headers.authorization.split(" ")[1];
    console.log("token : "+token);
    
    if(token==="null"){
        return res.status(401).send("unAuthorization request");
    }
    
    let payload=jwt.verify(token,constants.key);
    
    if(!payload){
        return res.status(401).send("unAuthorization request");
    }
    res.userId=payload.subject;
    next();
}