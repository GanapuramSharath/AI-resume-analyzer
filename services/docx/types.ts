import { Prisma } from "@/lib/generated/prisma";

export interface TailoringResult {
  tailoredResume?: Resume;
}

export interface Contact {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Skills {
  [category: string]: string[];
}

export interface Project {
  title: string;
  description?: string[];
  techStack?: string[];
}

export interface Experience {
  role: string;
  company?: string;
  duration?: string;
  description?: string[];
}

export interface Education {
  degree: string;
  college?: string;
  year?: string;
  cgpa?: string;
}

export interface Certification {
  name: string;
}

export interface Resume {
  contact?: Contact;

  summary?: string;
  skills?: Skills;
  projects?: Project[];
  experience?: Experience[];
  education?: Education[];
  certifications?: (string | Certification)[];
  achievements?: string[];
}

export type Tailoring = Prisma.ResumeTailoringGetPayload<{
  include: {
    resume: true;
  };
}>;
