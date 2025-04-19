import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
      const token= req.cookies.token;
    
        if(!token){
            return res.json(401).json({message:"Not Authenicated!"})
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ message: "Not valid token!" });
            }
            req.userId= payload.id;
            next();
           
        });
}