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

import { Providers } from "../components/Providers";

export const metadata = {
  title: "OnePass",
  description: "Your Secure Password Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex flex-col relative min-h-screen w-full text-white font-sans bg-[#081423]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
