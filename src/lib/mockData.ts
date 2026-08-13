import { SearchResultItem } from "@/types/models";
import { v7 as uuidv7 } from "uuid";

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
      agency: {
        name: "Premium Rides 1",
        slug: "premium-rides-1",
        rating: 4.8,
        reviewsCount: 120
      },
      driver: {
        name: "Driver 1",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Driver0"
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
      agency: {
        name: "Premium Rides 2",
        slug: "premium-rides-2",
        rating: 4.9,
        reviewsCount: 135
      },
      driver: {
        name: "Driver 2",
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
      agency: {
        name: "Premium Rides 3",
        slug: "premium-rides-3",
        rating: 5.0,
        reviewsCount: 150
      },
      driver: {
        name: "Driver 3",
        imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Driver2"
      }
    }
  }
];
