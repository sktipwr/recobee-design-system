import type { Metadata } from "next";
import "./globals.css";
import DSNav from "@/components/DSNav";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "RecoBee Design System",
  description: "RecoBee living style guide and component library.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Providers>
          <DSNav />
          <div className="pt-14">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
