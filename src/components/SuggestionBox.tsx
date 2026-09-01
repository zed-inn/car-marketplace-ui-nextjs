"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { TravelSuggestion } from "@/types/models";

export function SuggestionBox() {
  const { t } = useLanguage();
  const [suggestions, setSuggestions] = useState<TravelSuggestion[]>([]);

  useEffect(() => {
    fetch("/api/suggestions")
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch(() => {});
  }, []);

  if (suggestions.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 px-1">
        {t.popularRoutes}
      </h2>

      <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar">
        {suggestions.map((suggestion, index) => {
          const queryParams = new URLSearchParams({
            from: suggestion.fromLocation,
            to: suggestion.toLocation,
            seats: "1",
            ac: "true",
            withDriver: "true",
          }).toString();

          return (
            <article 
              key={index}
              className="snap-start shrink-0 w-[280px] sm:w-[300px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                <span className="truncate">{suggestion.fromLocation}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="truncate">{suggestion.toLocation}</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{t.activeFleet}:</span>
                <div className="flex -space-x-2">
                  {suggestion.cars.map((car, idx) => (
                    <div key={car.id} className="relative h-6 w-6 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-800" style={{ zIndex: 10 - idx }}>
                      {car.driver && (
                        <img src={car.driver.imageUrl} alt={car.driver.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  ₹{suggestion.priceEstimate ? (suggestion.priceEstimate * 80).toFixed(0) : "—"}
                </span>
                <Link href={`/search?${queryParams}`} className={buttonVariants({ size: "sm", className: "bg-orange-600 hover:bg-orange-700 text-white font-bold" })}>
                  {t.viewCabs}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
