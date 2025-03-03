const ConnectString=require("mongoose")
const URI = process.env.MONGODB_URI;
const ConnectDb=async()=>{
  await ConnectString.connect(URI);
   console.log("connected.....");
}
module.exports=ConnectDb