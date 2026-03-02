import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chordly",
  description: "A platform designed to support meaningful music education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased min-h-screen flex flex-col`}
        >
          <a
            href="#mainContent"
            className="absolute -top-full focus:top-0 left-0 z-50 p-4 bg-background text-foreground focus:outline-none"
          >
            Skip to main content
          </a>
          <Header />
          {children}
          <Toaster richColors position="top-right" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
