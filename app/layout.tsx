import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#B5D2A3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-muted text-text font-sans antialiased">{children}</body>
    </html>
  );
}
