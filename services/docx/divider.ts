import { Paragraph, BorderStyle } from "docx";

export function addDivider(children: Paragraph[]) {
  children.push(
    new Paragraph({
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 6,
          space: 1,
        },
      },
      spacing: {
        after: 250,
      },
    }),
  );
}
