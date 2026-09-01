import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MarketplaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex-1 w-full relative">
        {children}
      </div>
      <Footer />
    </>
  );
}
