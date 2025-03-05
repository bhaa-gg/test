import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/NavBar";
import { ToastContainer } from "react-toastify";
import Context from "@/Contexts/Context";
import { Parti } from "@/Components/Parti";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Market Management 💰 💰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-white`}
      >
        {/* Background Particles */}
        <div className="absolute inset-0 -z-10">
          <Parti />
        </div>

        <Context>
          <NavBar />
          {children}
        </Context>
        <ToastContainer autoClose={1000} theme="colored" />
      </body>
    </html>
  );
}
