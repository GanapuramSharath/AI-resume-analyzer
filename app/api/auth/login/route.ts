import { NextResponse } from "next/server";
import { login } from "@/services/login.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await login(body);

    // create session here

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 401 },
    );
  }
}
