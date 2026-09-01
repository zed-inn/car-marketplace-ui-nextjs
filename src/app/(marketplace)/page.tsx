import Image from "next/image";
import { SearchForm } from "@/components/SearchForm";
import { SuggestionBox } from "@/components/SuggestionBox";
import { ShieldCheck, IndianRupee, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      
      <section className="w-full bg-gradient-to-br from-cyan-800 via-cyan-700 to-teal-700 pt-12 pb-36 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/find_ride_hero.png')] bg-cover bg-center opacity-15 mix-blend-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            Book Safe, Verified Cabs <br className="hidden md:block" />Across India
          </h1>
          <p className="text-cyan-100 text-base md:text-lg max-w-xl mx-auto">
            Outstation, local, airport — transparent pricing, trusted drivers.
          </p>
        </div>
      </section>

      <section className="w-full max-w-3xl px-4 md:px-6 -mt-28 relative z-10 flex flex-col gap-10">
        <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border border-gray-100">
          <SearchForm />
        </div>

        <div className="flex justify-center gap-6 md:gap-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-medium">Top-Rated Drivers</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            <span className="font-medium">No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2 hidden sm:flex">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">24/7 Support</span>
          </div>
        </div>

        <div className="relative h-[240px] md:h-[380px] w-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/find_ride_hero.png"
            alt="Safe travel across India with Find Ride"
            fill
            priority
            className="object-cover"
          />
        </div>

        <SuggestionBox />
      </section>

      <div className="h-20" />
    </main>
  );
}
