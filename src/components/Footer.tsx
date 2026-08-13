import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MyRide Startup. All rights reserved.
        </p>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
