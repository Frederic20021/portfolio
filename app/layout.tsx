import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Study Abroad Experience",
  description: "Learn how to travel the world by studying abroad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className={"bg-gradient-to-b from-[#062415] via-[#0d0f1c] to-[#062415]"}>
          <Navbar />
          {children}
          <SpeedInsights />
          <Footer />
      </div>
      </body>
    </html>
  );
}
