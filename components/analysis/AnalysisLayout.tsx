import { ReactNode } from "react";

type AnalysisLayoutProps = {
  children: ReactNode;
};

export default function AnalysisLayout({ children }: AnalysisLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
      {children}
    </main>
  );
}
