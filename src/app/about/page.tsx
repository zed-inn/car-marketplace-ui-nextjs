export default function AboutPage() {
  return (
    <main className="flex flex-col items-center min-h-[70vh] px-4 py-16 md:p-24 bg-muted/10">
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">About MyRide</h1>
          <p className="text-lg text-muted-foreground">
            Connecting you with the best verified vehicles and drivers instantly.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission: Revolutionizing Local Travel</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that booking a private journey should be entirely frictionless. Our platform 
            bridges the gap between anonymous travelers and high-quality local agencies without forcing 
            you through tedious onboarding flows.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How We Connect You to the Best Rides</h2>
          <p className="text-muted-foreground leading-relaxed">
            By analyzing your route in real-time, we instantly surface the most highly-rated drivers 
            and vehicles available. You see the transparent price upfront and can book directly 
            with a single click.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Trust & Safety: Verified Agencies and Drivers</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every agency and driver listed on our marketplace undergoes a rigorous background check 
            and vehicle inspection process. We prioritize your safety above all else.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Choose MyRide?</h2>
          <p className="text-muted-foreground leading-relaxed">
            No hidden fees, no surge pricing algorithms, and no third-party tracking. We offer 
            a premium, straightforward marketplace designed entirely around user experience and reliability.
          </p>
        </section>
      </div>
    </main>
  );
}
