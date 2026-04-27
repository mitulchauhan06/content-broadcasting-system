import jwt from "jsonwebtoken";

export const verifyToken= (req , res , next) => {

    const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }


    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "No token provided"});
    
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
         console.log("DECODED USER:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});
    }
}



export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};