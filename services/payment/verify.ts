import crypto from "crypto";
import { prisma } from "@/lib/prisma";

interface VerifyPaymentInput {
  userId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function verifyPayment({
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: VerifyPaymentInput) {
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Invalid payment signature.");
  }

  const currentPeriodEnd = new Date();
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: "PRO",
      subscriptionStatus: "ACTIVE",
      paymentSubscriptionId: razorpay_payment_id,
      currentPeriodEnd,
    },
  });

  return {
    success: true,
  };
}
