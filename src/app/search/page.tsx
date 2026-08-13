import { Car, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SearchForm } from "@/components/SearchForm";
import { MOCK_SEARCH_RESULTS } from "@/lib/mockData";
import { SearchQuerySchema, SearchResultItemSchema, type SearchQuery } from "@/types/models";
import { z } from "zod";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawParams = await searchParams;
  
  const preprocessedParams = {
    from: rawParams.from || "",
    to: rawParams.to || "",
    seats: typeof rawParams.seats === "string" ? parseInt(rawParams.seats, 10) || 1 : 1,
    ac: rawParams.ac !== "false",
    withDriver: rawParams.withDriver !== "false",
    date: typeof rawParams.date === "string" ? new Date(rawParams.date) : new Date(),
  };

  const parsedParams = SearchQuerySchema.safeParse(preprocessedParams);
  
  const fallbackData: SearchQuery = {
    from: "",
    to: "",
    seats: 1,
    ac: true,
    withDriver: true,
    date: new Date(),
  };

  const searchData = parsedParams.success ? parsedParams.data : fallbackData;

  // simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const results = z.array(SearchResultItemSchema).parse(MOCK_SEARCH_RESULTS);

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-8 md:p-12 bg-muted/20">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        
        <section>
          <SearchForm initialData={searchData} />
        </section>

        <header>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Available Rides
          </h1>
        </header>

        <section className="flex flex-col gap-4">
          {results.map((result) => (
            <article 
              key={result.car.id} 
              className="bg-card p-4 sm:p-6 rounded-lg border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors hover:bg-accent/10"
            >
              <div className="flex gap-4 items-start w-full sm:w-auto">
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                  <Car className="h-8 w-8 text-muted-foreground/50" />
                </div>
                
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">
                    {result.car.brand} {result.car.model} <span className="text-sm font-normal text-muted-foreground">({result.car.year})</span>
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {result.car.seats}</span>
                    <span>{result.car.hasAc ? "AC" : "Non-AC"}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {result.car.driver ? (
                      <>
                        <img src={result.car.driver.imageUrl} alt="Driver" className="h-6 w-6 rounded-full bg-secondary" />
                        <span className="text-sm font-medium">{result.car.driver.name}</span>
                      </>
                    ) : (
                      <span className="text-sm font-medium italic text-muted-foreground">No Driver</span>
                    )}
                    <span className="text-xs text-amber-500 font-semibold ml-2">★ {result.car.agency.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0">
                <div className="text-2xl font-bold text-primary">
                  ${result.journeyPrice.toFixed(2)}
                </div>
                <Link 
                  href={`/${result.car.agency.slug}?carId=${result.car.id}`}
                  className={buttonVariants({ className: "mt-0 sm:mt-2 w-full sm:w-auto" })}
                >
                  Contact Agency
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
