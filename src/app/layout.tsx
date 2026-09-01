import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Find Ride | Safe & Reliable Local Cabs",
  description: "Book verified cabs and drivers instantly across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
