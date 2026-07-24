import PDFParser from "pdf2json";

export async function extractPdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        const lines: string[] = [];

        for (const page of pdfData.Pages) {
          for (const item of page.Texts) {
            const words = item.R.map((run: any) => {
              try {
                return decodeURIComponent(run.T);
              } catch {
                return run.T;
              }
            });

            lines.push(words.join(" "));
          }

          lines.push("");
        }

        resolve(lines.join("\n").trim());
      } catch (err) {
        reject(err);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}
