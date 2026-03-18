import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DSNav from "@/components/DSNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Design System | RecoBee",
  description: "RecoBee living style guide and component library.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <DSNav />
        <div className="pl-56">{children}</div>
      </body>
    </html>
  );
}
