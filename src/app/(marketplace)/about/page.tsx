"use client";

import { ShieldCheck, Route, Users, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const sections = [
    { icon: Route, title: t.heroTitle, text: t.aboutDesc },
    { icon: Users, title: t.directRates, text: t.heroSubtitle },
    { icon: ShieldCheck, title: t.commercialPermits, text: t.aboutDesc },
    { icon: Sparkles, title: t.brand, text: t.aboutDesc },
  ];

  return (
    <main className="flex flex-col items-center min-h-[70vh] py-12 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100">{t.aboutTitle}</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            {t.aboutDesc}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <section key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 shadow-xs">
              <div className="h-10 w-10 bg-teal-50 dark:bg-teal-950/60 rounded-lg flex items-center justify-center">
                <s.icon className="h-5 w-5 text-teal-700 dark:text-teal-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{s.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs md:text-sm">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
