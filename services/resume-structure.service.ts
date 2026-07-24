import { ParsedResume } from "./resume-parser.service";

export interface StructuredResume {
  summary: string;

  skills: {
    languages: string[];
    frameworks: string[];
    libraries: string[];
    databases: string[];
    cloud: string[];
    tools: string[];
    concepts: string[];
    other: string[];
  };

  projects: {
    title: string;
    duration: string;
    description: string[];
    techStack: string[];
  }[];

  experience: {
    company: string;
    role: string;
    duration: string;
    description: string[];
  }[];

  education: {
    degree: string;
    college: string;
    year: string;
    cgpa: string;
  }[];

  certifications: string[];

  achievements: string[];
}

const LANGUAGES = [
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Kotlin",
];

const FRAMEWORKS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "NestJS",
  "Angular",
  "Vue",
  "Spring Boot",
  "Spring",
  "Django",
  "Flask",
  "FastAPI",
];
const LIBRARIES = [
  "Redux",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "jQuery",
];

const DATABASES = [
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "SQLite",
  "Redis",
  "Firebase",
  "Supabase",
  "Oracle",
];

const CLOUD = [
  "AWS",
  "Azure",
  "GCP",
  "Vercel",
  "Netlify",
  "Docker",
  "Kubernetes",
];

const TOOLS = [
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
  "Prisma",
  "Docker",
  "Linux",
  "Jira",
  "Vite",
  "Webpack",
];

const CONCEPTS = [
  "REST API",
  "REST",
  "GraphQL",
  "JWT",
  "Authentication",
  "OAuth",
  "RAG",
  "LLM",
  "LangChain",
  "LlamaIndex",
  "Embeddings",
  "Vector Database",
  "AI",
];

function extractSkills(text: string, dictionary: string[]) {
  const lower = text.toLowerCase();

  return dictionary.filter((skill) => lower.includes(skill.toLowerCase()));
}

function splitBullets(text: string) {
  if (!text) return [];

  return text
    .split(/\n\s*•?\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
}
function parseEducation(text: string) {
  if (!text.trim()) return [];

  const blocks = text
    .split(/\n(?=[A-Z])/)
    .map((x) => x.trim())
    .filter(Boolean);

  return blocks.map((block) => ({
    degree:
      block.match(/B\.?Tech.*|Bachelor.*|M\.?Tech.*|Master.*/i)?.[0] ?? "",

    college:
      block.match(/.*(University|Institute|College|School).*/i)?.[0] ?? "",

    year: block.match(/\d{4}\s*[-–]\s*(Present|\d{4})/i)?.[0] ?? "",

    cgpa: block.match(/CGPA[: ]*([\d.]+)/i)?.[1] ?? "",
  }));
}


export function structureResume(parsed: ParsedResume): StructuredResume {
  const allSkillsText = [
    parsed.summary,
    parsed.skills,
    parsed.projects,
    parsed.experience,
    parsed.education,
    parsed.certifications,
  ].join("\n");

  const used = new Set<string>();

  function unique(list: string[]) {
    const result: string[] = [];

    for (const item of list) {
      if (!used.has(item.toLowerCase())) {
        used.add(item.toLowerCase());
        result.push(item);
      }
    }

    return result;
  }
const projectBullets = splitBullets(parsed.projects);
const experienceBullets = splitBullets(parsed.experience);
  return {
    summary: parsed.summary,

    skills: {
      languages: unique(extractSkills(allSkillsText, LANGUAGES)),
      frameworks: unique(extractSkills(allSkillsText, FRAMEWORKS)),
      libraries: unique(extractSkills(allSkillsText, LIBRARIES)),
      databases: unique(extractSkills(allSkillsText, DATABASES)),
      cloud: unique(extractSkills(allSkillsText, CLOUD)),
      tools: unique(extractSkills(allSkillsText, TOOLS)),
      concepts: unique(extractSkills(allSkillsText, CONCEPTS)),
      other: [],
    },

    projects: projectBullets.length
  ? [
      {
        title: projectBullets[0],
        duration: "",
        description: projectBullets.slice(1),
        techStack: [],
      },
    ]
  : [],

   experience: experienceBullets.length
  ? [
      {
        company: "",
        role: "",
        duration: "",
        description: experienceBullets,
      },
    ]
  : [],

    education: parseEducation(parsed.education),

    certifications: splitBullets(parsed.certifications),

    achievements: splitBullets(parsed.achievements),
  };
}
