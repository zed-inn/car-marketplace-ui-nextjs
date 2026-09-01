import { notFound } from "next/navigation";
import { 
  Star, Car, Users, Info, ShieldCheck, CheckCircle2, 
  MapPin, Calendar, MessageSquare, Clock, ArrowRight, UserCheck, Phone
} from "lucide-react";
import Link from "next/link";
import { env } from "@/lib/env";
import { AgencySchema, SearchResultItemSchema } from "@/types/models";
import { CACHE_REVALIDATE_SECONDS_DEFAULT } from "@/lib/constants";
import { CallAgencyButton } from "@/components/CallAgencyButton";
import { z } from "zod";

const AgencyPageResponseSchema = z.object({
  agency: AgencySchema,
  requestedCar: SearchResultItemSchema,
  otherCars: z.array(SearchResultItemSchema),
});

export default async function AgencyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ carId?: string }>;
}) {
  const { slug } = await params;
  const { carId } = await searchParams;

  const res = await fetch(`${env.APP_URL}/api/agency/${slug}${carId ? `?carId=${carId}` : ""}`, {
    next: { revalidate: CACHE_REVALIDATE_SECONDS_DEFAULT },
  });

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();
  const parsedData = AgencyPageResponseSchema.parse(data);
  const { agency, requestedCar, otherCars } = parsedData;
  const { car, journeyPrice } = requestedCar;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      
      {/* Top Header Bar (JustDial Style Sticky Navigation) */}
      <header className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {agency.logoImageUrl ? (
              <img src={agency.logoImageUrl} alt={agency.name} className="h-10 w-10 rounded-full object-cover border" />
            ) : (
              <div className="h-10 w-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                {agency.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base md:text-lg leading-none text-slate-900">{agency.name}</h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED
                </span>
              </div>
              <div className="flex items-center text-xs text-slate-500 mt-1 gap-2">
                <span className="flex items-center font-bold text-slate-800">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-0.5" />
                  {agency.rating.toFixed(1)}
                </span>
                <span>({agency.reviewsCount} Ratings)</span>
                {agency.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center"><MapPin className="h-3 w-3 mr-0.5" /> {agency.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {agency.whatsappNumber && (
              <a
                href={`https://wa.me/${agency.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(agency.name)},%20I%20want%20to%20inquire%20about%20booking%20a%20cab.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-3 py-2 rounded-lg text-xs transition-colors border border-emerald-200"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            )}

            <CallAgencyButton 
              phoneNumber={agency.phoneNumber} 
              label="Call Now"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs md:text-sm shadow-sm transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* JustDial-Style Vendor Card Header */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                  {agency.isIndividualDriver ? "👤 Individual Chauffeur / Driver" : "🏢 Registered Travel Agency"}
                </span>
                {agency.yearsInBusiness && (
                  <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {agency.yearsInBusiness}+ Years in Business
                  </span>
                )}
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Responds Instantly
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {agency.name}
              </h2>

              {agency.ownerName && (
                <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                  <UserCheck className="h-4 w-4 text-blue-600" /> Contact Person: <span className="text-slate-900 font-bold">{agency.ownerName}</span>
                </p>
              )}
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col sm:flex-row gap-3">
              <CallAgencyButton 
                phoneNumber={agency.phoneNumber} 
                label="Call Agency"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm transition-all"
              />
              {agency.whatsappNumber && (
                <a
                  href={`https://wa.me/${agency.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi,%20I%20am%20interested%20in%20booking%20a%20ride.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-emerald-700 font-bold px-5 py-3.5 rounded-xl border border-emerald-300 text-sm transition-all"
                >
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Services & Offerings Tags */}
          {agency.services && agency.services.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services Offered</span>
              <div className="flex flex-wrap gap-2">
                {agency.services.map((service, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200/60">
                    ✓ {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Selected / Featured Vehicle Highlight */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                {carId ? "Requested Ride Option" : "Featured Fleet Option"}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {car.brand} {car.model} ({car.year})
              </h3>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Estimated Fare</span>
              <div className="text-2xl font-black text-emerald-700">₹{(journeyPrice * 80).toFixed(0)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border shadow-inner">
              <img src={car.imageUrls[0]} alt={car.model} className="w-full h-full object-cover" />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <span className="text-xs text-slate-500 block">Seating Capacity</span>
                  <span className="font-bold text-slate-900 flex items-center mt-0.5">
                    <Users className="h-4 w-4 mr-1 text-slate-600" /> {car.seats} Seats
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border">
                  <span className="text-xs text-slate-500 block">Climate Control</span>
                  <span className="font-bold text-slate-900 flex items-center mt-0.5">
                    <Car className="h-4 w-4 mr-1 text-slate-600" /> {car.hasAc ? "Air Conditioned" : "Non-AC"}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border">
                  <span className="text-xs text-slate-500 block">Driver Option</span>
                  <span className="font-bold text-slate-900 flex items-center mt-0.5">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" /> Chauffeur Included
                  </span>
                </div>
              </div>

              {car.driver && (
                <div className="flex items-center gap-3 bg-blue-50/60 border border-blue-100 p-3 rounded-xl">
                  {car.driver.imageUrl ? (
                    <img src={car.driver.imageUrl} alt={car.driver.name} className="h-10 w-10 rounded-full border object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      D
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-blue-700 font-semibold block">Assigned Chauffeur</span>
                    <span className="text-sm font-bold text-slate-900">{car.driver.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Fleet Catalog: All Vehicles offered by Vendor */}
        {otherCars.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                All Available Fleet from {agency.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{otherCars.length} other options</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherCars.map(({ car: altCar, journeyPrice: altPrice }) => (
                <div 
                  key={altCar.id}
                  className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-24 h-20 bg-slate-100 rounded-lg overflow-hidden border shrink-0">
                      <img src={altCar.imageUrls[0]} alt={altCar.model} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{altCar.brand} {altCar.model}</h4>
                      <p className="text-xs text-slate-500">{altCar.year} Fleet</p>
                      <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-600">
                        <span>{altCar.seats} Seats</span> • 
                        <span>{altCar.hasAc ? "AC" : "Non-AC"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Fare</span>
                      <div className="text-lg font-bold text-slate-900">₹{(altPrice * 80).toFixed(0)}</div>
                    </div>
                    <Link
                      href={`/${agency.slug}?carId=${altCar.id}`}
                      className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                    >
                      Select Vehicle <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Business Overview & Ratings */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left: About Vendor & Reviews */}
          <div className="md:col-span-2 space-y-6">
            
            {/* About Box */}
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600" /> About {agency.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {agency.aboutCompany}
              </p>
            </div>

            {/* Customer Reviews Section */}
            {agency.reviews && agency.reviews.length > 0 && (
              <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-amber-500 fill-amber-500" /> Ratings & Customer Reviews
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Based on {agency.reviewsCount} verified bookings</p>
                  </div>
                  <div className="flex items-baseline gap-1 bg-amber-50 border border-amber-200 text-amber-900 font-black text-2xl px-3 py-1.5 rounded-xl">
                    <span>{agency.rating.toFixed(1)}</span>
                    <span className="text-xs text-amber-700 font-medium">/ 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {agency.reviews.map((rev) => (
                    <div key={rev.id} className="border-b last:border-b-0 pb-4 last:pb-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{rev.authorName}</span>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right: JustDial Business Card Overview */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border p-6 space-y-4">
              <h4 className="font-bold text-slate-900 text-base border-b pb-3">Business Information</h4>
              
              <div className="space-y-3 text-xs">
                {agency.ownerName && (
                  <div>
                    <span className="text-slate-400 font-medium block">Proprietor / Contact</span>
                    <span className="font-bold text-slate-800 text-sm">{agency.ownerName}</span>
                  </div>
                )}

                {agency.location && (
                  <div>
                    <span className="text-slate-400 font-medium block">Base Operating City</span>
                    <span className="font-bold text-slate-800 flex items-center mt-0.5">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-500" /> {agency.location}
                    </span>
                  </div>
                )}

                {agency.yearsInBusiness && (
                  <div>
                    <span className="text-slate-400 font-medium block">Years of Operation</span>
                    <span className="font-bold text-slate-800">{agency.yearsInBusiness}+ Years Active</span>
                  </div>
                )}

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center text-slate-700 gap-1.5 font-medium">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> Verified Commercial Partner
                  </div>
                  <div className="flex items-center text-slate-700 gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Zero Commission Direct Booking
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <CallAgencyButton phoneNumber={agency.phoneNumber} />
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Directory Page Footer */}
      <footer className="w-full border-t bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-xs text-slate-500">
          Powered by <span className="font-bold text-slate-800">Find Ride</span> Marketplace Directory
        </div>
      </footer>

    </div>
  );
}
