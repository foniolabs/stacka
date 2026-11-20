import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Stacka Research type: free stand-ins in the spirit of a light neo-grotesk + grotesk mono
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display-r",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-r",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stacka.xyz"),
  title: "Stacka | Research and engineering for tokenized finance",
  description:
    "Independent research and engineering on tokenized stocks, ETFs and money market funds, and how TradFi and DeFi meet in emerging markets, starting with Nigeria. A Fonio Labs project.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/brand/icons/favicon.ico", sizes: "any" },
      { url: "/brand/icons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/brand/icons/favicon.ico",
    apple: "/brand/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Stacka Research",
  },
};

// Next ignores viewport and themeColor inside `metadata`, so they live here.
// Zoom is left enabled (the old zoom lock was never applied and is an accessibility problem).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ECEBE6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${interTight.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
