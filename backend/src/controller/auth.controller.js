import User from "../models/user.model";
import jwt from "jsonwebtoken"
import expressJwt from "express-jwt";
import config from "./../../config/config"

const signIn = (req,res) =>{
User.findOne({"name": req.body.name},(err,user) =>{
    if(err || !user){
        return res.status("401").json({
            error: "User not found"
        })
    }
    if(!user.authenticate(req.body.password)){
        return res.status("401").send({
            error: "Name and password dont match"
        })
    }
    const token = jwt.sign({_id: user._id},config.jwtSecret)
    res.cookie("t",token,{
        expire: new Date() + 9999
    })
    return res.status(200).json({
        token,
        user: {_id: user._id,name:user.name,email:user.email}
    })
})
}

const signOut = (req,res) =>{
    res.clearCookie("t")
    return res.status("200").json({
        message: "signed out"
    })
}

export default {signIn,signOut}