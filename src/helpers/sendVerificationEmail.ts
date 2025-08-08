import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"

import { ApiResponse } from "@/types/ApiResponse"
import { success } from "zod/mini"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode:string
):Promise<ApiResponse> {
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Mystic Sourse',
        react:VerificationEmail({username,otp:verifyCode}),
        });
        return { success: true, message: 'verification email send successfully' };
    } catch (emailError) {
        console.error("Error sending verification Email", emailError)
        return { success: false, message: 'failed to send verification email' };
    }
}