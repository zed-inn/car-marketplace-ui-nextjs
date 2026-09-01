"use client";

import Image from "next/image";
import { SearchForm } from "@/components/SearchForm";
import { SuggestionBox } from "@/components/SuggestionBox";
import { ShieldCheck, IndianRupee, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Compact Mobile-First Hero Banner */}
      <section className="w-full bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-800 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-900 pt-6 md:pt-12 pb-16 md:pb-28 px-4 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-[url('/find_ride_hero.png')] bg-cover bg-center opacity-15 mix-blend-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-2 md:mb-4 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-cyan-100/90 text-xs md:text-base max-w-xl mx-auto font-medium">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Compact Search Box Container */}
      <section className="w-full max-w-3xl px-3 md:px-6 -mt-10 md:-mt-20 relative z-10 flex flex-col gap-6 md:gap-10">
        <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl shadow-xl p-3.5 sm:p-5 md:p-8 border border-slate-100 dark:border-slate-800 transition-colors">
          <SearchForm />
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 md:gap-12 text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>{t.commercialPermits}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 md:h-5 md:w-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>{t.directRates}</span>
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>{t.service247}</span>
          </div>
        </div>

        <div className="relative h-[180px] sm:h-[240px] md:h-[380px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-md border dark:border-slate-800">
          <Image
            src="/find_ride_hero.png"
            alt="Intercity cab marketplace SaffarSathi"
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
