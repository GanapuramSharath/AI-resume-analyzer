import { Paragraph, HeadingLevel } from "docx";

export function addHeading(children: Paragraph[], text: string) {
  children.push(
    new Paragraph({
      text,
      heading: HeadingLevel.HEADING_1,
      spacing: {
        before: 300,
        after: 150,
      },
    }),
  );
}

export function addBullet(children: Paragraph[], text: string) {
  children.push(
    new Paragraph({
      text,
      bullet: {
        level: 0,
      },
    }),
  );
}
