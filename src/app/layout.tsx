import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeContext";

export const metadata: Metadata = {
  title: "Developer Link-in-Bio",
  description: "A dynamic portfolio that auto-syncs your GitHub and latest articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
