import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INSIDE F1 | Explore the Engineering Behind the Fastest Sport",
  description:
    "Explore the engineering, drivers, teams and rules behind the fastest sport on earth. Interactive 3D F1 car, aerodynamics, DRS, and more.",
  keywords: ["Formula 1", "F1", "motorsport", "engineering", "racing", "interactive"],
  authors: [{ name: "INSIDE F1" }],
  openGraph: {
    title: "INSIDE F1 | Explore the Engineering Behind the Fastest Sport",
    description:
      "Explore the engineering, drivers, teams and rules behind the fastest sport on earth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INSIDE F1 | Explore the Engineering Behind the Fastest Sport",
    description:
      "Explore the engineering, drivers, teams and rules behind the fastest sport on earth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preload"
          href="/models/f1car.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.jolpi.ca" />
        <link rel="preconnect" href="https://api.openf1.org" />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} font-body antialiased bg-background text-white`}
      >
        {children}
      </body>
    </html>
  );
}
