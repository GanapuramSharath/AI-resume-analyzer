import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { parseResume } from "@/services/resume-parser.service";
import { structureResume } from "@/services/resume-structure.service";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "sample", "resume.txt");

    const resumeText = fs.readFileSync(filePath, "utf8");

    const parsed = parseResume(resumeText);

    const structured = structureResume(parsed);

    console.log("================ PARSED ================");
    console.log(parsed);

    console.log("================ STRUCTURED ================");
    console.log(JSON.stringify(structured, null, 2));

    return NextResponse.json(structured);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      },
    );
  }
}
