import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { Nav } from "@/components/Nav";
import { SleepyOverlay } from "@/components/SleepyOverlay";
import { APP_NAME } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} — cozy bedtime stories & lullabies`,
  description:
    "A calm kids bedtime app with The Moon Forgot Its Glow story, lullaby lyrics, sleep timer, and favorites. By Hattie Watson.",
};

export const viewport: Viewport = {
  themeColor: "#070b18",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        <AppProviders>
          <div className="mx-auto flex min-h-dvh max-w-lg flex-col">
            <Nav />
            <main className="flex-1 px-4 py-5 pb-10">{children}</main>
          </div>
          <SleepyOverlay />
        </AppProviders>
      </body>
    </html>
  );
}
