import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-michroma',
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
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
