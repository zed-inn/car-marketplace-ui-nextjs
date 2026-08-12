export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen p-8 sm:p-24">
      <section className="w-full max-w-5xl flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Find Your Perfect Ride
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect with verified agencies and drivers in seconds.
          </p>
        </div>
        
        <div className="w-full bg-card p-6 rounded-lg border shadow-sm h-64 flex items-center justify-center text-muted-foreground">
          search form placeholder
        </div>

        <div className="w-full bg-secondary/30 p-6 rounded-lg border shadow-sm h-48 flex items-center justify-center text-muted-foreground">
          suggestion box placeholder
        </div>
      </section>
    </main>
  );
}
