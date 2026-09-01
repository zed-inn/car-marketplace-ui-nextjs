"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-auto transition-colors">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {t.brand}. {t.copyright}
        </p>
        <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/about" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
            {t.about}
          </Link>
          <Link href="/privacy-policy" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
            {t.privacy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
