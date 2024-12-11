"use client";

import { Check, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";

import { continents } from "@optima/location";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@optima/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@optima/ui/popover";

type Props = {
  value: string | null;
  setValue: (value: string) => void;
  error?: string;
};
export function CountrySelector({ setValue, value, error }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-44"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
              error && "outline-destructive border-destructive",
            )}
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-lg leading-none">
                  {
                    continents
                      .map((group) =>
                        group.countries.find((item) => item.name === value),
                      )
                      .filter(Boolean)[0]?.flag
                  }
                </span>
                <span className="truncate">{value}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select country</span>
            )}
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              {continents.map((group) => (
                <Fragment key={group.continent}>
                  <CommandGroup heading={group.continent}>
                    {group.countries.map((country) => (
                      <CommandItem
                        key={country.cca2}
                        value={country.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          setOpen(false);
                        }}
                      >
                        <span className="text-lg leading-none">
                          {country.flag}
                        </span>{" "}
                        {country.name}
                        {value === country.cca2 && (
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="ml-auto"
                          />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
