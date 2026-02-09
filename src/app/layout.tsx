import type { Metadata } from "next";
import { Geist_Mono, Michroma } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: '../../public/fonts/SFProText-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProText-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProText-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProText-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sfpro',
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
        className={`${sfPro.variable} ${geistMono.variable} ${michroma.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
