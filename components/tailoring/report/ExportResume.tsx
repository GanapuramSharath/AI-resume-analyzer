type Props = {
  tailoringId: string;
};

export default function ExportResume({ tailoringId }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Export Tailored Resume</h2>

      <p className="mb-6 text-slate-600">Download the AI-tailored resume.</p>

      <div className="flex gap-4">
        <a
          href={`/api/tailoring/export/pdf?id=${tailoringId}`}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Download PDF
        </a>

        <a
  href={`/api/tailoring/export/docx?id=${tailoringId}`}
  className="rounded-xl border px-6 py-3 font-semibold"
>
  Download DOCX
</a>
      </div>
    </div>
  );
}
