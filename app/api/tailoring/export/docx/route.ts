import { NextRequest } from "next/server";

import { generateResumeDOCX } from "@/services/docx/docx.service";

export async function GET(req: NextRequest) {
  try {
    //--------------------------------------------------------
    // Get Tailoring ID
    //--------------------------------------------------------

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return new Response("Missing id", {
        status: 400,
      });
    }

    //--------------------------------------------------------
    // Generate DOCX
    //--------------------------------------------------------

    const { buffer, fileName } = await generateResumeDOCX(id);

    //--------------------------------------------------------
    // Return File
    //--------------------------------------------------------

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      },
      {
        status: 500,
      },
    );
  }
}
