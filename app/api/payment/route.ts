import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getRazorpay } from "@/lib/razorpay";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    // ₹499.00
    const amount = 49900;

 const razorpay = getRazorpay();

 const order = await razorpay.orders.create({
   amount,
   currency: "INR",
   receipt: `receipt_${Date.now()}`,
   notes: {
     userId: user.id,
     email: user.email ?? "",
   },
 });
    return NextResponse.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create order.",
      },
      {
        status: 500,
      },
    );
  }
}
