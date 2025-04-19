import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register=async(req,res)=>{
    try {
        const {username,email,password}= req.body;
        console.log(req.body)
        // Validate required fields
        if(!username || !email || !password) {
            return res.status(400).json({message: "Username, email and password are required"});
        }

        const hashedPassword= await bcrypt.hash(password,10);

        // create a new user and save to DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        console.log(newUser);
        res.status(201).json({message: "User created successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"User not created"})
    }
}



export const login=async(req,res)=>{
   const {username, password}= req.body;
   try {
       const user= await prisma.user.findUnique({
        where:{username},
       });
       if(!user){
        return res.status(400).json({message:"Invalid cerdentials"})
       }

       // check if password is correct
        
       const isPasswordValid= await bcrypt.compare(password,user.password);
       if(!isPasswordValid){
        return res.json({message:"Invalid credentials"});

       }
      
       // generate cookie token and send to the user

       const token= jwt.sign({
        id:user.id,
        isAdmin:true,
       },
    process.env.JWT_SECRET,
{expiresIn: 1000 * 60*60 *24 *7})

     const {password: userPassword, ...userInfo}= user;
   
    
     res.cookie("token",token,{
        httpOnly: true,
        secure:true,
        
     }).
     status(200)
     .json(userInfo)
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login!" });
   }
}
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };  