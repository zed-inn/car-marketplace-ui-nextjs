import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "SaffarSathi | Local & Outstation Cab Directory",
  description: "Book verified cabs and drivers instantly across India with SaffarSathi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
