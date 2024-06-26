import { setThePassword } from "whatwg-url";
import Users from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup=async(req,res,next) => {
    const {username,email,password}=req.body;

    if(!username || !email || !password || username===' ' || email===' ' || password === ' '){
    
      next(errorHandler(500,"All fields are required"))
    }

    const hashedPassword= bcryptjs.hashSync(password,10)

    const newUser=new Users({
    username:username,
    email:email,
    password:hashedPassword
    })
    try{
    await newUser.save();
    res.json({message:"sucessfully signed up"})
    }catch(error){
        next(error)
    }
}