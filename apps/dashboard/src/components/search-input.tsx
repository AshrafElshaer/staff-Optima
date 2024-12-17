"use client";

import { Input } from "@optima/ui/input";
import { Search01Icon } from "hugeicons-react";
import { parseAsString, useQueryState } from "nuqs";

type SearchInputProps = {
  query: string;
  placeholder?: string;
};

export function SearchInput({ query, placeholder }: SearchInputProps) {
  const [queryState, setQueryState] = useQueryState(
    query,
    parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  );
  return (
    <Input
      startIcon={<Search01Icon size={18} />}
      placeholder={placeholder ?? "Search"}
      value={queryState ?? ""}
      onChange={(e) => setQueryState(e.target.value)}
    />
  );
}
