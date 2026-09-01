"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-8 text-xs font-semibold px-2.5 flex items-center gap-1.5 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      title="Switch Language / भाषा बदलें"
    >
      <Globe className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
      <span>{language === "en" ? "English" : "हिंदी"}</span>
    </Button>
  );
}
