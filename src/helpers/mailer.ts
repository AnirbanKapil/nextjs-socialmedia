import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const sendEmail = async({email,emailType,userId} : any) => {
    try {
        const hashToken = await bcrypt.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
           await User.findByIdAndUpdate(userId,{verifyToken : hashToken , verifyTokenExpiry : Date.now() + 3600000}) 
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken : hashToken , forgotPasswordTokenExpiry : Date.now() + 3600000})
        }

        const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "140d45df931d5f",
        pass: process.env.MAILTRAP_SECRET,
        }
        })

        const mailOptions = {
        from: 'rambo@email.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}"> here</a> to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"}
            or copy and paste the link below in your browser.<br/>${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`
        }
        
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}