const express=require("express");
const {registermodule}=require("../config/db");
const fs=require("fs")
const app=express();
const route=express.Router();
route.use(express.json())
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {Authentication,Authorisation }=require("../middleware/Authentication")
route.get("/",(req,res)=>{
    res.send("welcome")
});
route.post("/register", async (req, res) => {
    const load = req.body;
    try {
        bcrypt.hash(load.Password, 3, async (err, hash) => {
            load.Password = hash;
            // console.log("load2",hash)
            if (hash) {
                // console.log(load)
                const add = await new registermodule(load);
                 await add.save()
                const Allregister = await registermodule.find();
                await res.send(Allregister);
            } else {
                res.send("error  hashing")
            }
        });

    } catch (err) {
        res.send(err)
    }
});

route.post("/login", async (req, res) => {
    const {Email,Password} = req.body;
    try {
       let one=await registermodule.findOne({Email});
       console.log(one)
       bcrypt.compare(Password, one.Password, function(err, result) {
       if(result){
        let noramltoken = jwt.sign({ "Role":one.Role}, "normaltoken",{expiresIn:60})
        let refreshtoken = jwt.sign({"Role":one.Role}, "refreshtoken",{expiresIn:300})

        res.send({
            "token":noramltoken,
            "refreshtoken":refreshtoken
        })
       }else{
        res.send("error")
       }
      });

    } catch (err) {
        res.send(err)
    }
});
route.post("/logout", async (req, res) => {
   const token=req.headers.token || "";
   crossOriginIsolated.log(token)
    const data= JSON.parse(fs.readFileSync("./blacklist.json",'utf8')) ||[];
    data.push(token);
    fs.writeFileSync("/blacklist.json",`${JSON.stringify(data)}`)
    res.sendFile("logout");

});
route.get("/refreshtoken",(req,res)=>{
    const refreshtoken=req.headers.token
    var decoded = jwt.verify(refreshtoken,"refreshtoken");
    if(decoded){
        let token = jwt.sign({ Role:decoded.Role}, "normaltoken",{expiresIn:60});

        res.send(token)
    }else {
    res.send("login onceagain")
    }
});
route.get("/goldrate",Authentication , async (req, res) => {
   
 res.send("goldrate data")
 });
 route.get("/userstats",Authentication,Authorisation  , async (req, res) => {
   
    
    res.send("userstats data")
 });


module.exports={
    route
}