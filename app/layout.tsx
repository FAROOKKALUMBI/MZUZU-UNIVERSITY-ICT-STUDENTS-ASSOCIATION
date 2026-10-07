import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muisa.mzuni.ac.mw"),
  title: "Mzuzu University ICT Student Association | MUISA",
  description:
    "Mzuzu University ICT Student Association (MUISA) is a student-driven ICT community dedicated to building technical skills, fostering collaboration, creating real-world projects, and connecting students to meaningful opportunities.",
  keywords: [
    "MUISA",
    "Mzuzu University",
    "ICT Student Association",
    "Malawi Tech",
    "Computer Science",
    "Mzuni ICT",
    "Student Innovation",
  ],
  authors: [{ name: "MUISA Technical Team" }],
  openGraph: {
    title: "Mzuzu University ICT Student Association | MUISA",
    description:
      "Shaping the future through digital innovation and impact. Empowering ICT students at Mzuzu University.",
    url: "https://muisa.mzuni.ac.mw",
    siteName: "MUISA",
    images: [
      {
        url: "/images/hero-reference.png",
        width: 1200,
        height: 630,
        alt: "Mzuzu University ICT Students Association",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mzuzu University ICT Student Association | MUISA",
    description:
      "Shaping the future through digital innovation and impact.",
    images: ["/images/hero-reference.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <TopBar />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
