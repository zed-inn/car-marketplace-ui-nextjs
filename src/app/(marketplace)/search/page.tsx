import { Suspense } from "react";
import { SearchForm } from "@/components/SearchForm";
import { SearchSkeleton } from "@/components/SearchSkeleton";
import { SearchResultsClient } from "@/components/SearchResultsClient";
import { SearchQuerySchema, type SearchQuery } from "@/types/models";
import { LABOR_ILLUSION_DELAY_MS } from "@/lib/constants";
import { getSearchResults } from "@/lib/services/dataService";

async function SearchResultsList({ queryParams }: { queryParams: string }) {
  const [results] = await Promise.all([
    getSearchResults(),
    new Promise((resolve) => setTimeout(resolve, LABOR_ILLUSION_DELAY_MS)),
  ]);

  return <SearchResultsClient results={results} />;
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
    <main className="flex flex-col items-center min-h-screen py-8 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4 md:p-6 transition-colors">
          <SearchForm initialData={searchData} isSearchPage={true} />
        </section>

        <Suspense key={queryKey} fallback={<SearchSkeleton />}>
          <SearchResultsList queryParams={queryParams} />
        </Suspense>
      </div>
    </main>
  );
}
