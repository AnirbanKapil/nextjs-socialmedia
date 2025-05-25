import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const sendEmail = async({email,emailType,userId} : any){
    try {
        const hashToken = await bcrypt.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
           await User.findByIdAndUpdate(userId,{verifyToken : hashToken , verifyTokenExpiry : Date.now() + 3600000}) 
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken : hashToken , forgotPasswordTokenExpiry : Date.now() + 3600000})
        }

        const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
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
        
        const mailResponse = await transporter.sendEmail(mailOptions)
        return mailResponse
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}