import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request:Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
  
    const user:User = session?.user as User;
  
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "User Not Authenticated",
        },
        { status: 401 }
      );
    }
  
     // id is in string convert it into the mongodb Id in aggregation 
    const userId = new mongoose.Types.ObjectId(user._id);

    try{
         const user = await userModel.aggregate([
            {$match:{id:userId}},
            {$unwind:'$messages'},
            {$sort: {'messages.createdAt':-1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ])

        if(!user || user.length === 0){
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 401 }
              );
        }

        return Response.json(
            {
              success: true,
              messages:user[0].messages,
            },
            { status: 200 }
          );
    }
    catch(error){
  
        console.log("An unexpected error occured: ", error)
        return Response.json(
            {
              success: false,
              messages:"Getting the error while fetching the user"
            },
            { status: 500}
          );
    }
}