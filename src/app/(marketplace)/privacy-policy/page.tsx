"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100">{t.privacyTitle}</h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {t.privacyDesc}
          </p>
        </header>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 space-y-6 text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 shadow-xs">
          <p className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-bold">
            {t.privacyDesc}
          </p>

          <div className="space-y-2 pt-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Data Protection</h2>
            <p>We do not track or store personal travel data beyond basic search queries required to generate route estimations.</p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Cookies & Preferences</h2>
            <p>Your language and theme preferences are saved locally on your device in standard local storage.</p>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">3. Contact</h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs font-mono inline-block text-slate-800 dark:text-slate-200">
              {t.brand}<br/>
              contact@saffarsathi.in
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
