import { NextResponse } from "next/server";
import { MOCK_SEARCH_RESULTS } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const carId = searchParams.get("carId");

  const agencyCars = MOCK_SEARCH_RESULTS.filter(
    (res) => res.car.agency.slug === slug
  );

  if (agencyCars.length === 0) {
    return NextResponse.json({ error: "Agency not found" }, { status: 404 });
  }

  // find requested car or default to first
  const requestedCarIndex = agencyCars.findIndex((res) => res.car.id === carId);
  const requestedCar = requestedCarIndex !== -1 ? agencyCars[requestedCarIndex] : agencyCars[0];

  // other cars offered by this agency
  const otherCars = agencyCars.filter((res) => res.car.id !== requestedCar.car.id);

  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({
    agency: requestedCar.car.agency,
    requestedCar,
    otherCars,
  });
}
