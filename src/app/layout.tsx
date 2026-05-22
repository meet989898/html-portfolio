import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
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
  metadataBase: new URL("https://www.meetgandhi.com"),
  title: {
    default: "Meet Gandhi | Software Engineer",
    template: "%s | Meet Gandhi",
  },
  description:
    "Meet Gandhi is a software engineer building reliable products across AI, data, backend, and full-stack systems.",
  openGraph: {
    title: "Meet Gandhi | Software Engineer",
    description:
      "Portfolio for software engineering, AI, backend, data, full-stack, and research work.",
    url: "https://www.meetgandhi.com",
    siteName: "Meet Gandhi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
