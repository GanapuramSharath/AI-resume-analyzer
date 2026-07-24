import { BorderStyle } from "docx";

import { DOCX } from "./constants";

export const ResumeStyles = {
  title: {
    bold: true,
    size: DOCX.TITLE_SIZE,
    color: DOCX.TEXT_COLOR,
  },

  contact: {
    size: DOCX.CONTACT_SIZE,
    color: DOCX.TEXT_COLOR,
  },

  sectionHeading: {
    heading: DOCX.SECTION_HEADING,
    color: DOCX.PRIMARY_COLOR,
    spacing: DOCX.SECTION_SPACING,

    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: DOCX.DIVIDER_COLOR,
      },
    },
  },

  paragraph: {
    size: DOCX.BODY_SIZE,
    color: DOCX.TEXT_COLOR,
    spacing: DOCX.PARAGRAPH_SPACING,
  },

  bullet: {
    size: DOCX.BODY_SIZE,
    spacing: DOCX.BULLET_SPACING,
  },

  projectTitle: {
    bold: true,
    size: DOCX.SUBTITLE_SIZE,
    color: DOCX.TEXT_COLOR,
  },

  companyTitle: {
    bold: true,
    size: DOCX.SUBTITLE_SIZE,
    color: DOCX.TEXT_COLOR,
  },

  degreeTitle: {
    bold: true,
    size: DOCX.SUBTITLE_SIZE,
    color: DOCX.TEXT_COLOR,
  },
};
