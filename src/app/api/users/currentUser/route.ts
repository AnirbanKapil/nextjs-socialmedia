
import { connectDB } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



connectDB()

export async function GET (request : NextRequest) {
    try {
        const tokenId = await getTokenData(request)
        const user = await User.findOne({_id:tokenId}).select("-password")
        return NextResponse.json({
            message : "User found !",
            data : user
        })
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}