"use client";

import { useRef, useState } from "react";
import UploadBox from "@/components/Landing/UploadBox";

export default function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  function browse() {
    inputRef.current?.click();
  }

  return (
    <>
      <UploadBox
        dragActive={dragActive}
        onBrowse={browse}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
      />

      <input hidden ref={inputRef} type="file" accept=".pdf,.docx" />
    </>
  );
}
