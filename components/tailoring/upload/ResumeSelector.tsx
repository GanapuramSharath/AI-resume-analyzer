"use client";

import { FileText } from "lucide-react";
import { format } from "date-fns";

type Resume = {
  id: string;
  fileName: string;
  createdAt: Date | string;
};

type Props = {
  resumes: Resume[];
  selectedResumeId: string;
  onSelect: (id: string) => void;
  onUploadClick: () => void;
};

export default function ResumeSelector({
  resumes,
  selectedResumeId,
  onSelect,
  onUploadClick,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">Resume</h2>

      <label className="mb-2 block text-sm text-slate-500">
        Choose Existing Resume
      </label>

      <div className="space-y-3">
        {resumes.map((resume) => (
          <button
            key={resume.id}
            onClick={() => onSelect(resume.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              selectedResumeId === resume.id
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{resume.fileName}</p>

                <p className="text-sm text-slate-500">
                  Uploaded {format(new Date(resume.createdAt), "dd MMM yyyy")}
                </p>
              </div>

              <FileText className="text-blue-600" />
            </div>
          </button>
        ))}
      </div>

      {selectedResumeId && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">
                {resumes.find((r) => r.id === selectedResumeId)?.fileName}
              </p>

              <p className="text-sm text-slate-500">
                Resume selected for tailoring
              </p>
            </div>

            <FileText className="text-green-600" size={24} />
          </div>
        </div>
      )}

      {selectedResumeId && (
        <div className="mt-6 rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-green-600" />
            <span className="font-medium">Resume Selected</span>
          </div>
        </div>
      )}
    </div>
  );
}
