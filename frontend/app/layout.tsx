import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Ia no Lab",
  description: "Simplificando a ciência",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
      <nav><Header /></nav>
      <body className="flex-1">
        {children}
      </body>
      <Footer />
    </html>
  );
}
