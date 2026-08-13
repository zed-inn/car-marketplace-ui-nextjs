import { SearchForm } from "@/components/SearchForm";
import { SuggestionBox } from "@/components/SuggestionBox";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-12 md:p-24">
      <section className="w-full max-w-5xl flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Find Your Perfect Ride
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Connect with verified agencies and drivers in seconds.
          </p>
        </div>
        
        <div className="w-full">
          <SearchForm />
        </div>

        <div className="w-full">
          <SuggestionBox />
        </div>
      </section>
    </main>
  );
}
