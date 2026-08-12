import { z } from "zod";

export const SearchQuerySchema = z.object({
  from: z
    .string("Pickup location is required")
    .min(1, "Pickup location cannot be empty"),
  to: z
    .string("Drop-off location is required")
    .min(1, "Drop-off location cannot be empty"),
  seats: z.int("Seats must be an integer").min(1, "Must need at least 1 seat"),
  ac: z.boolean("AC preference is required").default(true),
  date: z.date("Invalid date"),
  withDriver: z.boolean("Driver preference is required").default(true),
});

export const AgencySchema = z
  .object({
    name: z
      .string("Agency name is required")
      .min(1, "Agency name cannot be empty"),
    slug: z
      .string("Slug is required")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
    rating: z
      .number("Rating must be a number")
      .step(0.1, "Rating must have max 1 decimal place")
      .min(0, "Rating cannot be negative")
      .max(5, "Rating cannot exceed 5"),
    reviewsCount: z
      .int("Reviews count must be an integer")
      .min(0, "Reviews count cannot be negative"),
  })
  .refine((data) => data.reviewsCount > 0 || data.rating === 0, {
    message: "Rating must be 0 if there are no reviews",
    path: ["rating"],
  });

export const DriverSchema = z.object({
  name: z
    .string("Driver name is required")
    .min(1, "Driver name cannot be empty"),
  imageUrl: z
    .url("Invalid Image URL")
    .default("https://api.dicebear.com/7.x/initials/svg?seed=DriverFallback"),
});

export const CarSchema = z
  .object({
    id: z.uuidv7("Invalid id"),
    brand: z.string("Brand is required").min(1, "Brand cannot be empty"),
    model: z.string("Model is required").min(1, "Model cannot be empty"),
    year: z
      .int("Year must be an integer")
      .min(1980, "Year must be at least 1980")
      .max(new Date().getFullYear() + 1, "Year cannot exceed next year"),
    seats: z
      .int("Seats must be an integer")
      .min(1, "Must have at least 1 seat")
      .max(60, "Cannot exceed 60 seats"),
    hasAc: z.boolean("AC status is required"),
    withDriver: z.boolean("withDriver is required"),
    withoutDriver: z.boolean("withoutDriver is required"),
    imageUrls: z
      .array(z.url("Invalid URL"))
      .length(5, "Must provide exactly 5 images"),
    agency: AgencySchema,
    driver: DriverSchema.nullish().default(null),
  })
  .refine((data) => !data.withDriver || data.driver != null, {
    message: "Driver details are required when withDriver is true",
    path: ["driver"],
  })
  .refine(
    (data) => !(data.withoutDriver && !data.withDriver) || data.driver == null,
    {
      message:
        "Driver details must not be provided when only withoutDriver is available",
      path: ["driver"],
    },
  );

export const TravelSuggestionSchema = z.object({
  fromLocation: z
    .string("From location is required")
    .min(1, "From location cannot be empty"),
  toLocation: z
    .string("To location is required")
    .min(1, "To location cannot be empty"),
  cars: z.array(CarSchema),
  priceEstimate: z
    .number("Price estimate must be a number")
    .min(0, "Price estimate cannot be negative")
    .nullish()
    .default(null),
});

export const SearchResultItemSchema = z.object({
  car: CarSchema,
  journeyPrice: z
    .number("Journey price must be a number")
    .min(0, "Journey price cannot be negative"),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
export type Agency = z.infer<typeof AgencySchema>;
export type Car = z.infer<typeof CarSchema>;
export type TravelSuggestion = z.infer<typeof TravelSuggestionSchema>;
export type SearchResultItem = z.infer<typeof SearchResultItemSchema>;
