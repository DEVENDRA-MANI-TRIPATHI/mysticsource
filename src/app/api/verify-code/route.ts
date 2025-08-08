import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";


export async function POST(request: Request) {
    await dbConnect();


    try {

        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username)

        console.log(code);
        
        const user = await UserModel.findOne({ username: decodedUsername })
        
        if (!user) {
            return Response.json({
            success: false,
            message:"User not Found"
            },{status:500})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save();

            return Response.json(
                {
                    success: true,
                    message:"User Verified"
                },
                { status: 200 })
        }
        if (!isCodeValid) {
            return Response.json({
            success: false,
            message:"Verification code is not Valid"
            },{status:400})
        }
        if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message:"Verification code has expired. Please sign-in again to get a new code"
                },{status:400})
        }
        
    } catch (error) {
        console.error("Error while verifing OTP")

        return Response.json({
            success: false,
            message:"Error while verifing OTP"
        },{status:500})
    }
}