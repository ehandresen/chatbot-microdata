import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatBox from "@/components/ChatBox/ChatBox";
import ErrorBoundary from "@/components/ErrorBoundary";
import ThemeWrapper from "@/components/common/ThemeWrapper"; // 👈 Legg til denne

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatbot Microdata",
  description: "Bachelor's thesis project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeWrapper> 
          <ErrorBoundary>
            {children}
            <ChatBox />
          </ErrorBoundary>
        </ThemeWrapper>
      </body>
    </html>
  );
}
