import {
  createLoader,
  parseAsArrayOf,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const candidatesSearchParams = {
  job: parseAsArrayOf(parseAsString).withDefault([]),
  department: parseAsArrayOf(parseAsString).withDefault([]),
  email: parseAsString.withDefault(""),
};

export const loadCandidatesSearchParams = createLoader(candidatesSearchParams);
