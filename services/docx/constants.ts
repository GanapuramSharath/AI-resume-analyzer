import { HeadingLevel } from "docx";

export const DOCX = {
  // Font Sizes
  TITLE_SIZE: 48, // 24 pt
  CONTACT_SIZE: 20, // 10 pt
  SECTION_SIZE: 28, // 14 pt
  SUBTITLE_SIZE: 24, // 12 pt
  BODY_SIZE: 22, // 11 pt

  // Heading
  SECTION_HEADING: HeadingLevel.HEADING_1,

  // Colors
  PRIMARY_COLOR: "2F5597",
  TEXT_COLOR: "000000",
  DIVIDER_COLOR: "D9D9D9",

  // Page Margins
  PAGE_MARGIN: {
    top: 500,
    bottom: 500,
    left: 700,
    right: 700,
  },

  // Spacing
  TITLE_SPACING: {
    after: 120,
  },

  CONTACT_SPACING: {
    after: 180,
  },

  SECTION_SPACING: {
    before: 180,
    after: 100,
  },

  PARAGRAPH_SPACING: {
    after: 50,
  },

  BULLET_SPACING: {
    after: 10,
  },
} as const;
