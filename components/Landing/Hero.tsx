import React from "react";
import UploadBox from "./UploadBox";
import Features from "./Features";
import Pricing from "./Pricing";
const Hero = () => {
  return (
    <div className="max-w-5xl mx-auto text-center mt-24">
      <h1 className="text-6xl font-bold"> Boost Your Resume Score</h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
        Analyze your resume with AI, improve ATS compatibility, identify missing
        skills, and get personalized suggestions to land more interviews.
      </p>
      <UploadBox />
      <Features />
      <Pricing />
    </div>
  );
};

export default Hero;
