"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

const translations = {
  en: {
    brand: "SaffarSathi",
    about: "About",
    privacy: "Privacy",
    heroTitle: "Outstation & Local Cabs Across India",
    heroSubtitle: "Instant fare estimates • Direct operator contact • Flexible travel",
    commercialPermits: "Commercial Permits",
    directRates: "Direct Rates",
    service247: "24/7 Service",
    fromLabel: "From",
    toLabel: "To",
    dateLabel: "Date",
    seatsLabel: "Seats",
    acLabel: "AC",
    driverLabel: "Driver",
    pickupPlaceholder: "Pickup city",
    dropoffPlaceholder: "Drop-off city",
    pickDate: "Pick date",
    searchButton: "Search Cabs",
    findingCabs: "Finding cabs...",
    commercialCab: "Commercial Cab",
    activeFleet: "Active Fleet",
    requestedCab: "Requested Cab",
    featuredFleet: "Featured Fleet",
    estFare: "Est. Fare",
    totalFare: "Total Fare",
    bookNow: "Book Now",
    callNow: "Call Now",
    callToBook: "Call to Book Cab",
    otherFleet: "Other Fleet Cars from",
    select: "Select",
    owner: "Owner",
    website: "Website",
    instagram: "Instagram",
    driverPending: "Driver pending",
    assignedDriver: "Assigned Driver",
    popularRoutes: "Popular Travel Routes",
    viewCabs: "View Cabs",
    required: "Required",
    greaterThanZero: "> 0",
  },
  hi: {
    brand: "सफ़रसार्थी",
    about: "हमारे बारे में",
    privacy: "गोपनीयता",
    heroTitle: "पूरे भारत में आउटस्टेशन और लोकल कैब्स",
    heroSubtitle: "तुरंत किराया अनुमान • सीधा ऑपरेटर संपर्क • आसान यात्रा",
    commercialPermits: "कमर्शियल परमिट",
    directRates: "सीधी दरें",
    service247: "24/7 सेवा",
    fromLabel: "कहां से",
    toLabel: "कहां तक",
    dateLabel: "तारीख",
    seatsLabel: "सीटें",
    acLabel: "एसी",
    driverLabel: "ड्राइवर",
    pickupPlaceholder: "पिकअप शहर",
    dropoffPlaceholder: "ड्रॉप शहर",
    pickDate: "तारीख चुनें",
    searchButton: "कैब खोजें",
    findingCabs: "कैब खोजी जा रही है...",
    commercialCab: "कमर्शियल कैब",
    activeFleet: "एक्टिव गाड़ियां",
    requestedCab: "चयनित कैब",
    featuredFleet: "उपलब्ध गाड़ियां",
    estFare: "अनुमानित किराया",
    totalFare: "कुल किराया",
    bookNow: "अभी बुक करें",
    callNow: "कॉल करें",
    callToBook: "कैब बुक करने के लिए कॉल करें",
    otherFleet: "अन्य उपलब्ध गाड़ियां:",
    select: "चुनें",
    owner: "मालिक",
    website: "वेबसाइट",
    instagram: "इंस्टाग्राम",
    driverPending: "ड्राइवर आवंटन जारी",
    assignedDriver: "आवंटित ड्राइवर",
    popularRoutes: "लोकप्रिय यात्रा मार्ग",
    viewCabs: "कैब देखें",
    required: "ज़रूरी",
    greaterThanZero: "> 0",
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "hi")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    window.dispatchEvent(new Event("language-changed"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
