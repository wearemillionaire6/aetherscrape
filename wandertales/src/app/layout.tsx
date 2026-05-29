import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BookingModal } from "@/components/layout/BookingModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WanderTales | Immersive Travel & Visual Storytelling",
    template: "%s | WanderTales",
  },
  description: "Explore the authentic beauty of global destinations through local chronicles, visual timelines, and immersive visual storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-black font-sans antialiased">
        <SiteHeader />
        <div className="flex-grow pt-20">
          {children}
        </div>
        <SiteFooter />
        <BookingModal />
      </body>
    </html>
  );
}
