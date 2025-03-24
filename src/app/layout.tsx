import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/footer";
import Navbar from "./components/navbar";

import { Providers } from "./utils/provider";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "./components/theme/theme-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobBoard - Trouvez l'emploi de vos rêves",
  description: "Découvrez des milliers d'offres d'emploi et postulez en un clic sur JobBoard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
            <SpeedInsights/>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
