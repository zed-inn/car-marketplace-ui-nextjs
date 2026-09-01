import { SearchResultItem, TravelSuggestion } from "@/types/models";
import { v7 as uuidv7 } from "uuid";

const AGENCY_1 = {
  name: "Premium Rides & Travels",
  slug: "premium-rides",
  phoneNumber: "+91 9876543210",
  aboutCompany: "Full-service outstation and local travel operator providing sedan and SUV fleets for intercity journeys.",
  ownerName: "Rajesh Sharma",
  companyWebsite: "https://example.com",
};

const AGENCY_2 = {
  name: "FastTrack Outstation Cabs",
  slug: "fasttrack-cabs",
  phoneNumber: "+91 9876543211",
  aboutCompany: "FastTrack Cabs provides outstation transfers and airport transit across major commercial corridors.",
  ownerName: "Vikram Malhotra",
};

const AGENCY_3 = {
  name: "Ramesh Kumar Cabs",
  slug: "ramesh-kumar",
  phoneNumber: "+91 9876543212",
  aboutCompany: "Independent commercial driver with 10+ years of driving experience across national highways.",
  ownerName: "Ramesh Kumar",
};

export const MOCK_SEARCH_RESULTS: SearchResultItem[] = [
  {
    journeyPrice: 45.0,
    car: {
      id: uuidv7(),
      brand: "Toyota",
      model: "Camry",
      year: 2024,
      seats: 4,
      hasAc: true,
      withDriver: true,
      withoutDriver: false,
      imageUrls: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1a",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1b",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1c",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1d",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1e"
      ],
      agency: AGENCY_1,
      driver: {
        name: "Ramesh Kumar",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Driver0"
      }
    }
  },
  {
    journeyPrice: 65.0,
    car: {
      id: uuidv7(),
      brand: "Toyota",
      model: "Innova Crysta",
      year: 2023,
      seats: 7,
      hasAc: true,
      withDriver: true,
      withoutDriver: false,
      imageUrls: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1innova1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1innova2",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1innova3",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1innova4",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1innova5"
      ],
      agency: AGENCY_1,
      driver: {
        name: "Suresh Sharma",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=DriverInnova"
      }
    }
  },
  {
    journeyPrice: 35.0,
    car: {
      id: uuidv7(),
      brand: "Maruti",
      model: "Dzire",
      year: 2022,
      seats: 4,
      hasAc: true,
      withDriver: true,
      withoutDriver: true,
      imageUrls: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1dzire1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1dzire2",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1dzire3",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1dzire4",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car1dzire5"
      ],
      agency: AGENCY_1,
      driver: {
        name: "Amit Patel",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=DriverDzire"
      }
    }
  },
  {
    journeyPrice: 57.5,
    car: {
      id: uuidv7(),
      brand: "Honda",
      model: "Accord",
      year: 2023,
      seats: 5,
      hasAc: true,
      withDriver: true,
      withoutDriver: true,
      imageUrls: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=car2a",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car2b",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car2c",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car2d",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car2e"
      ],
      agency: AGENCY_2,
      driver: {
        name: "Vikram Singh",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Driver1"
      }
    }
  },
  {
    journeyPrice: 70.0,
    car: {
      id: uuidv7(),
      brand: "Hyundai",
      model: "Sonata",
      year: 2022,
      seats: 4,
      hasAc: true,
      withDriver: true,
      withoutDriver: false,
      imageUrls: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=car3a",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car3b",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car3c",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car3d",
        "https://api.dicebear.com/7.x/shapes/svg?seed=car3e"
      ],
      agency: AGENCY_3,
      driver: {
        name: "Ramesh Kumar",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Driver2"
      }
    }
  }
];

export const MOCK_SUGGESTIONS: TravelSuggestion[] = [
  {
    fromLocation: "Downtown City Center",
    toLocation: "International Airport",
    priceEstimate: 45.0,
    cars: [MOCK_SEARCH_RESULTS[0].car, MOCK_SEARCH_RESULTS[3].car],
  },
  {
    fromLocation: "Central Station",
    toLocation: "Tech Park",
    priceEstimate: 30.0,
    cars: [MOCK_SEARCH_RESULTS[4].car],
  },
  {
    fromLocation: "University Campus",
    toLocation: "Shopping Mall",
    priceEstimate: 20.0,
    cars: [MOCK_SEARCH_RESULTS[0].car],
  },
];
