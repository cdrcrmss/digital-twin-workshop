import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Lord Cedric D. Ramos - Full Stack Developer",
  description: "Portfolio of Lord Cedric D. Ramos, an aspiring Full Stack Developer from Philippines specializing in React, Next.js, and modern web technologies with AI integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f1419] light:bg-white text-white light:text-gray-900 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
