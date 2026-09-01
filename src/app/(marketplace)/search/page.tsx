import { Suspense } from "react";
import { Car, Users, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SearchForm } from "@/components/SearchForm";
import { SearchSkeleton } from "@/components/SearchSkeleton";
import { SearchLoadedNotifier } from "@/components/SearchLoadedNotifier";
import { SearchQuerySchema, type SearchQuery } from "@/types/models";
import { LABOR_ILLUSION_DELAY_MS } from "@/lib/constants";
import { getSearchResults } from "@/lib/services/dataService";

async function SearchResultsList({ queryParams }: { queryParams: string }) {
  const [results] = await Promise.all([
    getSearchResults(),
    new Promise((resolve) => setTimeout(resolve, LABOR_ILLUSION_DELAY_MS)),
  ]);

  return (
    <section className="flex flex-col gap-3">
      <SearchLoadedNotifier />
      {results.map((result) => (
        <article 
          key={result.car.id} 
          className="bg-white border rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
        >
          <div className="flex gap-4 items-start w-full md:w-auto">
            <div className="h-14 w-14 md:h-16 md:w-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Car className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-base md:text-lg font-bold text-foreground">
                {result.car.brand} {result.car.model}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded text-xs font-medium text-muted-foreground"><Users className="h-3 w-3" /> {result.car.seats} Seats</span>
                <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium text-muted-foreground">{result.car.hasAc ? "AC" : "Non-AC"}</span>
                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Trusted
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {result.car.driver ? (
                  <div className="flex items-center gap-1.5">
                    <img src={result.car.driver.imageUrl} alt="Driver" className="h-5 w-5 rounded-full object-cover border" />
                    <span className="text-xs font-medium">{result.car.driver.name}</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium italic text-muted-foreground">Driver pending</span>
                )}
                <span className="flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5" /> {result.car.agency.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">({result.car.agency.name})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0">
            <div className="flex flex-col md:items-end">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Total Fare</span>
              <div className="text-xl font-bold text-foreground">
                ₹{(result.journeyPrice * 80).toFixed(0)}
              </div>
            </div>
            <Link 
              href={`/${result.car.agency.slug}?carId=${result.car.id}`}
              className={buttonVariants({ className: "md:mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 shadow-sm" })}
            >
              Book Now
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}

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
  const queryKey = JSON.stringify(rawParams);

  const queryParams = new URLSearchParams({
    from: searchData.from,
    to: searchData.to,
    seats: searchData.seats.toString(),
    ac: searchData.ac.toString(),
    withDriver: searchData.withDriver.toString(),
  }).toString();

  return (
    <main className="flex flex-col items-center min-h-screen py-8 px-4 md:px-8">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <section className="bg-white border rounded-xl shadow-sm p-4 md:p-6">
          <SearchForm initialData={searchData} isSearchPage={true} />
        </section>

        <h1 className="text-xl font-bold text-foreground mt-2">
          Available Cabs
        </h1>

        <Suspense key={queryKey} fallback={<SearchSkeleton />}>
          <SearchResultsList queryParams={queryParams} />
        </Suspense>
      </div>
    </main>
  );
}
