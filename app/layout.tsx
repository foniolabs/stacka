import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "@/components/AuthInitializer";
import PWAInstaller from "@/components/PWAInstaller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "STACKA - Smart Investment Platform",
  description:
    "Invest in stocks, crypto, and DeFi with AI-powered insights. One wallet for all your investments.",
  manifest: "/manifest.json",
  icons: {
    icon: "/stacka.svg",
    shortcut: "/stacka.svg",
    apple: "/stacka.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "STACKA",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#0066FF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} font-sans antialiased`}
      >
        <AuthInitializer />
        <PWAInstaller />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1A1A1A",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "16px",
            },
            success: {
              iconTheme: {
                primary: "#C4FF0D",
                secondary: "#000",
              },
            },
            error: {
              iconTheme: {
                primary: "#FF3B30",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
