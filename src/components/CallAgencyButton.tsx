"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

export function CallAgencyButton({
  phoneNumber,
  className,
  label = "Call Agency",
}: {
  phoneNumber: string;
  className?: string;
  label?: string;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={() => setIsRevealed(true)}
      className={
        className ||
        "w-full flex items-center justify-center py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-md transition-all"
      }
    >
      <Phone className="h-5 w-5 mr-2 shrink-0" />
      <span>{isRevealed ? phoneNumber : label}</span>
    </a>
  );
}
