import { NextResponse } from "next/server";
import { MOCK_SEARCH_RESULTS } from "@/lib/mockData";
import { SearchResultItemSchema } from "@/types/models";
import { z } from "zod";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const results = z.array(SearchResultItemSchema).parse(MOCK_SEARCH_RESULTS);

  return NextResponse.json(results);
}
