"use client";

import { useRef, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { updateAvatar } from "@/app/actions/avatar";

interface AvatarUploadProps {
  image?: string | null;
  name: string;
}

export default function AvatarUpload({ image, name }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState(image ?? "");
  const [loading, setLoading] = useState(false);

  function handleClick() {
    inputRef.current?.click();
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setPreview(URL.createObjectURL(file));

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });
      

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.error);
     }

     await updateAvatar(data.url);

      setPreview(data.url);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-6 rounded-xl border bg-white p-6 shadow-sm">
      <ProfileAvatar image={preview} name={name} />

      <div>
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {loading ? "Uploading..." : "Upload Avatar"}
        </button>

        <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 2MB</p>

        <input
          hidden
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
