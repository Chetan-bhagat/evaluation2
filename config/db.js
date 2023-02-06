const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://chetanbhagat:chetan@cluster0.lkj8w.mongodb.net/Evaluation2?retryWrites=true&w=majority")


const registerschema=mongoose.Schema({
    "Name":String,
    "Email":String,
    "Password":String,
    "Role":String
})


const registermodule=mongoose.model("register",registerschema);

module.exports={connection,registermodule}