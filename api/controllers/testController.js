import jwt from "jsonwebtoken";

export const shouldBeLoggedIn=async(req,res)=>{
    console.log(req.userId)
   res.status(200).json({message:"You are Autheniated"})
}

export const shouldBeAdmin=async(req,res)=>{
    const token= req.cookies.token;

    if(!token){
        return res.json(401).json({message:"Not Authenicated!"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Not valid token!" });
        }
       if (!payload.isAdmin){
        return res.status(403).json({message:"Not Authorized"});

       }
    });
    res.status(200).json({message:"You are Autheniated"})
}