"use client";

import { useEffect } from "react";
import { searchState } from "@/lib/searchState";

export function SearchLoadedNotifier() {
  useEffect(() => {
    searchState.isLoaded = true;
    window.dispatchEvent(new Event("search-loaded"));
    return () => {
      searchState.isLoaded = false;
    };
  }, []);

  return null;
}
