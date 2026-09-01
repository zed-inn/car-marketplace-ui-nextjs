import { notFound } from "next/navigation";
import { getAgencyData } from "@/lib/services/dataService";
import { AgencyProfileContent } from "@/components/AgencyProfileContent";

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

  return (
    <AgencyProfileContent
      agency={agency}
      car={requestedCar.car}
      journeyPrice={requestedCar.journeyPrice}
      carId={carId}
      otherCars={otherCars}
    />
  );
}
