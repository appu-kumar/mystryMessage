import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){

    // if(request.method !== 'GET'){    // used in legacy next.js now no need of this
    //     return Response.json({
    //         success: false,
    //         message: 'Method not allowed',
    //     },{status:405})
    // }

    await dbConnect();

    try{
       const {searchParams} = new URL(request.url);
       const queryParam = {
        username:searchParams.get('username'),
       }

       // validate with zod
       const result = UsernameQuerySchema.safeParse(queryParam);
       // log the result vvimp

       if(!result.success){
        const usernameErrors = result.error.format().username?._errors || [];
        return Response.json({
            success:false,
            message:usernameErrors?.length>0?usernameErrors.join(''):'Invalid query parameter'
        },{
            status:400
        })
       }

       const {username} = result.data;

       const existingVerifiedUser = await userModel.findOne({username,isVerified:true})
       
       if(existingVerifiedUser){
        return Response.json({
            success:false,
            message: 'Username is already taken',
        },{status:400})
       }


       return Response.json({
        success:true,
        message: 'Username is available',
    },{status:201})

    }
    catch(error){
        console.log("Error checking username", error)
        return Response.json({
            success:false,
            message:"Error checking username"
        },{
            status:500
        })
    }
}