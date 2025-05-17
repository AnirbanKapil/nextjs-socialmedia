import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST (request : NextRequest) {
    try {
        const reqBody = await request.json;
        const {username,email,password} = reqBody;
        if(!username || !email || !password){
         return NextResponse.json({
            message : "All the fields are required !!"
         },{status : 400}
         )
        };
        
        const existedUser = await User.findOne({email});
        if(existedUser){
            return NextResponse.json(
                {message : "User already exist"},
                {status : 400}
            )
        };
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            username,
            password : hashedPassword
        })
        const savedUser = await newUser.save()
        
        return NextResponse.json({
            message : "User created successfully",
            status : 200,
            savedUser
        }
        )

    } catch (error : any) {
        return NextResponse.json(
            {error : error.message},
            {status : 500} 
        )
    }
}