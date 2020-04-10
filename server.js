var express=require("express");
var cors=require("cors");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var router=require("./routing/route");

let swaggerJsDoc=require("swagger-jsdoc");
let swaggerUi=require("swagger-ui-express");
let swaggerFile=require("./swagger");
var app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

// const swaggerOptions = {
//     swaggerDefinition : {
//         info : {
//             title : "A121",
//             description : "A121",
//             contact : {
//                 name : "a121"
//             },
//             servers : ["http://localhost:3000"]
//         }
//     },
//     apis : ["server.js"]
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

/** 
 * @swagger 
 * /getData :
 *  post :
 *      description : use to update
 *      responses : 
 *          '200' : 
 *              description : A successfull response
*/
app.post("/getData",(req,res)=>{
    console.log("data : ",req.body.userName);
    res.status(200).send({
        result : "getData : "
    });
})



mongoose.connect("mongodb://localhost:27017/shopping",(error,db)=>{
    if(error){
        console.log("not connectd...",error);
    }
    else{
        console.log("connected to database..."+db);
    }
});

app.listen(3000,()=>{
    console.log("server listen on 3000...");
});
