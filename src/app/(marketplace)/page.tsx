import Image from "next/image";
import { SearchForm } from "@/components/SearchForm";
import { SuggestionBox } from "@/components/SuggestionBox";
import { ShieldCheck, IndianRupee, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      
      {/* Compact Mobile-First Hero Banner */}
      <section className="w-full bg-gradient-to-br from-cyan-800 via-cyan-700 to-teal-700 pt-6 md:pt-12 pb-16 md:pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/find_ride_hero.png')] bg-cover bg-center opacity-15 mix-blend-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-tight mb-2 md:mb-4">
            Book Safe, Verified Cabs <br className="hidden sm:block" />Across India
          </h1>
          <p className="text-cyan-100 text-xs md:text-lg max-w-xl mx-auto">
            Outstation, local, airport — transparent pricing, trusted drivers.
          </p>
        </div>
      </section>

      {/* Compact Search Box Container */}
      <section className="w-full max-w-3xl px-3 md:px-6 -mt-10 md:-mt-20 relative z-10 flex flex-col gap-6 md:gap-10">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3.5 sm:p-5 md:p-8 border border-gray-100">
          <SearchForm />
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 md:gap-12 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="font-medium">Top-Rated Drivers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="font-medium">No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="font-medium">24/7 Support</span>
          </div>
        </div>

        <div className="relative h-[180px] sm:h-[240px] md:h-[380px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
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

      <div className="h-12 md:h-20" />
    </main>
  );
}
