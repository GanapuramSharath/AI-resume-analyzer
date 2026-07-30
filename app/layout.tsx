import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Resume Analyzer | Free ATS Resume Checker",
    template: "%s | AI Resume Analyzer",
  },

  description:
    "Analyze your resume with AI, receive ATS compatibility scores, identify weaknesses, and get personalized suggestions to improve your chances of landing interviews.",

  keywords: [
    "AI Resume Analyzer",
    "ATS Resume Checker",
    "Resume Review",
    "Resume Scanner",
    "AI Resume Builder",
    "Resume Feedback",
    "Resume Optimization",
    "Job Application",
    "Career",
    "ATS Score",
  ],

  authors: [
    {
      name: "Ganapuram Sharath Teja",
    },
  ],

  creator: "Ganapuram Sharath Teja",

  metadataBase: new URL("https://sharathairesume.duckdns.org"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "AI Resume Analyzer",
    description:
      "Get AI-powered resume analysis and ATS compatibility feedback instantly.",
    url: "https://sharathairesume.duckdns.org",
    siteName: "AI Resume Analyzer",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Analyzer",
    description:
      "Improve your resume with AI-powered ATS analysis and feedback.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
      <GoogleAnalytics gaId="G-SJQYSQZVF8" />
    </html>
  );
}
