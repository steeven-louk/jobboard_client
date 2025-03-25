import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google"
import "./globals.css";
import { Footer } from "./components/footer";
import Navbar from "./components/navbar";

import { Providers } from "./utils/provider";

import { ToastContainer } from 'react-toastify';

import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "./components/theme/theme-provider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
})

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
        className={`${poppins.variable} ${lato.variable} font-sans`}
      >
        <Providers>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            <Navbar />
            {children}
            <Footer />

            <ToastContainer position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
            <SpeedInsights/>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
