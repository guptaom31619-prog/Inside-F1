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
  title: "Inside F1 — Interactive 3D Formula 1 Demo",
  description:
    "Demo project: explore F1 engineering with an interactive 3D car, aerodynamics, DRS, drivers, and teams.",
  keywords: ["Formula 1", "F1", "motorsport", "engineering", "racing", "Three.js", "demo"],
  authors: [{ name: "Om Gupta" }],
  openGraph: {
    title: "Inside F1 — Interactive 3D Formula 1 Demo",
    description:
      "Explore F1 engineering with an interactive 3D car, aerodynamics, DRS, drivers, and teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside F1 — Interactive 3D Formula 1 Demo",
    description:
      "Explore F1 engineering with an interactive 3D car, aerodynamics, DRS, drivers, and teams.",
  },
  robots: {
    index: false,
    follow: false,
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
