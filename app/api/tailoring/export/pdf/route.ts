import { NextRequest } from "next/server";
import { generateResumePDF } from "@/services/pdf/pdf.service";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return new Response("Missing id", {
        status: 400,
      });
    }

    const { buffer, fileName } = await generateResumePDF(id);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("Failed to generate PDF", {
      status: 500,
    });
  }
}
