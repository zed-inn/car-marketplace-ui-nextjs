import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { env } from "@/lib/env";
import { z } from "zod";
import { TravelSuggestionSchema } from "@/types/models";

export async function SuggestionBox() {
  const res = await fetch(`${env.APP_URL}/api/suggestions`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  
  const data = await res.json();
  const suggestions = z.array(TravelSuggestionSchema).parse(data);

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-bold tracking-tight text-foreground px-1">
        Popular Routes
      </h2>

      <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar">
        {suggestions.map((suggestion, index) => {
          const queryParams = new URLSearchParams({
            from: suggestion.fromLocation,
            to: suggestion.toLocation,
            seats: "1",
            ac: "true",
            withDriver: "true",
          }).toString();

          return (
            <article 
              key={index}
              className="snap-start shrink-0 w-[280px] sm:w-[300px] bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <span className="truncate">{suggestion.fromLocation}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{suggestion.toLocation}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Top drivers:</span>
                <div className="flex -space-x-2">
                  {suggestion.cars.map((car, idx) => (
                    <div key={car.id} className="relative h-6 w-6 rounded-full border-2 border-white overflow-hidden bg-muted" style={{ zIndex: 10 - idx }}>
                      {car.driver && (
                        <img src={car.driver.imageUrl} alt={car.driver.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
                <span className="flex items-center ml-auto text-amber-600 font-bold">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  4.8+
                </span>
              </div>

              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">
                  ₹{suggestion.priceEstimate ? (suggestion.priceEstimate * 80).toFixed(0) : "—"}
                </span>
                <Link href={`/search?${queryParams}`} className={buttonVariants({ size: "sm", className: "bg-orange-600 hover:bg-orange-700 text-white font-bold" })}>
                  View Cabs
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
