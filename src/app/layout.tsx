import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twitter",
  description: "A Twitter clone made with Next.js",
  authors: { name: "Aakash Kc" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background",
          "font-sans antialiased",
          geistSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
