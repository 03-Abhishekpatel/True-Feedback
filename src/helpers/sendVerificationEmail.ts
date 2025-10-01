import  resend  from "../lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { number } from "zod/v4";
export async function sendVerificationEmail(
        email: string,
        username: string,
        verifyCode: string): Promise<ApiResponse> {
            try {
                await resend.emails.send({
                    from: "Acme <onboarding@resend.dev>",
                    to: email,
                    subject: " anonimous feedback | Verification code ",
                    react: VerificationEmail({ username, otp: verifyCode })
                });
                return {
                    success: true,
                    message: "Verification email sent Successfully"
                }
            }
            catch(emailError){
                console.log("Error sending verification email", emailError);
                return {
                    success: false,
                    message: "Error sending verification email"
                }
            }
        } 
