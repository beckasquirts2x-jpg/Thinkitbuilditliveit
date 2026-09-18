import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { Nav } from "@/components/Nav";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { SleepyOverlay } from "@/components/SleepyOverlay";
import { APP_NAME, AUTHOR } from "@/lib/content";
import { OG_IMAGE } from "@/lib/art";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "A calm kids bedtime app with cozy stories, lullaby lyrics, sleep timer, and favorites. By Hattie Watson. No ads. No subscription.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://little-glow-bedtime.vercel.app"
  ),
  title: {
    default: `${APP_NAME} — cozy bedtime stories & lullabies`,
    template: `%s · ${APP_NAME}`,
  },
  description: siteDescription,
  applicationName: APP_NAME,
  authors: [{ name: AUTHOR }],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    title: `${APP_NAME} — cozy bedtime stories & lullabies`,
    description: siteDescription,
    siteName: APP_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pip and friends as the moon’s glow returns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — cozy bedtime stories & lullabies`,
    description: siteDescription,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#070b18",
  width: "device-width",
  initialScale: 1,
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
          <ServiceWorkerRegister />
        </AppProviders>
      </body>
    </html>
  );
}
