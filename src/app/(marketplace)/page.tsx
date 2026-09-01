import Image from "next/image";
import { SearchForm } from "@/components/SearchForm";
import { SuggestionBox } from "@/components/SuggestionBox";
import { ShieldCheck, IndianRupee, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      
      {/* Compact Mobile-First Hero Banner */}
      <section className="w-full bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-800 pt-6 md:pt-12 pb-16 md:pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/find_ride_hero.png')] bg-cover bg-center opacity-15 mix-blend-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-2 md:mb-4 tracking-tight">
            Outstation & Local Cabs <br className="hidden sm:block" />Across India
          </h1>
          <p className="text-cyan-100/90 text-xs md:text-base max-w-xl mx-auto font-medium">
            Instant fare estimates • Direct operator contact • Flexible travel
          </p>
        </div>
      </section>

      {/* Compact Search Box Container */}
      <section className="w-full max-w-3xl px-3 md:px-6 -mt-10 md:-mt-20 relative z-10 flex flex-col gap-6 md:gap-10">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-3.5 sm:p-5 md:p-8 border border-slate-100">
          <SearchForm />
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 md:gap-12 text-xs md:text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-teal-600 shrink-0" />
            <span>Commercial Permits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 md:h-5 md:w-5 text-teal-600 shrink-0" />
            <span>Direct Rates</span>
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-teal-600 shrink-0" />
            <span>24/7 Service</span>
          </div>
        </div>

        <div className="relative h-[180px] sm:h-[240px] md:h-[380px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/find_ride_hero.png"
            alt="Intercity cab marketplace Find Ride"
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
