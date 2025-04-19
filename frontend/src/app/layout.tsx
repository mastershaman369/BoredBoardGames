import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import Footer from "../components/Footer";
import TestModeBanner from "../../components/TestModeBanner";
import NavBar from "../components/NavBar";
import { getCategories } from "../utils/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bored Board Games – Shop Board Games Online",
  description: "Shop and explore premium board games",
};

export const dynamic = 'force-dynamic';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories server-side for NavBar
  let categories: any[] = [];
  try {
    categories = await getCategories();
  } catch (e) {
    categories = [];
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NODE_ENV !== 'production' && <TestModeBanner />}
        <Providers>
          <NavBar categories={categories} />
          <div style={{ width: "100%", maxWidth: "var(--max-width)", margin: "40px auto", padding: "0 16px" }}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
