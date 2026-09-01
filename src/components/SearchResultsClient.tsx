"use client";

import { Car, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SearchLoadedNotifier } from "@/components/SearchLoadedNotifier";
import { useLanguage } from "@/context/LanguageContext";
import { SearchResultItem } from "@/types/models";

interface SearchResultsClientProps {
  results: SearchResultItem[];
}

export function SearchResultsClient({ results }: SearchResultsClientProps) {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col gap-3">
      <SearchLoadedNotifier />
      {results.map((result) => (
        <article 
          key={result.car.id} 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
        >
          <div className="flex gap-4 items-start w-full md:w-auto">
            <div className="h-14 w-14 md:h-16 md:w-16 bg-teal-50 dark:bg-teal-950/50 rounded-lg flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-900/40">
              <Car className="h-7 w-7 md:h-8 md:w-8 text-teal-700 dark:text-teal-400" />
            </div>
            
            <div className="flex flex-col min-w-0">
              {/* Profound Agency Name Badge */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 border border-teal-200/80 dark:border-teal-800 px-2.5 py-0.5 rounded-md">
                  {t.operator}: {result.car.agency.name}
                </span>
              </div>

              <h2 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                {result.car.brand} {result.car.model}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium text-slate-700 dark:text-slate-300">
                  <Users className="h-3 w-3" /> {result.car.seats} {t.seatsLabel}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium text-slate-700 dark:text-slate-300">
                  {result.car.hasAc ? t.acLabel : t.nonAcLabel}
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                {result.car.driver ? (
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-800">
                    <img src={result.car.driver.imageUrl} alt="Driver" className="h-5 w-5 rounded-full object-cover shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{result.car.driver.name}</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium italic text-slate-400">{t.driverPending}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:items-end">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wide">{t.totalFare}</span>
              <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
                ₹{(result.journeyPrice * 80).toFixed(0)}
              </div>
            </div>
            <Link 
              href={`/${result.car.agency.slug}?carId=${result.car.id}`}
              className={buttonVariants({ className: "md:mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-bold px-5 shadow-xs" })}
            >
              {t.bookNow}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
