import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import UserModel from "@/model/user";
import {User} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";



export async function POST(request: Request){
    await dbConnect();
    try{
        const session = await getServerSession(authOptions);
        const user: User = session?.user as User;

        if(!session || !session.user){
            return Response.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }
  

        const userId = user._id;
        const {acceptingMessages} = await request.json();

        try{
            const updatedUser = await UserModel.findByIdAndUpdate(userId, 
                {isAcceptingMessages:acceptingMessages}, 
                {new: true});

            if(!updatedUser){
                return Response.json({
                    success: false,
                    message: "User not found"
                }, { status: 404 });
            }

            return Response.json({
                success: true,
                message: "Message preference updated",
                updatedUser 
            }, { status: 200 });
        }
        catch(error){
            console.error("Error parsing request body:", error);
            return Response.json({
                success: false,
                message: "Invalid request body"
            }, { status: 400 });
        }


    }catch(error){
        console.error("Error accepting messages:", error);
        return Response.json(
            { success: false, message: "Error accepting messages" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
        const user: User = session?.user;

        if(!session || !session.user){
            return Response.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }
        const userId = user._id;

        try{
            const foundUser = await UserModel.findById(userId);
            if(!foundUser){
                return Response.json({
                    success: false,
                    message: "User not found"
                }, { status: 404 });
            }

            return Response.json({
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessages
            }, { status: 200 });
        }catch(error){
            console.error("Error fetching user:", error);
            return Response.json({
                success: false,
                message: "Error fetching user"
            }, { status: 500 });
        }

}