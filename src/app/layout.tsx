import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { buildSocialMetadata, siteMetadata } from "@/lib/metadata";
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
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  icons: {
    icon: "/favicon.svg",
  },
  ...buildSocialMetadata({
    title: siteMetadata.title,
    description: "Portfolio for software engineering, AI, backend, data, full-stack, and research work.",
    path: "/",
    imageAlt: "Meet Gandhi portfolio preview",
  }),
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
