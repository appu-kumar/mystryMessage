// import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import userModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  // No need to write response:Response because next.js is serverless framework, for response create your own response using new Response()
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await userModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: "Username is already taken",
      });
    }

    // first Time user is coming
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of the hashing
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // current hrs suppose 3pm adding 1, 4pm,  ye 4pm tak valid hoga
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const exisitingUserByEmail = await userModel.findOne({ email });

    if (exisitingUserByEmail) {
        if(exisitingUserByEmail.isVerified){
            return Response.json({
                success:false,
                message:"User is verified with email"
            },{status:400})
        }
       else{
           exisitingUserByEmail.password=hashedPassword;
           exisitingUserByEmail.verifyCode=verifyCode;
           exisitingUserByEmail.isVerified=true;
           exisitingUserByEmail.verifyCodeExpiry=expiryDate;
           await exisitingUserByEmail.save();
       }
    } else {
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    // on failure
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }

    // on success
    return Response.json(
      { success: true, message: "User register successfully, Please verify your email!" },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log("Registering error", error);

    // return new Response( // or Response.json({},{},...)
    //   JSON.stringify({ success: false, message: "Internal Server Error" }),
    //   { status: 500, headers: { "Content-Type": "application/json" } }
    // );

    return Response.json(
      { success: false, message: "Registering user error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
