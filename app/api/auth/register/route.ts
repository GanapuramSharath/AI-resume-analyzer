import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrpt";
import { signIn } from "next-auth/react";
export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 },
    );
  }
}
