import { Loader2 } from "lucide-react";

export function SearchSkeleton() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-3 text-lg font-medium">Searching local agencies...</span>
      </div>
      
      {[1, 2, 3].map((i) => (
        <article 
          key={i} 
          className="bg-card p-4 sm:p-6 rounded-lg border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-50 animate-pulse"
        >
          <div className="flex gap-4 items-start w-full sm:w-auto">
            <div className="h-16 w-16 bg-muted rounded-md shrink-0"></div>
            <div className="flex flex-col gap-2 w-48">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-muted rounded-full w-24 mt-2"></div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end w-full sm:w-auto gap-2">
            <div className="h-8 bg-muted rounded w-24"></div>
            <div className="h-10 bg-muted rounded w-32"></div>
          </div>
        </article>
      ))}
    </section>
  );
}
