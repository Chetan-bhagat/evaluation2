const express=require("express");
const connection=require("./config/db");


const app=express();

const {route}=require("./Routers/register.route")

app.use("/",route)

app.listen(9168,async()=>{
    try{
        await connection;
        console.log("connected to database")
    }catch(err){
        console.log("error",err)
    }
    console.log("Server 9168 is running")
})