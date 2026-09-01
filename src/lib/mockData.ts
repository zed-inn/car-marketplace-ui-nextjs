import { SearchResultItem, TravelSuggestion } from "@/types/models";
import { v7 as uuidv7 } from "uuid";

const MOCK_REVIEWS = [
  {
    id: "rev-1",
    authorName: "Rahul Sharma",
    rating: 5,
    date: "2 days ago",
    comment: "Driver was very punctual and the car was spotless clean. Highly recommended!",
  },
  {
    id: "rev-2",
    authorName: "Priya Patel",
    rating: 5,
    date: "1 week ago",
    comment: "Smooth highway ride. AC was working great throughout the trip.",
  },
  {
    id: "rev-3",
    authorName: "Vikram Malhotra",
    rating: 4,
    date: "2 weeks ago",
    comment: "Good experience overall. Driver knew all the short routes.",
  },
];

const AGENCY_1 = {
  name: "Premium Rides & Travels",
  slug: "premium-rides-1",
  rating: 4.8,
  reviewsCount: 120,
  phoneNumber: "+91 9876543210",
  whatsappNumber: "+919876543210",
  aboutCompany: "Leading travel agency operating across Delhi NCR & North India. Specialized in outstation tours, airport drops, and luxury commercial fleets.",
  ownerName: "Rajesh Sharma (Proprietor)",
  isIndividualDriver: false,
  yearsInBusiness: 8,
  location: "Connaught Place, New Delhi",
  services: ["Outstation Cabs", "Airport Pick & Drop", "24/7 Availability", "One Way Cab", "Local Hourly Rental"],
  reviews: MOCK_REVIEWS,
};

const AGENCY_2 = {
  name: "FastTrack Outstation Cabs",
  slug: "premium-rides-2",
  rating: 4.9,
  reviewsCount: 135,
  phoneNumber: "+91 9876543211",
  whatsappNumber: "+919876543211",
  aboutCompany: "FastTrack Cabs is your trusted partner for comfortable outstation trips and intercity transfers with verified drivers.",
  ownerName: "Vikram Malhotra",
  isIndividualDriver: false,
  yearsInBusiness: 5,
  location: "Sector 18, Noida",
  services: ["Outstation Trips", "Intercity Transfers", "Verified Chauffeurs", "Doorstep Pickup"],
  reviews: MOCK_REVIEWS,
};

const AGENCY_3 = {
  name: "Ramesh Kumar Cabs",
  slug: "premium-rides-3",
  rating: 5.0,
  reviewsCount: 150,
  phoneNumber: "+91 9876543212",
  whatsappNumber: "+919876543212",
  aboutCompany: "Independent commercial driver with 12+ years of safe driving experience across mountain routes and national highways.",
  ownerName: "Ramesh Kumar (Owner / Driver)",
  isIndividualDriver: true,
  yearsInBusiness: 12,
  location: "DLF Cyber City, Gurgaon",
  services: ["Highway Outstation", "Mountain Driving Specialist", "Airport Pickup", "Personal Chauffeur"],
  reviews: MOCK_REVIEWS,
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
