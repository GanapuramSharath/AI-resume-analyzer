"use client";

import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import UploadBox from "@/components/Landing/UploadBox";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];


export default function UploadCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState("");
  function openPicker() {
    inputRef.current?.click();
  }

  function validate(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(" Only PDF,DOCX files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    setSelectedFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    validate(file);

    e.target.value = "";
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    validate(file);
  }
  async function handleUpload() {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      console.log("Uploading resume...");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <UploadBox
        dragActive={dragActive}
        onBrowse={openPicker}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.docx"
        onChange={handleChange}
      />

      {selectedFile && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <FileText className="text-green-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{selectedFile.name}</h3>

              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
  {
    error && (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }
  {
    analysis && (
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">
          ATS Score: {analysis.atsScore}
        </h2>

        <p className="mb-6">{analysis.summary}</p>

        <div className="mb-6">
          <h3 className="font-bold">Strengths</h3>

          <ul className="list-disc pl-5">
            {analysis.strengths.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold">Weaknesses</h3>

          <ul className="list-disc pl-5">
            {analysis.weaknesses.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold">Missing Keywords</h3>

          <ul className="list-disc pl-5">
            {analysis.missingKeywords.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Improvements</h3>

          <ul className="list-disc pl-5">
            {analysis.improvements.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
