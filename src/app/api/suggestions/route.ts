import { NextResponse } from "next/server";
import { MOCK_SUGGESTIONS } from "@/lib/mockData";
import { TravelSuggestionSchema } from "@/types/models";
import { z } from "zod";

export async function GET() {
  const suggestions = z.array(TravelSuggestionSchema).parse(MOCK_SUGGESTIONS);
  
  return NextResponse.json(suggestions);
}
