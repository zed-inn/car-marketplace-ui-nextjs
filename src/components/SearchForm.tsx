"use client";

import { useTransition } from "react";
import { type z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Loader2 } from "lucide-react";
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

export function SearchForm({ initialData }: { initialData?: Partial<SearchQuery> } = {}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("from", data.from);
      params.set("to", data.to);
      params.set("seats", data.seats.toString());
      params.set("ac", data.ac.toString());
      params.set("withDriver", data.withDriver.toString());
      params.set("date", data.date.toISOString());
      
      router.push(`/search?${params.toString()}`);
    });
  }

  const isLoading = isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-8 pt-4 px-4 sm:pt-6 sm:px-6 pb-8 sm:pb-8 items-end bg-card rounded-lg shadow-md border"
      >
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>from</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="pickup location" className="pl-9" {...field} />
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
            <FormItem className="lg:col-span-2">
              <FormLabel>to</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="drop-off location" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>date</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? format(field.value, "PPP") : <span>pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
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
            <FormItem className="lg:col-span-1">
              <FormLabel>seats</FormLabel>
              <FormControl>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="number" 
                    min={1} 
                    className="pl-9" 
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
            <FormItem className="lg:col-span-1 flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-md h-10">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                ac
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="withDriver"
          render={({ field }) => (
            <FormItem className="lg:col-span-2 flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-md h-10">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                driver needed
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="md:col-span-2 lg:col-span-2 h-10">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          search rides
        </Button>
      </form>
    </Form>
  );
}
