"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "HI" : "EN"));
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-8 text-xs font-semibold px-2.5 flex items-center gap-1.5 border-slate-200 hover:bg-slate-100 transition-colors"
      title="Switch Language / भाषा बदलें"
    >
      <Globe className="h-3.5 w-3.5 text-primary" />
      <span>{lang === "EN" ? "English" : "हिंदी"}</span>
    </Button>
  );
}
