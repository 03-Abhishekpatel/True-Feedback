import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request){
    await dbConnect();

    try{
        const {username, email, password} = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username, 
            isVerified: true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "User with this username already exists"
            },{status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "user is the resgistered with this email already exists"
                },{status: 400});
            }
            else{
                //update the exisiting user with new details
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.password = hashedPassword;
                await existingUserByEmail.save();
            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false
            })
            
            await newUser.save();
        }


        //sent verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            password
        )
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status: 500});
        }

        return Response.json({
            success: true,
            message: "User registered successfully. Verification email sent"
        },{status: 201});
    }
    catch(error){
        console.log("Error in Sign up route", error);
        return Response.json({
            success: false,
            message: "Error registering user"
        },{
            status: 500
        })
    }
}