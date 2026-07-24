"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ResumeSelector from "@/components/tailoring/upload/ResumeSelector";
import JobDescriptionInput from "@/components/tailoring/upload/JobDescriptionInput";
import AnalyzeButton from "@/components/tailoring/upload/AnalyzeButton";

type Resume = {
  id: string;
  fileName: string;
  createdAt: Date;
  analyses: any[];
};

type Props = {
  resumes: Resume[];
};

export default function TailoringClient({ resumes }: Props) {
  const router = useRouter();

  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeResume() {
    if (!selectedResume || !jobDescription.trim()) {
      alert("Select a resume and paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/tailoring/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: selectedResume,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Analysis failed.");
        return;
      }

      router.push(`/dashboard/tailoring/${data.tailoringId}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">Resume Tailoring</h1>

        <p className="mt-2 text-slate-500">
          Tailor your resume for a specific job description.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResumeSelector
          resumes={resumes}
          selectedResumeId={selectedResume}
          onSelect={setSelectedResume}
          onUploadClick={() => {}}
        />

        <JobDescriptionInput
          value={jobDescription}
          onChange={setJobDescription}
        />
      </div>

      <AnalyzeButton loading={loading} onClick={analyzeResume} />
    </main>
  );
}
