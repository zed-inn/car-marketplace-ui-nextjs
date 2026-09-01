import { notFound } from "next/navigation";
import { Star, Car, Users, Info, ShieldCheck, CheckCircle2, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { getAgencyData } from "@/lib/services/dataService";
import { CallAgencyButton } from "@/components/CallAgencyButton";

export default async function AgencyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ carId?: string }>;
}) {
  const { slug } = await params;
  const { carId } = await searchParams;

  const data = await getAgencyData(slug, carId);

  if (!data) {
    return notFound();
  }

  const { agency, requestedCar, otherCars } = data;
  const { car, journeyPrice } = requestedCar;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Mobile-Friendly Sticky Header */}
      <header className="w-full bg-white border-b sticky top-0 z-50 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {agency.logoImageUrl ? (
              <img src={agency.logoImageUrl} alt={agency.name} className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover border shrink-0" />
            ) : (
              <div className="h-8 w-8 md:h-9 md:w-9 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                {agency.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-bold text-sm md:text-base leading-tight truncate text-slate-900">{agency.name}</h1>
              <div className="flex items-center text-[11px] text-slate-500 gap-1">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                <span className="font-semibold text-slate-700">{agency.rating.toFixed(1)}</span>
                <span>({agency.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          <CallAgencyButton 
            phoneNumber={agency.phoneNumber} 
            label="Call Now"
            className="shrink-0 flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm shadow-xs transition-all"
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 md:py-8 space-y-5 md:space-y-6">
        
        {/* Selected / Featured Car Showcase */}
        <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                {carId ? "Requested Cab" : "Featured Fleet"}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                {car.brand} {car.model}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Fare</span>
              <span className="text-xl md:text-2xl font-black text-emerald-600">₹{(journeyPrice * 80).toFixed(0)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
            <div className="w-full sm:w-1/2 aspect-video bg-slate-100 rounded-lg overflow-hidden border">
              <img src={car.imageUrls[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
            </div>

            <div className="w-full sm:w-1/2 space-y-3.5">
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-slate-500" /> {car.seats} Seats
                </span>
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Car className="h-3.5 w-3.5 text-slate-500" /> {car.hasAc ? "AC Cab" : "Non-AC"}
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Driver Included
                </span>
              </div>

              {car.driver && (
                <div className="flex items-center gap-2.5 bg-slate-50 border p-2.5 rounded-lg text-xs">
                  {car.driver.imageUrl ? (
                    <img src={car.driver.imageUrl} alt={car.driver.name} className="h-7 w-7 rounded-full object-cover border shrink-0" />
                  ) : null}
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Assigned Driver</span>
                    <span className="font-bold text-slate-800">{car.driver.name}</span>
                  </div>
                </div>
              )}

              <CallAgencyButton 
                phoneNumber={agency.phoneNumber}
                label="Call to Book Cab"
                className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base rounded-lg shadow-xs transition-all"
              />
            </div>
          </div>
        </section>

        {/* Agency Profile Details */}
        <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 md:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-emerald-600" /> About {agency.name}
            </h3>
            {agency.ownerName && (
              <span className="text-xs text-slate-500 font-medium">
                Owner: <strong className="text-slate-800">{agency.ownerName}</strong>
              </span>
            )}
          </div>

          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {agency.aboutCompany}
          </p>

          {(agency.companyWebsite || agency.instagramProfile) && (
            <div className="flex items-center gap-3 pt-2 border-t text-xs font-semibold">
              {agency.companyWebsite && (
                <a href={agency.companyWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
                  <Globe className="h-3.5 w-3.5" /> Website
                </a>
              )}
              {agency.instagramProfile && (
                <a href={agency.instagramProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
                  <Globe className="h-3.5 w-3.5" /> Instagram
                </a>
              )}
            </div>
          )}
        </section>

        {/* Other Fleet Cars */}
        {otherCars.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Other Fleet Cars from {agency.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherCars.map(({ car: altCar, journeyPrice: altPrice }) => (
                <div 
                  key={altCar.id}
                  className="bg-white border rounded-xl p-3.5 shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="w-16 h-14 bg-slate-100 rounded-lg overflow-hidden border shrink-0">
                      <img src={altCar.imageUrls[0]} alt={altCar.model} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{altCar.brand} {altCar.model}</h4>
                      <p className="text-[11px] text-slate-500">{altCar.seats} Seats • {altCar.hasAc ? "AC" : "Non-AC"}</p>
                      <span className="text-xs font-bold text-emerald-600 mt-0.5 block">
                        ₹{(altPrice * 80).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/${agency.slug}?carId=${altCar.id}`}
                    className="shrink-0 inline-flex items-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    Select <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t bg-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500">
          Powered by <span className="font-bold text-slate-800">Find Ride</span>
        </div>
      </footer>

    </div>
  );
}
