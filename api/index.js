import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./route/authRoute.js"
import postRoute from "./route/postRoute.js"
import testRoute from "./route/testRoute.js"
import userRoute from "./route/userRoute.js"
const app= express();
dotenv.config()
// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT=4000;

// api endpoints

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute);
app.use("/api/users",userRoute);
app.get("/",(req,res)=>{
    res.send("api working")
})
app.listen(PORT,()=>{
    console.log("Server is running! on port",PORT)
})