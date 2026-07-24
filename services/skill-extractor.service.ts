import { StructuredResume } from "./resume-structure.service";

//--------------------------------------------------------
// Skill Aliases
//--------------------------------------------------------

const SKILL_ALIASES: Record<string, string> = {
  "react.js": "React",
  reactjs: "React",
  react: "React",

  "next.js": "Next.js",
  nextjs: "Next.js",

  javascript: "JavaScript",
  js: "JavaScript",

  typescript: "TypeScript",
  ts: "TypeScript",

  node: "Node.js",
  nodejs: "Node.js",

  expressjs: "Express",
  express: "Express",

  mongodb: "MongoDB",

  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",

  mysql: "MySQL",

  html5: "HTML",
  css3: "CSS",

  aws: "AWS",

  gcp: "GCP",

  azure: "Azure",

  docker: "Docker",

  kubernetes: "Kubernetes",

  git: "Git",

  github: "GitHub",

  prisma: "Prisma",

  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",

  redux: "Redux",

  rest: "REST API",
  "rest api": "REST API",
  restapi: "REST API",

  graphql: "GraphQL",

  rag: "RAG",

  langchain: "LangChain",

  llamaindex: "LlamaIndex",

  ollama: "Ollama",

  openai: "OpenAI",

  vector: "Vector Database",

  chroma: "ChromaDB",

  pinecone: "Pinecone",

  weaviate: "Weaviate",

  faiss: "FAISS",

  embedding: "Embeddings",
  embeddings: "Embeddings",

  llm: "LLM",
  llms: "LLM",

  python: "Python",

  java: "Java",

  spring: "Spring Boot",
  springboot: "Spring Boot",

  c: "C",

  cpp: "C++",
  "c++": "C++",

  csharp: "C#",

  ".net": ".NET",

  linux: "Linux",

  oop: "OOP",

  dsa: "DSA",

  sql: "SQL",

  firebase: "Firebase",

  supabase: "Supabase",

  jwt: "JWT",

  bcrypt: "bcrypt",

  vite: "Vite",

  webpack: "Webpack",

  figma: "Figma",

  postman: "Postman",
};

//--------------------------------------------------------
// Normalize Skill Name
//--------------------------------------------------------

export function normalizeSkill(skill: string): string {
  const key = skill.trim().toLowerCase();

  return SKILL_ALIASES[key] ?? skill.trim();
}
//--------------------------------------------------------
// Extract Skills from Structured Resume
//--------------------------------------------------------

export function extractResumeSkills(structured: StructuredResume): string[] {
  if (!structured?.skills) {
    return [];
  }

  const found = new Set<string>();

  function add(skills: string[]) {
    for (const skill of skills) {
      found.add(normalizeSkill(skill));
    }
  }

  //--------------------------------------------------------
  // Skills Section
  //--------------------------------------------------------

  add(structured.skills.languages);
  add(structured.skills.frameworks);
  add(structured.skills.libraries);
  add(structured.skills.databases);
  add(structured.skills.cloud);
  add(structured.skills.tools);
  add(structured.skills.concepts);
  add(structured.skills.other);

  //--------------------------------------------------------
  // Project Tech Stack
  //--------------------------------------------------------

  for (const project of structured.projects) {
    add(project.techStack);
  }

  //--------------------------------------------------------
  // Experience Descriptions
  //--------------------------------------------------------

  for (const experience of structured.experience) {
    for (const description of experience.description) {
      for (const alias of Object.keys(SKILL_ALIASES)) {
        const regex = new RegExp(
          `\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "i",
        );

        if (regex.test(description)) {
          found.add(SKILL_ALIASES[alias]);
        }
      }
    }
  }

  //--------------------------------------------------------
  // Certifications
  //--------------------------------------------------------

  for (const certification of structured.certifications) {
    found.add(normalizeSkill(certification));
  }

  //--------------------------------------------------------
  // Summary
  //--------------------------------------------------------

  for (const alias of Object.keys(SKILL_ALIASES)) {
    const regex = new RegExp(
      `\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i",
    );

    if (regex.test(structured.summary)) {
      found.add(SKILL_ALIASES[alias]);
    }
  }

  return [...found].sort();
}
//--------------------------------------------------------
// Extract Skills from Job Description
//--------------------------------------------------------

export function extractJobSkills(
  jobDescription: string,
): string[] {
  const found = new Set<string>();

  const lower = jobDescription.toLowerCase();

  for (const alias of Object.keys(SKILL_ALIASES)) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b${escaped}\\b`, "i");

    if (regex.test(lower)) {
      found.add(SKILL_ALIASES[alias]);
    }
  }

  return [...new Set(found)].sort();
}

//--------------------------------------------------------
// Compare Resume Skills with Job Description
//--------------------------------------------------------

export function compareSkills(
  structured: StructuredResume,
  jobDescription: string,
) {
  const resumeSkills = extractResumeSkills(structured);

  const jobSkills = extractJobSkills(jobDescription);

  const resumeSet = new Set(
    resumeSkills.map((skill) => normalizeSkill(skill)),
  );

  const matched = jobSkills.filter((skill) =>
    resumeSet.has(normalizeSkill(skill)),
  );

  const missing = jobSkills.filter(
    (skill) => !resumeSet.has(normalizeSkill(skill)),
  );

  return {
    resumeSkills,
    jobSkills,
    matched,
    missing,
  };
}
//--------------------------------------------------------
// Skill Match Percentage
//--------------------------------------------------------

export function calculateSkillMatch(
  matched: string[],
  missing: string[],
): number {
  const normalizedMatched = matched.map(normalizeSkill);
  const normalizedMissing = missing.map(normalizeSkill);

  const total = new Set([
    ...normalizedMatched,
    ...normalizedMissing,
  ]).size;

  if (total === 0) {
    return 0;
  }

  const matchedCount = new Set(normalizedMatched).size;

  return Math.round((matchedCount / total) * 100);
}