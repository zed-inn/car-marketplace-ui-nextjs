import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { MOCK_SUGGESTIONS } from "@/lib/mockData";
import { buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { TravelSuggestionSchema } from "@/types/models";

export function SuggestionBox() {
  const suggestions = z.array(TravelSuggestionSchema).parse(MOCK_SUGGESTIONS);

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Popular Routes Near You
        </h2>
      </div>

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
              className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-card rounded-xl border shadow-sm p-5 flex flex-col gap-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="truncate">{suggestion.fromLocation}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{suggestion.toLocation}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Top drivers:</span>
                <div className="flex -space-x-2">
                  {suggestion.cars.map((car, idx) => (
                    <div key={car.id} className="relative h-6 w-6 rounded-full border-2 border-background overflow-hidden bg-secondary z-10" style={{ zIndex: 10 - idx }}>
                      {car.driver && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={car.driver.imageUrl} alt={car.driver.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
                <span className="flex items-center ml-auto text-amber-500 font-medium">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  4.8+
                </span>
              </div>

              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ~${suggestion.priceEstimate?.toFixed(2)}
                </span>
                <Link href={`/search?${queryParams}`} className={buttonVariants({ size: "sm" })}>
                  Book Route
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
