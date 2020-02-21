var express=require("express");
var cors=require("cors");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var router=require("./routing/route");
var app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

mongoose.connect("mongodb://localhost:27017/shopping",(error,db)=>{
    if(error){
        console.log("not connectd...",error);
    }
    else{
        console.log("connected succesfully..."+db);
    }
});

app.listen(3000,()=>{
    console.log("server listen on 3000...");
});