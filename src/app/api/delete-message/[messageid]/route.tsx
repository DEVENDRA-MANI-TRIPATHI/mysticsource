import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    try {

        if (!params?.messageid) {
            return Response.json({
                success: false,
                message: "Message ID is required"
            }, { status: 400 });
        }
        
        const messageId = params.messageid;
        console.log("Attempting to delete message:", messageId);
        
        await dbConnect();

        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return Response.json({
                success: false,
                message: "Not Authenticated"
            }, { status: 401 });
        }

        // Find user by email from session
        const user = await UserModel.findOne({ email: session.user.email });
        
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const updatedResult = await UserModel.updateOne(
            { email: session.user.email },
            { $pull: { messages: { _id: messageId } } }
        );

        if (updatedResult.modifiedCount === 0) {
            return Response.json({
                success: false,
                message: "Message not found or already deleted"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully"
        }, { status: 200 }); // Changed from 401 to 200

    } catch (error) {
        console.error("Error while deleting message:", error);
        return Response.json({
            success: false,
            message: "Error deleting message"
        }, { status: 500 });
    }
}