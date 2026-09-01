import { MOCK_SEARCH_RESULTS, MOCK_SUGGESTIONS } from "@/lib/mockData";
import { SearchResultItem, TravelSuggestion, Agency } from "@/types/models";

export async function getAgencyData(slug: string, carId?: string): Promise<{
  agency: Agency;
  requestedCar: SearchResultItem;
  otherCars: SearchResultItem[];
} | null> {
  const agencyCars = MOCK_SEARCH_RESULTS.filter(
    (res) => res.car.agency.slug === slug
  );

  if (agencyCars.length === 0) {
    return null;
  }

  const requestedCarIndex = agencyCars.findIndex((res) => res.car.id === carId);
  const requestedCar = requestedCarIndex !== -1 ? agencyCars[requestedCarIndex] : agencyCars[0];
  const otherCars = agencyCars.filter((res) => res.car.id !== requestedCar.car.id);

  return {
    agency: requestedCar.car.agency,
    requestedCar,
    otherCars,
  };
}

export async function getSearchResults(fromLocation?: string, toLocation?: string): Promise<SearchResultItem[]> {
  return MOCK_SEARCH_RESULTS;
}

export async function getSuggestions(): Promise<TravelSuggestion[]> {
  return MOCK_SUGGESTIONS;
}
