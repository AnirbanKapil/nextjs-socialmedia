import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

connectDB()

export async function POST (request : NextRequest) {
      try {
        const reqBody = await request.json();
        const  {email,password} = reqBody;
        if(!email && !password){
            return NextResponse.json(
                {message : "Email and password cannot be empty"},
                {status : 400}
            )}
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
              {error : "No user found"},
              {status : 401}
            )
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json(
              {error : "Invalid password"},
              {status : 401}
            )
        }
        const tokenData = {
            id : user._id,
            email : user.email,
            username : user.username
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn : "1d"})

        const response = NextResponse.json(
            {message : "Login successful"},
            {status : 200}
        )
        
        response.cookies.set("token",token,{httpOnly : true})

        return response

      } catch (error : any) {
        return NextResponse.json({
            message : error?.message,
            status : 500
        })
      }
}

