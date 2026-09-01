import Link from "next/link";
import { Compass } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs shadow-xs transition-colors">
      <div className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-teal-700 dark:bg-teal-600 text-white font-black shadow-xs">
            <Compass className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            SaffarSathi
          </span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/about" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">About</Link>
            <Link href="/privacy-policy" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors hidden sm:block">Privacy</Link>
          </nav>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
