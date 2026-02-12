import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";

const sfProDisplay = localFont({
  src: [
    { path: "../../public/fonts/SFPRODISPLAYREGULAR.woff2", weight: "400" },
    { path: "../../public/fonts/SFPRODISPLAYMEDIUM.woff2", weight: "500" },
    { path: "../../public/fonts/SFPRODISPLAYBOLD.woff2", weight: "700" },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});

export const metadata: Metadata = {
  title: "Fennec Admin Panel",
  description: "Advanced admin panel built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sfProDisplay.variable} ${geistMono.variable} ${michroma.variable} font-sans antialiased bg-[#111111] text-white min-h-screen`}
      >
        {/* Global background image - applied once for all pages */}
        <div
          className="fixed inset-0 z-0 opacity-100 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/8.png')" }}
        />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
