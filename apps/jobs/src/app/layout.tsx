import "@optima/ui/globals.css";

import { Provider as AnalyticsProvider } from "@optima/analytics/client";
import { cn } from "@optima/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";

const baseUrl = "https://staffoptima.co";

const DepartureMono = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Staff Optima",
    template: "%s | Staff Optima",
  },
  description:
    "Staff Optima simplifies staffing and applicant tracking for modern organizations.",
  openGraph: {
    title: "Staff Optima | Smarter Staffing and Applicant Tracking",
    description:
      "Simplify staffing and streamline your applicant tracking processes with Staff Optima.",
    url: baseUrl,
    siteName: "Staff Optima",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: { rel: "icon", url: "/favicon.ico" },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased dark",
        )}
      >

        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
