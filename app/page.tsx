import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Landing/Hero";

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AI Resume Logo"
            width={60}
            height={60}
            priority
            className="rounded-md object-contain"
          />

          <h1 className="text-3xl font-bold">AI Resume</h1>
        </div>

        <Navbar />
      </header>

      <Hero />
    </main>
  );
}