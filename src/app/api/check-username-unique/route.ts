
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = searchParams.get("username");

    const result = UsernameQuerySchema.safeParse({ username: queryParams });

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            usernameError.length > 0
              ? usernameError.join(", ")
              : "Invalid username query parameter",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    console.log("Checking username:", username, existingUser);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 409 } // conflict is better than 405
      );
    }

    return NextResponse.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    return NextResponse.json(
      { success: false, message: "Error checking username uniqueness" },
      { status: 500 }
    );
  }
}
