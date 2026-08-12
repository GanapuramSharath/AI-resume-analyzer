const faqs = [
  {
    question: "What is an AI Resume Analyzer?",
    answer:
      "An AI Resume Analyzer reviews your resume and provides feedback on areas such as skills, keywords, formatting, experience, and job relevance. It helps you identify areas that could be improved before applying for jobs.",
  },
  {
    question: "What is an ATS resume checker?",
    answer:
      "An ATS resume checker evaluates your resume against common applicant tracking system requirements. It can help identify formatting issues, missing keywords, and other areas that may affect how your resume is parsed.",
  },
  {
    question: "What is an ATS resume score?",
    answer:
      "An ATS resume score is an estimate of how well your resume matches a job description and common ATS requirements. It should be used as guidance rather than a guarantee of passing an employer's applicant tracking system.",
  },
  {
    question: "Can I check my resume against a job description?",
    answer:
      "Yes. Comparing your resume with a specific job description can help identify relevant keywords, skills, and experience that are missing or not clearly represented in your resume.",
  },
  {
    question: "Can students and freshers use the AI Resume Analyzer?",
    answer:
      "Yes. Students and freshers can use the analyzer to improve their resumes, highlight projects and skills, identify missing information, and prepare their resumes for entry-level job applications.",
  },
  {
    question: "How can I improve my ATS resume score?",
    answer:
      "Use a clear resume structure, include relevant skills and keywords from the job description, describe your achievements clearly, avoid difficult-to-parse formatting, and make sure your experience and projects are relevant to the role.",
  },
  {
    question: "What resume format is best for ATS?",
    answer:
      "A simple, well-structured resume is generally easier for applicant tracking systems to parse. Use clear headings, readable fonts, standard sections, and avoid excessive graphics, tables, or complex layouts when ATS compatibility is important.",
  },
  {
    question: "Can AI improve my resume?",
    answer:
      "AI can provide suggestions for improving wording, skills, keywords, structure, and job relevance. You should review the suggestions and make sure the final resume accurately represents your real experience.",
  },
  {
    question: "Is the AI Resume Analyzer free?",
    answer:
      "AI Resume Analyzer offers free resume analysis features. Check the current pricing and available features on the website for the latest information.",
  },
  {
    question: "Does an AI resume score guarantee an interview?",
    answer:
      "No. A resume score is only a guidance tool. Hiring decisions depend on many factors, including your skills, experience, projects, interview performance, and the employer's requirements.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-500">
          FAQ
        </p>

        <h2
          id="faq-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-base text-gray-500 sm:text-lg">
          Everything you need to know about AI resume analysis, ATS
          compatibility, and improving your resume.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-gray-900">
              <span>{faq.question}</span>

              <span
                aria-hidden="true"
                className="text-2xl text-gray-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>

            <p className="mt-4 pr-8 leading-7 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
