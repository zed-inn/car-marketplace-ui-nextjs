import { ShieldCheck, Route, Users, Sparkles } from "lucide-react";

const sections = [
  { icon: Route, title: "Simple Booking", text: "We believe booking a cab should be entirely frictionless. Our platform connects travelers with trusted local agencies — no tedious sign-ups, no hidden steps." },
  { icon: Users, title: "Best Rides Available", text: "We analyze your route and instantly surface the highest-rated drivers and vehicles. Transparent pricing upfront, book directly with a single tap." },
  { icon: ShieldCheck, title: "Trust & Safety", text: "Every agency and driver on our marketplace undergoes background checks and vehicle inspections. Your safety is our top priority." },
  { icon: Sparkles, title: "Why Find Ride?", text: "No hidden fees, no surge pricing, no third-party tracking. A straightforward marketplace designed around reliability and your experience." },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center min-h-[70vh] py-16 px-4 md:px-8">
      <div className="w-full max-w-3xl space-y-12">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">About Find Ride</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Connecting you with verified vehicles and drivers, instantly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((s, i) => (
            <section key={i} className="bg-white border rounded-xl p-6 space-y-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
