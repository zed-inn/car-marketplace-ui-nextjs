import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Building2, Phone } from "lucide-react";

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
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
      <div className="max-w-md w-full bg-white border rounded-xl p-8 shadow-sm space-y-6 text-center">
        <div className="mx-auto h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center">
          <Building2 className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-muted-foreground text-sm">
          Contact this agency to confirm your booking for vehicle <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{carId || "unknown"}</code>
        </p>
        
        <div className="flex items-center justify-center gap-2 text-primary font-bold">
          <Phone className="h-4 w-4" />
          <span>+91 98XXX XXXXX</span>
        </div>

        <div className="pt-4">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
