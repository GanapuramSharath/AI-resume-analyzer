import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Landing/Hero";
export default function Home() {
  return (
    <main>
      <div className="flex justify-between items-center px-8 py-4">
        <h2 className="text-4xl font-semi-bold">AI resume </h2>
        <Navbar />
      </div>
      <Hero />
    </main>
  );
}
