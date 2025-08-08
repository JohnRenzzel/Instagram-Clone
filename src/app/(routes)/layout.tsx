import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Theme } from "@radix-ui/themes";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Instagram Clone by John Renzzel",
  icons: {
    icon: "/johnLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <div className="flex min-h-screen dark:bg-gray-800 dark:text-gray-300">
            <DesktopNav />
            <div className="pb-24 ld:pb-4 pt-4 px-4 lg:px-8 flex justify-around w-full">
              <div className="w-full">{children}</div>
            </div>
          </div>
          <MobileNav />
        </Theme>
      </body>
    </html>
  );
}
