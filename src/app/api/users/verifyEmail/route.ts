import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



export async function POST (request : NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({verifyToken : token ,
            verifyTokenExpiry : {$gt : Date.now()}
        })
        if(!user){
            throw new Error("Invalid token")
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        return NextResponse.json({
            message : "Email verified successfully",
            success : true
        })
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}