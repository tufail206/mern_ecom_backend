require("dotenv").config()
const express=require("express");
const app=express()
const cors = require("cors");
const userRoutes= require("./routes/user-routes")
const ErrorMiddleware  = require("./middlewares/Error-middleware");
const ConnectDb = require("./configs/dbConnection");
const cors_credentials = {
  origin:"https://mern-ecom-chi.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "HEAD", "OPTIONS"],
};

app.use(cors(cors_credentials));
app.use(express.json());
app.use("/api/v1",userRoutes);


app.use(ErrorMiddleware);
ConnectDb().then(()=>{
    
app.listen(5000,()=>{
    console.log("app is listening on port 5000");
})
}).catch((err)=>{
     console.log("connection failed",err);
     process.exit(0)
})
