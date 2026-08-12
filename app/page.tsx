import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Landing/Hero";
import FAQSection from "../components/Landing/FAQSection";

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AI Resume Analyzer logo"
            width={60}
            height={60}
            priority
            className="rounded-md object-contain"
          />

          <span className="text-3xl font-bold">AI Resume Analyzer</span>
        </div>

        <Navbar />
      </header>

      <Hero />

      <FAQSection />
    </main>
  );
}
