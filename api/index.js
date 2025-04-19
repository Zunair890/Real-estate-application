import express from "express";
import authRoute from "./route/authRoute.js"
import postRoute from "./route/postRoute.js"
import cors from "cors";
const app= express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"http://localhost:5173",credentials:true}))
const PORT=4000;

// api endpoints

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
app.get("/",(req,res)=>{
    res.send("api working")
})
app.listen(PORT,()=>{
    console.log("Server is running! on port",PORT)
})