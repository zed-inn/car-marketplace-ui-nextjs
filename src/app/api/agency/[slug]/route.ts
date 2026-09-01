import { NextResponse } from "next/server";
import { getAgencyData } from "@/lib/services/dataService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const carId = searchParams.get("carId") || undefined;

  const data = await getAgencyData(slug, carId);

  if (!data) {
    return NextResponse.json({ error: "Agency or Car not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
