import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom-ui/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Finder App",
  description: "Find your job here easily.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex flex-1 w-full ">{children}</main>
          </div>
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
