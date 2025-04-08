import type React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Frontend Challenge - User Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontWeight: 500,
                fontSize: "14px",
                padding: "6px 10px",
              },
              success: {
                style: {
                  background: "#ffff",
                  color: "#4de328",
                },
              },
              error: {
                style: {
                  background: "#ffff",
                  color: "#ff0000",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
