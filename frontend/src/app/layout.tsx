import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bored Board Games – Shop Board Games Online",
  description: "Shop and explore premium board games",
};

export const dynamic = 'force-dynamic';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <div style={{ width: "100%", maxWidth: "var(--max-width)", margin: "40px auto", padding: "0 16px" }}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
