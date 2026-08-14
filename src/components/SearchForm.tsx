"use client";

import { useState, useEffect } from "react";
import { type z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchState } from "@/lib/searchState";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

import { SearchQuerySchema, type SearchQuery } from "@/types/models";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export function SearchForm({ initialData, isSearchPage }: { initialData?: Partial<SearchQuery>, isSearchPage?: boolean } = {}) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(!!isSearchPage);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (searchState.isLoaded) {
      setIsNavigating(false);
    }
    const handleLoaded = () => setIsNavigating(false);
    window.addEventListener("search-loaded", handleLoaded);
    return () => window.removeEventListener("search-loaded", handleLoaded);
  }, []);

  const form = useForm<z.input<typeof SearchQuerySchema>, any, SearchQuery>({
    resolver: zodResolver(SearchQuerySchema),
    defaultValues: {
      from: initialData?.from || "",
      to: initialData?.to || "",
      seats: initialData?.seats || 1,
      ac: initialData?.ac ?? true,
      withDriver: initialData?.withDriver ?? true,
      date: initialData?.date || new Date(),
    },
  });

  function onSubmit(data: SearchQuery) {
    const params = new URLSearchParams();
    params.set("from", data.from);
    params.set("to", data.to);
    params.set("seats", data.seats.toString());
    params.set("ac", data.ac.toString());
    params.set("withDriver", data.withDriver.toString());
    params.set("date", data.date.toISOString());
    
    params.set("_t", Date.now().toString());
    
    setIsNavigating(true);
    router.push(`/search?${params.toString()}`);
  }

  const isLoading = form.formState.isSubmitting || isNavigating;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wide">From</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input placeholder="Pickup city" className="pl-10 h-12 rounded-lg" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wide">To</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input placeholder="Drop-off city" className="pl-10 h-12 rounded-lg" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-0 items-start">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <FormControl>
                    <PopoverTrigger
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full pl-3.5 text-left font-normal h-12 rounded-lg justify-start",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {field.value ? format(field.value, "MMM d, yyyy") : <span>Pick date</span>}
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Seats</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      type="number" 
                      min={1} 
                      className="pl-10 h-12 rounded-lg" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ac"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-transparent uppercase tracking-wide select-none">AC</FormLabel>
                <FormControl>
                  <label 
                    className="flex flex-row items-center justify-center gap-2.5 border rounded-lg h-12 hover:bg-accent/50 cursor-pointer transition-colors" 
                  >
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <span className="text-sm font-medium select-none text-foreground">AC</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="withDriver"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold text-transparent uppercase tracking-wide select-none">Driver</FormLabel>
                <FormControl>
                  <label 
                    className="flex flex-row items-center justify-center gap-2.5 border rounded-lg h-12 hover:bg-accent/50 cursor-pointer transition-colors" 
                  >
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <span className="text-sm font-medium select-none text-foreground">Driver</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full h-12 mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base rounded-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Finding cabs...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Search Cabs
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
