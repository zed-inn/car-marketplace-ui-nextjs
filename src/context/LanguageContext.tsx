"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

const translations = {
  en: {
    brand: "SaffarSathi",
    about: "About",
    privacy: "Privacy",
    copyright: "All rights reserved.",
    poweredBy: "Powered by",
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
    nonAcLabel: "Non-AC",
    driverLabel: "Driver",
    pickupPlaceholder: "Pickup city",
    dropoffPlaceholder: "Drop-off city",
    pickDate: "Pick date",
    searchButton: "Search Cabs",
    findingCabs: "Finding cabs...",
    activeFleet: "Active Fleet",
    availableCabs: "Available Cabs",
    operator: "Operator",
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
    aboutTitle: "About SaffarSathi",
    aboutDesc: "SaffarSathi is India's direct local & outstation cab marketplace connecting travelers directly with cab operators.",
    privacyTitle: "Privacy Policy",
    privacyDesc: "Your privacy is important to us. Learn how SaffarSathi protects your travel information.",
  },
  hi: {
    brand: "सफ़रसार्थी",
    about: "हमारे बारे में",
    privacy: "गोपनीयता",
    copyright: "सर्वाधिकार सुरक्षित।",
    poweredBy: "संचालित",
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
    nonAcLabel: "नॉन-एसी",
    driverLabel: "ड्राइवर",
    pickupPlaceholder: "पिकअप शहर",
    dropoffPlaceholder: "ड्रॉप शहर",
    pickDate: "तारीख चुनें",
    searchButton: "कैब खोजें",
    findingCabs: "कैब खोजी जा रही है...",
    activeFleet: "एक्टिव गाड़ियां",
    availableCabs: "उपलब्ध कैब्स",
    operator: "ऑपरेटर",
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
    aboutTitle: "सफ़रसार्थी के बारे में",
    aboutDesc: "सफ़रसार्थी भारत का प्रत्यक्ष लोकल और आउटस्टेशन कैब मार्केटप्लेस है जो यात्रियों को सीधे कैब ऑपरेटरों से जोड़ता है।",
    privacyTitle: "गोपनीयता नीति",
    privacyDesc: "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। जानें कि सफ़रसार्थी आपकी यात्रा की जानकारी को कैसे सुरक्षित रखता है।",
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
