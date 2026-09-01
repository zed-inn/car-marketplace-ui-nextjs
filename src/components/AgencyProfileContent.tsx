"use client";

import { Car, Users, Info, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { CallAgencyButton } from "@/components/CallAgencyButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { Agency, Car as CarType } from "@/types/models";

interface AgencyProfileContentProps {
  agency: Agency;
  car: CarType;
  journeyPrice: number;
  carId?: string;
  otherCars: { car: CarType; journeyPrice: number }[];
}

export function AgencyProfileContent({
  agency,
  car,
  journeyPrice,
  carId,
  otherCars,
}: AgencyProfileContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Mobile-Friendly Sticky Header */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-xs transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {agency.logoImageUrl ? (
              <img src={agency.logoImageUrl} alt={agency.name} className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover border dark:border-slate-700 shrink-0" />
            ) : (
              <div className="h-8 w-8 md:h-9 md:w-9 rounded-lg bg-teal-700 dark:bg-teal-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                {agency.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-bold text-sm md:text-base leading-tight truncate text-slate-900 dark:text-slate-100">{agency.name}</h1>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.activeFleet}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <CallAgencyButton 
              phoneNumber={agency.phoneNumber} 
              label={t.callNow}
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm shadow-xs transition-all"
            />
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 md:py-8 space-y-5 md:space-y-6">
        
        {/* Selected / Featured Car Showcase */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] md:text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded border border-teal-200/80 dark:border-teal-800">
                {carId ? t.requestedCab : t.featuredFleet}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {car.brand} {car.model}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.estFare}</span>
              <span className="text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{(journeyPrice * 80).toFixed(0)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
            <div className="w-full sm:w-1/2 aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border dark:border-slate-700">
              <img src={car.imageUrls[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
            </div>

            <div className="w-full sm:w-1/2 space-y-3.5">
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" /> {car.seats} {t.seatsLabel}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Car className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" /> {car.hasAc ? `${t.acLabel} Cab` : `Non-${t.acLabel}`}
                </span>
              </div>

              {car.driver && (
                <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/60 border dark:border-slate-800 p-2.5 rounded-lg text-xs">
                  {car.driver.imageUrl ? (
                    <img src={car.driver.imageUrl} alt={car.driver.name} className="h-7 w-7 rounded-full object-cover border dark:border-slate-700 shrink-0" />
                  ) : null}
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">{t.assignedDriver}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{car.driver.name}</span>
                  </div>
                </div>
              )}

              <CallAgencyButton 
                phoneNumber={agency.phoneNumber}
                label={t.callToBook}
                className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base rounded-lg shadow-xs transition-all"
              />
            </div>
          </div>
        </section>

        {/* Agency Profile Details */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-4 md:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-teal-700 dark:text-teal-400" /> {agency.name}
            </h3>
            {agency.ownerName && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.owner}: <strong className="text-slate-800 dark:text-slate-200">{agency.ownerName}</strong>
              </span>
            )}
          </div>

          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {agency.aboutCompany}
          </p>

          {(agency.companyWebsite || agency.instagramProfile) && (
            <div className="flex items-center gap-3 pt-2 border-t dark:border-slate-800 text-xs font-semibold">
              {agency.companyWebsite && (
                <a href={agency.companyWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  <Globe className="h-3.5 w-3.5" /> {t.website}
                </a>
              )}
              {agency.instagramProfile && (
                <a href={agency.instagramProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  <Globe className="h-3.5 w-3.5" /> {t.instagram}
                </a>
              )}
            </div>
          )}
        </section>

        {/* Other Fleet Cars */}
        {otherCars.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
              {t.otherFleet} {agency.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherCars.map(({ car: altCar, journeyPrice: altPrice }) => (
                <div 
                  key={altCar.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="w-16 h-14 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border dark:border-slate-700 shrink-0">
                      <img src={altCar.imageUrls[0]} alt={altCar.model} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{altCar.brand} {altCar.model}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{altCar.seats} {t.seatsLabel} • {altCar.hasAc ? t.acLabel : `Non-${t.acLabel}`}</p>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                        ₹{(altPrice * 80).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/${agency.slug}?carId=${altCar.id}`}
                    className="shrink-0 inline-flex items-center text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    {t.select} <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 dark:text-slate-400">
          Powered by <span className="font-bold text-slate-800 dark:text-slate-200">{t.brand}</span>
        </div>
      </footer>

    </div>
  );
}
