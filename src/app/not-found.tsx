import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary tracking-tighter">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">Route Not Found</h2>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. It might have been removed, or you might have mistyped the address.
        </p>
        <div className="pt-4">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
