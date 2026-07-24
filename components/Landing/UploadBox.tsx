"use client";

import { UploadCloud } from "lucide-react";

type UploadBoxProps = {
  dragActive: boolean;
  onBrowse: () => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function UploadBox({
  dragActive,
  onBrowse,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}: UploadBoxProps) {
  return (
    <div
      onClick={onBrowse}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        border-dashed
        p-16
        text-center
        transition-all

        ${
          dragActive
            ? "border-blue-600 bg-blue-100 scale-[1.02]"
            : "border-blue-300 bg-white hover:border-blue-500 hover:bg-blue-50"
        }
      `}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <UploadCloud size={40} className="text-blue-600" />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-gray-800">Upload Resume</h2>

      <p className="mt-3 text-gray-500">
        Drag & Drop your resume here
        <br />
        or click anywhere to browse.
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBrowse();
        }}
        className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Browse Files
      </button>

      <p className="mt-8 text-sm text-gray-400">
        Supports PDF, DOC, DOCX (Max 5 MB)
      </p>
    </div>
  );
}
