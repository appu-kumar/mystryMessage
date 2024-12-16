import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user:User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: true,
        message: "User Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accept messages",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("failed to update user status to accept messages", error);

    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: true,
        message: "User Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await userModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getting the status of the user acceptance", error);
    return Response.json(
      {
        success: false,
        message: "Error in Getting the status of the user acceptance",
      },
      { status: 500 }
    );
  }
}