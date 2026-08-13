import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AgencyContactPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const carId = resolvedSearchParams.carId;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-muted-foreground">
          This is a placeholder portal for contacting the agency regarding car ID: <br/>
          <code className="text-xs bg-muted p-1 rounded mt-2 inline-block text-foreground">{carId || "unknown"}</code>
        </p>
        
        <div className="pt-8">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
