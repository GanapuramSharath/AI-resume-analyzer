import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

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
    "Free AI Resume Analyzer that checks ATS compatibility, analyzes resumes, identifies weak points, and provides personalized suggestions to improve interview success.",

  keywords: [
    "AI Resume Analyzer",
    "ATS Resume Checker",
    "Resume Scanner",
    "Resume Review",
    "Resume Optimization",
    "Resume Score",
    "Resume Feedback",
    "ATS Score",
    "Resume AI",
    "Career Tools",
  ],

  authors: [
    {
      name: "Ganapuram Sharath Teja",
    },
  ],

  creator: "Ganapuram Sharath Teja",

  publisher: "AI Resume Analyzer",

  metadataBase: new URL("https://sharathairesume.duckdns.org"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "AI Resume Analyzer | Free ATS Resume Checker",
    description:
      "Analyze your resume with AI, improve ATS compatibility, and receive personalized feedback to increase your interview success.",

    url: "https://sharathairesume.duckdns.org",

    siteName: "AI Resume Analyzer",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Resume Analyzer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "AI Resume Analyzer",

    description: "Analyze your resume using AI and improve your ATS score.",

    images: ["/og-image.png"],
  },

  category: "technology",
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
