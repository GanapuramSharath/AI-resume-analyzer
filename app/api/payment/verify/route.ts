import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { verifyPayment } from "@/services/payment/verify";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing payment information.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await verifyPayment({
      userId: session.user.id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Payment Verification Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed.",
      },
      {
        status: 500,
      },
    );
  }
}
