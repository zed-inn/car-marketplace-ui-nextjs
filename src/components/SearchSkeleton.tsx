import { Loader2 } from "lucide-react";

export function SearchSkeleton() {
  return (
    <section className="flex flex-col gap-3 w-full">
      {[1, 2, 3].map((i) => (
        <article 
          key={i} 
          className="bg-white border rounded-xl p-4 md:p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-pulse"
        >
          <div className="flex gap-4 items-start w-full sm:w-auto">
            <div className="h-14 w-14 bg-muted rounded-lg shrink-0" />
            <div className="flex flex-col gap-2 w-48">
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3 mt-1" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
            <div className="h-3 bg-muted rounded w-16" />
            <div className="h-6 bg-muted rounded w-20" />
            <div className="h-9 bg-muted rounded w-28" />
          </div>
        </article>
      ))}
    </section>
  );
}
