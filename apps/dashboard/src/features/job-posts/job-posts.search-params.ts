import {
  employmentTypeEnum,
  experienceLevelEnum,
  jobLocationEnum,
  jobPostCampaignStatusEnum,
} from "@optima/supabase/types";

import {
  createLoader,
  parseAsArrayOf,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const jobPostsSearchParams = {
  status: parseAsArrayOf(
    parseAsStringEnum(Object.values(jobPostCampaignStatusEnum)),
  ).withDefault([]),
  type: parseAsArrayOf(
    parseAsStringEnum(Object.values(employmentTypeEnum)),
  ).withDefault([]),
  location: parseAsArrayOf(
    parseAsStringEnum(Object.values(jobLocationEnum)),
  ).withDefault([]),
  experience: parseAsArrayOf(
    parseAsStringEnum(Object.values(experienceLevelEnum)),
  ).withDefault([]),
  department: parseAsArrayOf(parseAsString).withDefault([]),
  title: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(jobPostsSearchParams);
