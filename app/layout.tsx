import type { Metadata } from "next";
import "./globals.css";
import BreddyLoader from "@/app/components/BreddyLoader";

export const metadata: Metadata = {
  title: "BoardReady — CHRO Board Seat Preparation",
  description: "AI-powered board readiness assessment and coaching for CHROs aspiring to Fortune 1000 board seats.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <BreddyLoader />
      </body>
    </html>
  );
}
