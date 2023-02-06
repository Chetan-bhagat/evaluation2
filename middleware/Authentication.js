var jwt = require('jsonwebtoken');
const fs=require("fs");
const  Authentication=(req,res,next)=>{
    const payload = req.body;
    let token=req.headers.token
    let datall=JSON.parse(fs.readFileSync("./blacklist.json","utf8")) || [];
    let flag="yes";
    for(let i=0;i<datall.length;i++){
        if(token==datall[i]){
            flag="no"
        }
    }
    if(flag=="no"){
        return res.send("token blacklisted")
    }
    if (token) {
        var decoded = jwt.verify(token,"normaltoken");
        if (decoded) {
            next() 
        }
        else {
            res.send("Token Failed")
        }
    } else {
        res.send("Provide tokens")
    }
};
const Authorisation=(req,res,next)=>{
    var decoded = jwt.verify(token,"normaltoken");
    if(decoded.Role=="manager"){
        next()
    }else{
        res.send("you are not Authorisation")
    }
}
module.exports={Authentication,Authorisation }
