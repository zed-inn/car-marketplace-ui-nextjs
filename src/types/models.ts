import { z } from "zod";

export const SearchQuerySchema = z.object({
  from: z.string().min(1, "Required"),
  to: z.string().min(1, "Required"),
  seats: z.number().int().min(1, "> 0"),
  ac: z.boolean().default(true),
  withDriver: z.boolean().default(true),
  date: z.date().default(() => new Date()),
});

export const AgencySchema = z.object({
  name: z
    .string("Agency name is required")
    .min(1, "Agency name cannot be empty"),
  slug: z
    .string("Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  phoneNumber: z.string().default("+91 9876543210"),
  aboutCompany: z.string().default("A trusted travel agency providing top-notch cabs."),
  ownerName: z.string().optional(),
  companyWebsite: z.string().url().optional(),
  instagramProfile: z.string().url().optional(),
  logoImageUrl: z.string().url().optional(),
});

export const DriverSchema = z.object({
  name: z
    .string("Driver name is required")
    .min(1, "Driver name cannot be empty"),
  imageUrl: z
    .string("Driver image URL is required")
    .url("Invalid driver image URL format"),
});

export const CarSchema = z.object({
  id: z
    .string("Car ID is required")
    .uuid("Invalid Car ID format"),
  brand: z
    .string("Brand is required")
    .min(1, "Brand cannot be empty"),
  model: z
    .string("Model is required")
    .min(1, "Model cannot be empty"),
  year: z
    .number("Year must be a number")
    .int("Year must be an integer")
    .min(2000, "Year must be 2000 or later")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  seats: z
    .number("Seats must be a number")
    .int("Seats must be an integer")
    .min(1, "At least 1 seat is required"),
  hasAc: z.boolean("AC status is required").default(true),
  withDriver: z.boolean("With driver status is required").default(true),
  withoutDriver: z.boolean("Without driver status is required").default(false),
  imageUrls: z
    .array(z.string().url("Invalid image URL format"))
    .min(1, "At least one image URL is required"),
  agency: AgencySchema,
  driver: DriverSchema.nullable().default(null),
});

export const SearchResultItemSchema = z.object({
  car: CarSchema,
  journeyPrice: z
    .number("Journey price must be a number")
    .min(0, "Journey price cannot be negative"),
});

export const TravelSuggestionSchema = z.object({
  fromLocation: z
    .string("From location is required")
    .min(1, "From location cannot be empty"),
  toLocation: z
    .string("To location is required")
    .min(1, "To location cannot be empty"),
  priceEstimate: z
    .number("Price estimate must be a number")
    .min(0, "Price estimate cannot be negative")
    .optional(),
  cars: z.array(CarSchema).default([]),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
export type Agency = z.infer<typeof AgencySchema>;
export type Driver = z.infer<typeof DriverSchema>;
export type Car = z.infer<typeof CarSchema>;
export type SearchResultItem = z.infer<typeof SearchResultItemSchema>;
export type TravelSuggestion = z.infer<typeof TravelSuggestionSchema>;
